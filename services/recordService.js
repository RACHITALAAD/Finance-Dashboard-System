const pool = require('../config/database');

const createRecord = async (userId, amount, type, category, record_date, description) => {
    try {
        const result = await pool.query(
            'INSERT INTO financial_records (user_id, amount, type, category, record_date, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [userId, amount, type, category, record_date, description || null]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const getRecordsByUser = async (userId, filters = {}) => {
    try {
        let query = 'SELECT * FROM financial_records WHERE user_id = $1';
        const params = [userId];
        let paramIndex = 2;

        // Apply filters
        if (filters.type) {
            query += ` AND type = $${paramIndex}`;
            params.push(filters.type);
            paramIndex++;
        }

        if (filters.category) {
            query += ` AND category = $${paramIndex}`;
            params.push(filters.category);
            paramIndex++;
        }

        if (filters.startDate && filters.endDate) {
            query += ` AND record_date BETWEEN $${paramIndex} AND $${paramIndex + 1}`;
            params.push(filters.startDate, filters.endDate);
            paramIndex += 2;
        }

        query += ' ORDER BY record_date DESC LIMIT 100';

        const result = await pool.query(query, params);
        return result.rows;
    } catch (error) {
        throw error;
    }
};

const getRecordById = async (recordId, userId) => {
    try {
        const result = await pool.query(
            'SELECT * FROM financial_records WHERE id = $1 AND user_id = $2',
            [recordId, userId]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const updateRecord = async (recordId, userId, updates) => {
    try {
        const { amount, type, category, record_date, description } = updates;

        const result = await pool.query(
            'UPDATE financial_records SET amount = $1, type = $2, category = $3, record_date = $4, description = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 AND user_id = $7 RETURNING *',
            [amount, type, category, record_date, description, recordId, userId]
        );

        if (result.rows.length === 0) {
            throw new Error('Record not found');
        }

        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const deleteRecord = async (recordId, userId) => {
    try {
        const result = await pool.query(
            'DELETE FROM financial_records WHERE id = $1 AND user_id = $2 RETURNING id',
            [recordId, userId]
        );

        if (result.rows.length === 0) {
            throw new Error('Record not found');
        }

        return { message: 'Record deleted successfully' };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createRecord,
    getRecordsByUser,
    getRecordById,
    updateRecord,
    deleteRecord,
};