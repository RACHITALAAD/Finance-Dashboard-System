const userService = require('../services/userService');

// Get all users 
const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();

        res.json({
            message: 'All users retrieved',
            count: users.length,
            users,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get user profile
const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await userService.getUserById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            message: 'User profile retrieved',
            user,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update user role 
const updateUserRole = async (req, res) => {
    try {
        const { userId } = req.params;
        const { role } = req.body;

        if (!role) {
            return res.status(400).json({ error: 'Role is required' });
        }

        const user = await userService.updateUserRole(userId, role);

        res.json({
            message: 'User role updated successfully',
            user,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update user status 
const updateUserStatus = async (req, res) => {
    try {
        const { userId } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ error: 'Status is required' });
        }

        const user = await userService.updateUserStatus(userId, status);

        res.json({
            message: 'User status updated successfully',
            user,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllUsers,
    getUserProfile,
    updateUserRole,
    updateUserStatus,
};