const express = require('express');
const router = express.Router();
const { getBooksPaginated } = require('../controllers/bookController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');
const { rolesEnum } = require('../utils/rolesEnum')

router.post('/getAllPaginated', authenticateToken, authorizeRoles(rolesEnum.USER), getBooksPaginated);

module.exports = router;
