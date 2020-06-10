'use strict';

require('dotenv').config();

const mongoose = require('mongoose');

const server = require('./src/server.js');

let PORT = process.env.PORT || 4000;

const mongooseOption = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connect(process.env.MONGODB_URI, mongooseOption);

server.start(PORT);
