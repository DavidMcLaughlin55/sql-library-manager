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

// Shows book update form.
router.get('/books/:id', asyncHandler(async (req, res, next) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
        res.render('update-book', { book });
    } else {
        next();
    };
}));

// Updates book info in the database.
router.post('/books/:id', asyncHandler(async (req, res, next) => {
    let book;
    try {
        book = await Book.findByPk(req.params.id);
        if (book) {
            await book.update(req.body);
            res.redirect('/');
        } else {
            next();
        };
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            book = await Book.build(req.body);
            book.id = req.params.id;
            res.render('update-book', { book, errors: error.errors });
        } else {
            throw error;
        };
    };
}));

// Deletes book. THIS CAN'T BE UNDONE!
router.post('/books/:id/delete', asyncHandler(async (req, res, next) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
        await book.destroy();
        res.redirect(`/`);
    } else {
        next();
    };
}));

module.exports = router;