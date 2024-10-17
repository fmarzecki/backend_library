const express = require('express');
const router = express.Router();
const { getReadersPaginated } = require('../controllers/readerController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');;
const { rolesEnum } = require('../utils/rolesEnum')

router.post('/getReadersPaginated', authenticateToken, authorizeRoles(rolesEnum.EMPLOYEE), getReadersPaginated);

module.exports = router;
