const express = require('express');
const router = express.Router();
const { Book } = require('../models');

// // Handler function to wrap each route.
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

// Shows the create new book form.
router.get('/books/new', (req, res, next) => {
    res.render('new-book', { book: {} });
});

// Posts a new book to the database.
router.post('/books/new', asyncHandler(async (req, res, next) => {
    let book;
    try {
        book = await Book.create(req.body);
        if (book) {
            res.redirect('/');
        } else {
            next();
        };
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            book = await Book.build(req.body);
            res.render('new-book', { book, errors: error.errors });
        } else {
            throw error;
        };
    };
}));

module.exports = router;