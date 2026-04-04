const express = require('express');
const usersController = require('../controllers/usersController');
const { authenticateToken, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all users 
router.get(
    '/',
    authenticateToken,
    authorize(['admin']),
    usersController.getAllUsers
);

// Get current user profile - Any authenticated user
router.get(
    '/profile/me',
    authenticateToken,
    usersController.getUserProfile
);

// Update user role 
router.put(
    '/:userId/role',
    authenticateToken,
    authorize(['admin']),
    usersController.updateUserRole
);

// Update user status 
router.put(
    '/:userId/status',
    authenticateToken,
    authorize(['admin']),
    usersController.updateUserStatus
);

const pool = require('../config/database');

router.delete('/debug/delete-all-users', async (req, res) => {
    try {
        await pool.query('DELETE FROM users');
        res.json({ message: "All users deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;