const express = require('express');
const router = express.Router();
const { Book } = require('../models');

// Handler function to wrap each route.
function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next)
        } catch (error) {
            // Forward error to the global error handler.
            next(error);
        };
    };
};

// Shows the full list of books.
router.get('/books', asyncHandler(async (req, res, next) => {
    const books = await Book.findAll();
    if (books) {
        res.render('index', { books });
    } else {
        next();
    };
}));

module.exports = router;