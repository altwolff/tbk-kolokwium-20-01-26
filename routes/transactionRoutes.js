const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.put('/fix-dates', transactionController.fixDates);
router.get('/stats/revenue', transactionController.getRevenueReport);

module.exports = router;