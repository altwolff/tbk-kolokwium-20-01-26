const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.put('/fix-dates', transactionController.fixDates);
router.get('/stats/revenue', transactionController.getRevenueReport);
router.get('/users/:id/details', transactionController.getUserDetails);

module.exports = router;