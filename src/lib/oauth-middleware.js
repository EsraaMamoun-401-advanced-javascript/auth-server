'use strict';

require('dotenv').config();

const Users = require('./users.js');

const superagent = require('superagent');

const tokenServerUrl = process.env.TOKEN_SERVER;
const remoteAPI = process.env.REMOTE_API;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const API_SERVER = process.env.API_SERVER;


module.exports = async (req, res, next)=> {
  try {
    let code = req.query.code;
    console.log('1- CODE: ', code);
  
    let remoteToken = await exchangeCodeForToken(code);
  
    let remoteUser = await getRemoteUserInfo(remoteToken);
  
    let [user , token] = await getUser(remoteUser);
    req.user = user; 
    req.token = token;
    console.log('local user ... ', token);
      
  
    next();
  
  } catch (e) {
    console.log(`ERROR: ${e}`);
    next('error');
  }
  
};

async function exchangeCodeForToken(code) {
  let tokenResponse = await superagent.post(tokenServerUrl).send({
    code: code,
    client_id : CLIENT_ID,
    client_secret : CLIENT_SECRET, 
    redirect_uri: API_SERVER,
    grant_type: 'authorization_code',
  });
    // access_token=e72e16c7e42f292c6912e7710c838347ae178b4a&token_type=bearer
  let access_token = tokenResponse.body.access_token;
  console.log('______STEP 2 ____access_token ------>>>> ', access_token);
  return access_token;
}

// curl -H "Authorization: token OAUTH-TOKEN" https://api.github.com/user
async function getRemoteUserInfo(token) {
  let userResponse = await superagent
    .get(remoteAPI)
    .set('Authorization', `token ${token}`)
    .set('user-agent', 'express-app');

  let user = userResponse.body; // will return user obj + repos
  console.log('_____STEP 3____ ', user);
  return user;
}

async function getUser(remoteUser) {
  let userRecord = {
    username: remoteUser.login, 
    password: 'oauthpassword',
  };
  let savedUser = await Users.save(userRecord);
  let myServerToken = Users.generateToken(userRecord);
  return [savedUser, myServerToken]; 
}
