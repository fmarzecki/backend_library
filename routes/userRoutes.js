const express = require('express');
const router = express.Router();
const { getUserProfile, changeUserPassword, getUsersPaginated, changePasswordForUserId } = require('../controllers/userController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');;
const { rolesEnum } = require('../utils/rolesEnum')

router.get('/getUserProfile', authenticateToken, authorizeRoles(rolesEnum.USER), getUserProfile);
router.put('/updateUserPassword', authenticateToken, authorizeRoles(rolesEnum.USER), changeUserPassword);
router.put('/updatePasswordForUser', authenticateToken, authorizeRoles(rolesEnum.ADMIN), changePasswordForUserId);
router.post('/getUsersPaginated', authenticateToken, authorizeRoles(rolesEnum.ADMIN), getUsersPaginated);

module.exports = router;
