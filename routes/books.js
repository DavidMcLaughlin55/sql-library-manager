const express = require('express');
const router = express.Router();
const { Book } = require('../models');

function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next)
        } catch (error) {
            // Forward error to the global error handler
            next(error);
        };
    };
};

/* GET /books Page. Shows the full list of books */
router.get('/', asyncHandler(async (req, res) => {
    const books = await Book.findAll();
    res.render('index', { books });
}));

module.exports = router;