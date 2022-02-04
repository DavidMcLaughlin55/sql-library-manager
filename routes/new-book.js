const express = require('express');
const router = express.Router();
const { Book } = require('../models');

//Shows the create new book form
router.get('/', (req, res) => {
    // res.send('New book page working');
    res.render('new-book');
});

// Posts a new book to the database
router.post('/', (req, res) => {
    // res.send('New book page working');
    res.render('new-book');
});

module.exports = router;