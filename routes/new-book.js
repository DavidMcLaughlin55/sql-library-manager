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

// Shows the create new book form
router.get('/', (req, res) => {
    res.render('new-book', { book: {} });
});

// Posts a new book to the database
router.post('/', asyncHandler(async (req, res) => {
    const book = await Book.create(req.body);
    console.log(req.body);
    res.redirect('/');
}));

module.exports = router;