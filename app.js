require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Transaction = require('./models/Transaction');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Połączono z MongoDB'))
    .catch(err => console.error('Błąd:', err));
app.listen(3000, () => console.log('Serwer działa na porcie 3000'));