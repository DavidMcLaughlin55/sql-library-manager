var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      //Send to global error handler
      next(error);
    };
  };
};

/* GET home page. */
router.get('/', asyncHandler(async (req, res) => {

  res.render('index',);
}));

module.exports = router;
