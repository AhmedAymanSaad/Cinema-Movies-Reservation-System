const express = require('express');
const router = express.Router();

const movies = require('./movies');
const customers = require('./customers');

router.use('/movies', movies);
router.use('/customers', customers);

module.exports = router;