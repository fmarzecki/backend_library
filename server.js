const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const rentalRoutes = require('./routes/rentalRoutes')
const readerRoutes = require('./routes/readerRoutes')
const reservationRoutes = require('./routes/reservationRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ADDRESS,
    credentials: true
}));
app.use(cookieParser());

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/reservations', reservationRoutes);
app.use('/rentals', rentalRoutes);
app.use('/readers', readerRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});