const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const bookController = require('../controllers/bookController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');
const { rolesEnum } = require('../utils/rolesEnum')

router.post('/getAllPaginated', authenticateToken, authorizeRoles(rolesEnum.USER), bookController.getBooksPaginated);
router.post('/save', bookController.addBook);
=======
const { getBooksPaginated, reserveBook } = require('../controllers/bookController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');
const { rolesEnum } = require('../utils/rolesEnum')

router.post('/getAllPaginated', authenticateToken, authorizeRoles(rolesEnum.USER), getBooksPaginated);
router.post('/reserveBook', authenticateToken, authorizeRoles(rolesEnum.USER), reserveBook);
>>>>>>> 246b22f94a5b90283c8f4f08ce2461b6fe146618

module.exports = router;
