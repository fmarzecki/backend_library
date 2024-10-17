const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');
const { rolesEnum } = require('../utils/rolesEnum');

// Route to add a worker
router.post('/addWorker', authenticateToken, authorizeRoles(rolesEnum.ADMIN), adminController.addWorker);
router.get('/getAllWorkers', authenticateToken, authorizeRoles(rolesEnum.ADMIN), adminController.getAllWorkers);
router.put('/updateWorker', authenticateToken, authorizeRoles(rolesEnum.ADMIN), adminController.updateWorker);

module.exports = router;


