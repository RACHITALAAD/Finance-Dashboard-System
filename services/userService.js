const pool = require('../config/database');
const bcrypt = require('bcryptjs');

// Create new user
const createUser = async (email, password, full_name, role = 'viewer') => {
    try {
        // Check if user already exists
        const existingUser = await pool.query(
            'SELECT id FROM users WHERE email = $1',
            [email]
        );

        if (existingUser.rows.length > 0) {
            throw new Error('User with this email already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO users (email, password, full_name, role, status) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, full_name, role, status',
            [email, hashedPassword, full_name, role, 'active']
        );

        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

// Get user by email (for login)
const getUserByEmail = async (email) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

// Get user by ID
const getUserById = async (id) => {
    try {
        const result = await pool.query('SELECT id, email, full_name, role, status FROM users WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

// Get all users (Admin only)
const getAllUsers = async () => {
    try {
        const result = await pool.query(
            'SELECT id, email, full_name, role, status, created_at FROM users ORDER BY created_at DESC'
        );
        return result.rows;
    } catch (error) {
        throw error;
    }
};

// Update user role (Admin only)
const updateUserRole = async (userId, newRole) => {
    try {
        if (!['viewer', 'analyst', 'admin'].includes(newRole)) {
            throw new Error('Invalid role');
        }

        const result = await pool.query(
            'UPDATE users SET role = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, email, full_name, role',
            [newRole, userId]
        );

        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

// Update user status (Admin only)
const updateUserStatus = async (userId, status) => {
    try {
        if (!['active', 'inactive'].includes(status)) {
            throw new Error('Invalid status');
        }

        const result = await pool.query(
            'UPDATE users SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, email, full_name, role, status',
            [status, userId]
        );

        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    getAllUsers,
    updateUserRole,
    updateUserStatus,
};