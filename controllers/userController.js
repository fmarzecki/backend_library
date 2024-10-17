const { getCurrentUser, updateUserPassword, getUsersPaginated } = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.getUsersPaginated = async (req, res) => {
    try {
        const { filter, filterBy, page, size } = req.body;

        const users = await getUsersPaginated(filter, filterBy, page, size);

        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving paginated users', error });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        let user = await getCurrentUser(req.userId);
        return res.status(200).json({ user });
    }
    catch (error) {
        console.error('Error retrieving user profile:', error);
        return res.status(500).json({ message: 'Error retrieving user profile', error });
    }
};

exports.changeUserPassword = async (req, res) => {
    try {
        let { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        await updateUserPassword(req.userId, hashedPassword);
        return res.status(200).json({ message: 'Password changed' });
    }
    catch (error) {
        console.error('Error changing user password:', error);
        return res.status(500).json({ message: 'Error changing user password', error });
    }
}