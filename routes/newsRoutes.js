const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');
const { rolesEnum } = require('../utils/rolesEnum');

// Route to get all news posts
router.get('/getAll', authenticateToken, authorizeRoles(rolesEnum.USER, rolesEnum.EMPLOYEE ), newsController.getNewsPosts);

// Route to add a new news post
router.post('/add', authenticateToken, authorizeRoles(rolesEnum.EMPLOYEE), newsController.addNewsPost);

// Route to update an existing news post
router.put('/update', authenticateToken, authorizeRoles(rolesEnum.EMPLOYEE), newsController.updateNewsPost);

// Route to delete a news post by ID
router.delete('/delete/:postId', authenticateToken, authorizeRoles(rolesEnum.EMPLOYEE), newsController.deleteNewsPost);

module.exports = router;
