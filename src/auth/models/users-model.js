'use strict';

require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const userSchema = require('./schema.js');

let complexity = 10;

userSchema.pre('save', async function(){
  if (!userSchema.username) {
    this.password = await bcrypt.hash(this.password, complexity);
  }
});

userSchema.statics.authenticateBasic = function (auth) {
  return this.findOne({username: auth.username})
    .then(theUser => {
      theUser.compare(auth.password, this.password)
        .then(pass => pass ? this : null); // I'm not sure if should be undefined insted of null
    }).catch(err => console.error(err));
};

userSchema.methods.generateToken = function(user) {
  let token = jwt.sign({username: user.username}, SECRET);
  return token;
};

userSchema.statics.list = async function () {
  let userResults = await this.find({});
  return userResults;
};

module.exports = userSchema;