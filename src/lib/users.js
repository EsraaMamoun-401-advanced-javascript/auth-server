'use strict';

require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const SECRET = process.env.SECRET;

const userSchema = mongoose.Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
});

let complexity = 10;

userSchema.pre('save', async function(){
  if (!userSchema.username) {
    this.password = await bcrypt.hash(this.password, complexity);
    console.log('pass===>', this.password);
  }
});

userSchema.statics.authenticateBasic = function(auth) {
  return this.findOne({username:auth.username})
    .then(user => user.theCompare(auth.password))
    .catch(console.error);
};

userSchema.methods.theCompare = function(password) {
  return bcrypt.compare(password, this.password)
    .then(valid => valid ? this : null);
};

userSchema.methods.generateToken = function(user) {
  let token = jwt.sign({username: user.username}, SECRET);
  console.log('token===>', token);
  return token;
};

userSchema.statics.list = async function () {
  let userResults = await this.find({});
  console.log('userResults===>', userResults);
  return userResults;
};

module.exports = mongoose.model('users', userSchema);