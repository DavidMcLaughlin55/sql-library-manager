const express = require('express');
const res = require('express/lib/response');
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
    res.render('update-book', { book });
}));

// Updates book info in the database
router.post('/:id/update', asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    await book.update(req.body);
    console.log(book);
    res.redirect('/');
}));

// Deletes book. THIS CAN'T BE UNDONE!
router.post('/:id/delete', asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    await book.destroy();
    console.log(`${book} deleted`);
    res.redirect(`/`);
}));

module.exports = router;