require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const transactionRoutes = require('./routes/transactionRoutes');
const { sequelize, User } = require('./models/User'); 
const transactionController = require('./controllers/transactionController');

const app = express();
app.use(express.json());

app.use('/api/maintenance', transactionRoutes);

app.get('/api/users/:id/details', transactionController.getUserDetails);


// testowałem tutaj sobie
app.get('/api/debug/users', async (req, res) => {
    try {
        const { User } = require('./models/User');
        const users = await User.findAll(); 
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Połączono z MongoDB'))
    .catch(err => console.error('Błąd:', err));

app.listen(3000, () => console.log('Serwer działa na porcie 3000'));

sequelize.sync().then(async () => {
    console.log('SQLite zsynchronizowane');
    
    const testUser = await User.findByPk(12);
    if (!testUser) {
        await User.create({ id: 12, email: 'test@example.com', fullName: 'Jan Kowalski' });
        console.log('Dodano usera testowego ID: 12');
    }
}).catch(err => {
    console.error('Błąd SQLite:', err);
});