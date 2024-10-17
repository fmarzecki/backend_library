const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');
const { rolesEnum } = require('../utils/rolesEnum')

router.post('/getAllPaginated', authenticateToken, authorizeRoles(rolesEnum.USER), bookController.getBooksPaginated);
router.post('/save', bookController.addBook);

module.exports = router;
