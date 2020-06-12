'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
const notFound = require('./middleware/404.js');
const errorServer = require('./middleware/500.js');

const Users = require('./lib/users.js');
const basicAuth = require('./lib/basic-auth-middleware.js');
// const router = express.Router();
const oauth = require('./lib/oauth-middleware.js');
// const bearerMiddleware = require('./lib/bearer-auth.js');
const extraRouter = require('./lib/extra-routes');
// app.use('/public', express.static('public'));

app.use(express.static('./public'));
app.post('/signup', (req, res, next) => {
  // let {email, username, password, first_name, last_name} = req.body;
  let user = req.body;
  let users = new Users(user);
  // console.log({user});
  // console.log(new Users());
  users.save()
    .then(result => {
      let token = users.generateToken(result);
      res.cookie('token', token ,{ expires: new Date(Date.now() + 12000000), httpOnly: false });
      res.status(200).json(token);
    }).catch(error => {
      console.error(`Error: invalid signup username is taken`);
      res.status(403).send('invalid signup username is taken');
    });
});

app.post('/signin', basicAuth, (req, res) => {
  res.cookie('token', req.token ,{ expires: new Date(Date.now() + 12000000), httpOnly: false });
  res.status(201).send(req.token);
});

app.get('/oauth', oauth, (req, res, next)=> {
  res.status(200).send(req.token);
});

app.get('/users', (req, res) => {
  // let user = req.body;
  // let users = new Users();
  Users.list()
    .then(results=>{
      res.status(200).json(results);
    });
  // res.status(200).json(Users.list());
});

app.use(extraRouter);
app.use('*', notFound);
app.use(errorServer);

module.exports = {
  server: app,
  start: port => {
    let PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`My app is up and running on ${PORT}`));
  },
};