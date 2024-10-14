const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getConnection = require('../config/db');
const { generateToken } = require('../utils/jwt');

exports.register = async (req, res) => {
    const { name, surname, email, phoneNumber, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const connection = await getConnection();

        await connection.execute(
            `INSERT INTO Users (name, surname, email, phoneNumber, password) VALUES (:name, :surname, :email, :phoneNumber, :password)`,
            [name, surname, email, phoneNumber, hashedPassword],
            { autoCommit: true }
        );

        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Registration failed', details: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const connection = await getConnection();
        const result = await connection.execute(
            `SELECT * FROM Users WHERE email = :email`, [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user[5]); // Password column
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = generateToken(user[0]);
        res.cookie('token', token, { httpOnly: true });
        res.json({ message: 'Login successful' });
    }
    catch (error) {
        res.status(500).json({ error: 'Login failed', details: error.message });
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
};
