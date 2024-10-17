const express = require('express');
const router = express.Router();
const { getUserProfile, changeUserPassword, getUsersPaginated } = require('../controllers/userController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');;
const { rolesEnum } = require('../utils/rolesEnum')

router.get('/getUserProfile', authenticateToken, authorizeRoles(rolesEnum.USER), getUserProfile);
router.put('/updateUserPassword', authenticateToken, authorizeRoles(rolesEnum.USER), changeUserPassword);
router.post('/getUsersPaginated', authenticateToken, authorizeRoles(rolesEnum.EMPLOYEE), getUsersPaginated);

module.exports = router;
