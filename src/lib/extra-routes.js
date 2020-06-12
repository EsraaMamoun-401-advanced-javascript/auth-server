'use strict';

const express = require('express');
const router = express.Router();
const bearerMiddleware = require('./bearer-auth');


router.get('/secret', bearerMiddleware, (req, res) => {
  console.log('req.users:::: ', req.users);
    
  res.status(200).json(req.users);
});


module.exports = router;