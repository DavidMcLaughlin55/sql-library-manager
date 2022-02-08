const express = require('express');
const router = express.Router();

// Redirects to books list homepage.
router.get('/', (req, res) => {
  res.redirect('books');
});

module.exports = router;
