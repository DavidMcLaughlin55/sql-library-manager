const express = require('express');
const router = express.Router();

/* GET /books Page. Shows the full list of books */
router.get('/books', (req, res) => {
    // res.send('New book page working');
    res.render('new-book');
});

module.exports = router;