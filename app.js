require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();
app.use(express.json());
app.use('/api/maintenance', transactionRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Połączono z MongoDB'))
    .catch(err => console.error('Błąd:', err));
app.listen(3000, () => console.log('Serwer działa na porcie 3000'));