require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { Sequelize } = require('sequelize');

const app = express();
app.use(express.json());

// 1. Logger (Zadanie 3a)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// 2. MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/egzamin')
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.log('❌ Mongo Error:', err));

// 3. Sequelize (SQLite) Connection
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
});

sequelize.authenticate()
    .then(() => console.log('✅ SQLite Connected'))
    .catch(err => console.log('❌ SQLite Error:', err));

// Port i Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));