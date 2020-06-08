'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

const user = require('./auth/models/users-model.js');

const startServer = (port) => {
  app.listen(port, () => {
    console.log(`My server is up and running on ${port}`);
  });
};

module.exports = {
  server: app,
  start: startServer,
};