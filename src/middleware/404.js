'use strict';

// 404 is an error when a client tries to request somwthing that the server can't find

const notFound = (req, res, next) => {
  res.status(404);
  res.send('NOT FOUND !!!');
  res.end();
};

module.exports = notFound;