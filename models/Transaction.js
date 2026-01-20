const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  userId: { type: Number },
  category: { type: String },
  amount: { type: Number },
  currency: { type: String },
  status: { type: String },
  date: { type: Date },
  description: { type: String }
});

module.exports = mongoose.model('Transaction', transactionSchema);

// tak naprawiłem plik json: 

// db.transactions.find({ date: { $type: "string" } }).forEach(function(doc) {
//     db.transactions.updateOne(
//         { _id: doc._id },
//         { $set: { date: new Date(doc.date) } }
//     );
// });