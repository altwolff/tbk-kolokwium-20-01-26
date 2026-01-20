const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.put('/fix-dates', transactionController.fixDates);

module.exports = router;