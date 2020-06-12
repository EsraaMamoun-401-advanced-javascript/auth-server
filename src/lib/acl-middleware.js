'use strict';

module.exports = (capability) => {
  return (req, res, next) => {
    try {
      console.log('req.user.capabilites:::: ', req.user.capabilites);
      if (req.user.capabilites.includes(capability)) {
        console.log({capability});
        next();
      } else {
        next('Access Denied');
      }
    } catch (error) {
      next('Invalid Login');
    }
  };
};