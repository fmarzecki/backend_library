const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const newsRoutes = require('./routes/newsRoutes');
const adminRoutes = require('./routes/adminRoutes');

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
app.use('/news', newsRoutes);
app.use('/admin', adminRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});