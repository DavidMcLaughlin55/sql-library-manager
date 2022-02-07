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

// Shows book update form
router.get('/:id', asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
        res.render('update-book', { book });
    } else {
        res.sendStatus(404);
    };
}));

// Updates book info in the database
router.post('/:id', asyncHandler(async (req, res) => {
    let book;
    try {
        book = await Book.findByPk(req.params.id);
        if (book) {
            await book.update(req.body);
            res.redirect('/');
        } else {
            res.sendStatus(404);
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
router.post('/:id/delete', asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
        await book.destroy();
        res.redirect(`/`);
    } else {
        res.sendStatus(404);
    };
}));

module.exports = router;