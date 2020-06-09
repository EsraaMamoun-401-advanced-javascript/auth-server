'use strict';

const users = require('../models/users-model.js');
const base64 = require('base-64');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    next('Invalid Login');
    return;
  }

  let basic = req.headers.authorization.split(' ').pop();

  let [username, password] = base64.decode(basic).split(':');

  users.authenticateBasic(username, password).then(validUser => {
    req.token = users.generateToken(validUser);
    next();
  })
    .catch(next('Invalid Login!!'));
};