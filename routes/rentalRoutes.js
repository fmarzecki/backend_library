const express = require('express');
const router = express.Router();
const { rentBook, getRentalsForUserEmail, returnBook, getReturnedRentalsPaginated, getActiveRentalsPaginated } = require('../controllers/rentalController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');
const { rolesEnum } = require('../utils/rolesEnum');

router.post('/rentBook', authenticateToken, authorizeRoles(rolesEnum.EMPLOYEE), rentBook);
router.post('/getRentalsForUser', authenticateToken, authorizeRoles(rolesEnum.EMPLOYEE), getRentalsForUserEmail);
router.put('/returnBook', authenticateToken, authorizeRoles(rolesEnum.EMPLOYEE), returnBook);
router.post('/getHistory', authenticateToken, authorizeRoles(rolesEnum.USER), getReturnedRentalsPaginated);
router.post('/getRentals', authenticateToken, authorizeRoles(rolesEnum.USER), getActiveRentalsPaginated);

module.exports = router;
