const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const Sequelize = require("sequelize");


const { STRING } = Sequelize;
const config = {
  logging: false,
};

if (process.env.LOGGING) {
  delete config.logging;
}
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme_db",
  config
);

const User = conn.define("user", {
  username: STRING,
  password: STRING,
}, {
hooks: {
  beforeCreate: (user, options) => {
    const saltRounds = 10;  //  Data processing speed
    let password = user.password
    const hashedPassword = bcrypt.hash(password, saltRounds, function(err, hash) { // Salt + Hash
      console.log('here is the hash---->', hash)
      console.log('passwords--->', user.password)
      return hash
    })
    user.password = hashedPassword
  }
}
}
);

//console.log('here is hashedPassword--->', hashedPassword)

User.byToken = async (token) => {
  try {
    const decode = jwt.verify(token, process.env.JWT)
    console.log('here is decode--->', decode)
    const user = await User.findByPk(decode.userId);
    if (user) {
      return user;
    }
    const error = Error("bad credentials");
    error.status = 401;
    throw error;
  } catch (ex) {
    const error = Error("bad credentials");
    error.status = 401;
    throw error;
  }
};

User.authenticate = async ({ username, password }) => {
  const user = await User.findOne({
    where: {
      username,
      password,
    },
  });
  if (user.id) {
    const token = await jwt.sign({ userId: user.id }, process.env.JWT )
    console.log('here is token--->', token)
    return token;
  }
  const error = Error("bad credentials");
  error.status = 401;
  throw error;
};

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const credentials = [
    { username: "lucy", password: "lucy_pw" },
    { username: "moe", password: "moe_pw" },
    { username: "larry", password: "larry_pw" },
  ];
  const [lucy, moe, larry] = await Promise.all(
    credentials.map((credential) => User.create(credential))
  );
  return {
    users: {
      lucy,
      moe,
      larry,
    },
  };
};

module.exports = {
  syncAndSeed,
  models: {
    User,
  },
};
