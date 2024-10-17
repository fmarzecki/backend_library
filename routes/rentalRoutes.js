const express = require('express');
const router = express.Router();
const { rentBook, getReservationsForUserEmail, returnBook } = require('../controllers/rentalController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');
const { rolesEnum } = require('../utils/rolesEnum');

router.post('/rentBook', authenticateToken, authorizeRoles(rolesEnum.EMPLOYEE), rentBook);
router.post('/getRentalsForUser', authenticateToken, authorizeRoles(rolesEnum.EMPLOYEE), getReservationsForUserEmail);
router.put('/returnBook', authenticateToken, authorizeRoles(rolesEnum.EMPLOYEE), returnBook)

module.exports = router;
