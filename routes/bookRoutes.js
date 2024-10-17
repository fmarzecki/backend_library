const express = require('express');
const router = express.Router();
const { getBooksPaginated, reserveBook } = require('../controllers/bookController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');
const { rolesEnum } = require('../utils/rolesEnum');

router.post('/getAllPaginated', authenticateToken, authorizeRoles(rolesEnum.USER), getBooksPaginated);
router.post('/reserveBook', authenticateToken, authorizeRoles(rolesEnum.USER), reserveBook);

module.exports = router;
