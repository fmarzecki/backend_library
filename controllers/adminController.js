const { addUser, getUserByEmail} = require('../models/userModel');
const { addWorker, getAllWorkers, updateWorker } = require('../models/workerModel');
const bcrypt = require('bcryptjs');

exports.addWorker = async (req, res) => {
    const { name, surname, phoneNumber, email, monthlyPay } = req.body;

    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await addUser({
            name,
            surname,
            phoneNumber,
            email,
            password: await bcrypt.hash('321', 10), // Secure password handling
            role: 'employee'
        });

        if (!user) {
            return res.status(500).json({ message: 'Failed to create user' });
        }

        console.log(user.id);
        const worker = await addWorker({
            monthlyPay,
            userId: user.id[0],
            employedBy: 1
        });

        res.status(201).json({ message: 'Worker added successfully', worker });
    } catch (error) {
        console.error('Error adding worker:', error);
        res.status(500).json({ message: 'Failed to add worker', error });
    }
};


// Fetch all workers
exports.getAllWorkers = async (req, res) => {
    try {
        const workers = await getAllWorkers();
        res.status(200).json(workers);
    } catch (error) {
        console.error('Error fetching workers:', error);
        res.status(500).json({ message: 'Failed to fetch workers', error });
    }
};

// Update worker details
exports.updateWorker = async (req, res) => {
    const { workerId, phoneNumber, monthlyPay } = req.body;

    try {
        await updateWorker({ workerId, phoneNumber, monthlyPay });
        res.status(200).json({ message: 'Worker updated successfully' });
    } catch (error) {
        console.error('Error updating worker:', error);
        res.status(500).json({ message: 'Failed to update worker', error });
    }
};