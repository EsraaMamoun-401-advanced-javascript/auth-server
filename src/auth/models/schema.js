'use strict';

const mongoose = require('mongoose');

const user = mongoose.Schema({
  email: { type: String, require: false },
  username: { type: String, require: true },
  password: { type: String, require: true },
  first_name: { type: String, require: false },
  last_name: { type: String, require: false },
});

const userSchema = mongoose.model('user', user);

module.exports = userSchema;