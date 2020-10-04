const express = require('express');
const router = express.Router();
// const { ensureAuth, ensureGuest } = require('../middleware/auth');

// @desc        landing page
// @route       GET /
router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;