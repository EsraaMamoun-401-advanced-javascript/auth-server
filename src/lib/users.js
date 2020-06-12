'use strict';

require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const SECRET = process.env.SECRET;

const userSchema = mongoose.Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  roles: {
    user: ['read'],
    writer: ['read', 'update'],
    editor: ['read', 'update', 'create'],
    admin: ['read', 'update', 'create', 'delete'],
  },
});

let complexity = 10;

userSchema.pre('save', async function(){
  if (!userSchema.username) {
    console.log('password before the hash===>', this.password);
    this.password = await bcrypt.hash(this.password, complexity);
    console.log('password after the hash===>', this.password);
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
  let token = jwt.sign({
    username: user.username, 
    capabilities: user.role,
  }, SECRET);
  console.log('token===>', token);
  return token;
};

userSchema.statics.list = async function () {
  let userResults = await this.find({});
  console.log('userResults===>', userResults);
  return userResults;
};

userSchema.statics.verifyToken = function(token) {
  return jwt.verify(token, SECRET, function(error, decoded) {
    if (error) {
      console.error('Error:::: ', 'Invalid Token, the token should be exist and without " "');
      return Promise.reject(error);
    }
    console.log('decoded:::: ', decoded);
    
    let username = decoded['username'];
    console.log({username});
        
    if(username) {   

      console.log('##########################');
         
      return Promise.resolve(decoded);
    }
    return Promise.reject();
  });
};

module.exports = mongoose.model('users', userSchema);