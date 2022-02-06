const express = require('express');
const router = express.Router();
const { Book } = require('../models');

/* Handler function to wrap each route. */
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      // Forward error to the global error handler
      next(error);
    };
  };
};

// Redirects to books list homepage
router.get('/', asyncHandler(async (req, res) => {
  res.redirect('/books');
}));

module.exports = router;
