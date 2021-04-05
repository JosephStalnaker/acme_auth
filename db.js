<<<<<<< HEAD
const Sequelize = require('sequelize');
const { STRING } = Sequelize;
const config = {
  logging: false
};

if(process.env.LOGGING){
  delete config.logging;
}
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_db', config);

const User = conn.define('user', {
  username: STRING,
  password: STRING
});

User.byToken = async(token)=> {
  try {
    const user = await User.findByPk(token);
    if(user){
      return user;
    }
    const error = Error('bad credentials');
    error.status = 401;;
    throw error;
  }
  catch(ex){
    const error = Error('bad credentials');
    error.status = 401;;
=======
const Sequelize = require("sequelize");
const { STRING } = Sequelize;
const config = {
  logging: false,
};

if (process.env.LOGGING) {
  delete config.logging;
}
const conn = new Sequelize(
  process.env.JWT || "postgres://localhost/acme_db",
  config
);

const User = conn.define("user", {
  username: STRING,
  password: STRING,
});

User.byToken = async (token) => {
  try {
    const user = await User.findByPk(token);
    if (user) {
      return user;
    }
    const error = Error("bad credentials");
    error.status = 401;
    throw error;
  } catch (ex) {
    const error = Error("bad credentials");
    error.status = 401;
>>>>>>> c56fab7b7cb2f96962288243ab39aed9f9254a93
    throw error;
  }
};

<<<<<<< HEAD
User.authenticate = async({ username, password })=> {
  const user = await User.findOne({
    where: {
      username,
      password
    }
  });
  if(user){
    return user.id; 
  }
  const error = Error('bad credentials');
=======
User.authenticate = async ({ username, password }) => {
  const user = await User.findOne({
    where: {
      username,
      password,
    },
  });
  if (user) {
    return user.id;
  }
  const error = Error("bad credentials");
>>>>>>> c56fab7b7cb2f96962288243ab39aed9f9254a93
  error.status = 401;
  throw error;
};

<<<<<<< HEAD
const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const credentials = [
    { username: 'lucy', password: 'lucy_pw'},
    { username: 'moe', password: 'moe_pw'},
    { username: 'larry', password: 'larry_pw'}
  ];
  const [lucy, moe, larry] = await Promise.all(
    credentials.map( credential => User.create(credential))
=======
const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const credentials = [
    { username: "lucy", password: "lucy_pw" },
    { username: "moe", password: "moe_pw" },
    { username: "larry", password: "larry_pw" },
  ];
  const [lucy, moe, larry] = await Promise.all(
    credentials.map((credential) => User.create(credential))
>>>>>>> c56fab7b7cb2f96962288243ab39aed9f9254a93
  );
  return {
    users: {
      lucy,
      moe,
<<<<<<< HEAD
      larry
    }
=======
      larry,
    },
>>>>>>> c56fab7b7cb2f96962288243ab39aed9f9254a93
  };
};

module.exports = {
  syncAndSeed,
  models: {
<<<<<<< HEAD
    User
  }
};
=======
    User,
  },
};
>>>>>>> c56fab7b7cb2f96962288243ab39aed9f9254a93
