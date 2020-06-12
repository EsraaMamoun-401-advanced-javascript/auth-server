'use strict';

const express = require('express');
const router = express.Router();
const bearerMiddleware = require('./bearer-auth');
const permissions = require('./acl-middleware');


router.get('/secret', bearerMiddleware, (req, res) => {
  console.log('req.users:::: ', req.users);

  res.status(200).json(req.users);
});


router.get('/secret', bearerMiddleware, (req, res) => {
  res.status(200).json(req.user);
});

router.get('/read', bearerMiddleware, permissions('read'), (req, res) => {
  res.status(200).json('you can read');
});
router.post('/add', bearerMiddleware, permissions('create'), (req, res) => {
  res.status(201).json('you can create');
});
router.put('/change', bearerMiddleware, permissions('update'), (req, res) => {
  res.status(201).json('you can update');
});
router.delete('/remove', bearerMiddleware, permissions('delete'), (req, res) => {
  res.status(200).json('you can delete');
});

module.exports = router;