const { getCurrentUser, updateUserPassword, getUsersPaginated, updateIsBlockedStatus, updateUserRole } = require('../models/userModel');
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

exports.changePasswordForUserId = async (req, res) => {
    try {
        let { userId, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        await updateUserPassword(userId, hashedPassword);
        return res.status(200).json({ message: 'Password changed' });
    }
    catch (error) {
        console.error('Error changing user password:', error);
        return res.status(500).json({ message: 'Error changing user password', error });
    }
}

exports.toggleBan = async (req, res) => {
    try {
        let { userId, status } = req.body;
        status = status === 0 ? 1 : 0;  // Toggle between 0 and 1
        await updateIsBlockedStatus(userId, status);
        const message = status === 1 ? 'User Blocked' : 'User Unblocked';
        return res.status(200).json({ message });
    } catch (error) {
        console.error('Error toggling user block:', error);
        return res.status(500).json({ message: 'Error toggling user block', error });
    }
};

exports.changeUserRole = async (req, res) => {
    try {
        const { userId, role } = req.body;

        const validRoles = ['admin', 'employee', 'user'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        await updateUserRole(userId, role);
        return res.status(200).json({ message: 'Role updated successfully' });
    } catch (error) {
        console.error('Error updating user role:', error);
        return res.status(500).json({ message: 'Error updating user role', error });
    }
};