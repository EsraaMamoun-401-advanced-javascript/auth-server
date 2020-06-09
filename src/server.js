'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

const users_model = require('./auth/models/users-model.js');
const basicAuth = require('./auth/middleware/oauth.js');


app.post('/signup', (req, res) => {
  // let {email, username, password, first_name, last_name} = req.body;
  let user = req.body;

  users_model.save(user).then(result => {
    let token = users_model.generateToken(result);
    res.status(200).send(token);

  }).catch(error => {
    console.error(`Error!!`);
    res.status(403).send('Invalid Signup! email is taken');
  });
});

app.post('/signin', basicAuth, (req, res) => {
  res.status(201).send(req.token);
});

app.get('/list', (req, res) => {
  res.status(200).send(users_model.list());
});

const startServer = (port) => {
  app.listen(port, () => {
    console.log(`My server is up and running on ${port}`);
  });
};

module.exports = {
  server: app,
  start: startServer,
};