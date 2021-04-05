<<<<<<< HEAD
const express = require('express');
const app = express();
app.use(express.json());
const { models: { User }} = require('./db');
const path = require('path');

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.post('/api/auth', async(req, res, next)=> {
  try {
    res.send({ token: await User.authenticate(req.body)});
  }
  catch(ex){
=======
const express = require("express");
const app = express();
app.use(express.json());
const {
  models: { User },
} = require("./db");
const path = require("path");

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.post("/api/auth", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (ex) {
>>>>>>> c56fab7b7cb2f96962288243ab39aed9f9254a93
    next(ex);
  }
});

<<<<<<< HEAD
app.get('/api/auth', async(req, res, next)=> {
  try {
    res.send(await User.byToken(req.headers.authorization));
  }
  catch(ex){
=======
app.get("/api/auth", async (req, res, next) => {
  try {
    res.send(await User.byToken(req.headers.authorization));
  } catch (ex) {
>>>>>>> c56fab7b7cb2f96962288243ab39aed9f9254a93
    next(ex);
  }
});

<<<<<<< HEAD
app.use((err, req, res, next)=> {
=======
app.use((err, req, res, next) => {
>>>>>>> c56fab7b7cb2f96962288243ab39aed9f9254a93
  console.log(err);
  res.status(err.status || 500).send({ error: err.message });
});

<<<<<<< HEAD
module.exports = app;
=======
module.exports = app;
>>>>>>> c56fab7b7cb2f96962288243ab39aed9f9254a93
