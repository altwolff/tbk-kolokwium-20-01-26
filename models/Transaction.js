const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // Używamy String, bo w JSON masz UUID
    userId: Number,
    category: String,
    amount: Number,
    currency: String,
    status: String,
    date: { type: Date },
    description: String
});

module.exports = mongoose.model('Transaction', transactionSchema);
