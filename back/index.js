const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const rewardRoutes = require('./routes/rewardRoutes');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes); 
app.use('/api/users', userRoutes); 
app.use('/api/rewards', rewardRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
