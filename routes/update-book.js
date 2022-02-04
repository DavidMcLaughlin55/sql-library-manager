const express = require('express');
const router = express.Router();
const { Book } = require('../models');

//Shows book detail form
router.get('/', (req, res) => {
    res.render('update-book');
});

// Updates book info in the database
router.post('/', (req, res) => {
    res.render('update-book');
});

module.exports = router;