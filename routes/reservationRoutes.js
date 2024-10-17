const express = require('express');
const router = express.Router();
const { getReservationsForUserEmail } = require('../controllers/reservationController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');
const { rolesEnum } = require('../utils/rolesEnum');

router.post('/getReservationsForUser', authenticateToken, authorizeRoles(rolesEnum.EMPLOYEE), getReservationsForUserEmail);

module.exports = router;
