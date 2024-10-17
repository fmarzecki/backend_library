const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');
const { rolesEnum } = require('../utils/rolesEnum')

router.post('/getAllPaginated', authenticateToken, authorizeRoles(rolesEnum.EMPLOYEE, rolesEnum.USER), bookController.getBooksPaginated);
router.post('/save',authenticateToken, authorizeRoles(rolesEnum.EMPLOYEE), bookController.addBook);

module.exports = router;
