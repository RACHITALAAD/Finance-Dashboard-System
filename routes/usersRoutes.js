const express = require('express');
const usersController = require('../controllers/usersController');
const { authenticateToken, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all users - Admin only
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

// Update user role - Admin only
router.put(
    '/:userId/role',
    authenticateToken,
    authorize(['admin']),
    usersController.updateUserRole
);

// Update user status - Admin only
router.put(
    '/:userId/status',
    authenticateToken,
    authorize(['admin']),
    usersController.updateUserStatus
);

module.exports = router;