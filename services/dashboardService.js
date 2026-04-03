const pool = require('../config/database');

const getFinancialSummary = async (userId) => {
    try {
        const result = await pool.query(
            `SELECT 
        type,
        SUM(amount) as total
      FROM financial_records
      WHERE user_id = $1
      GROUP BY type`,
            [userId]
        );

        let totalIncome = 0;
        let totalExpense = 0;

        result.rows.forEach(row => {
            if (row.type === 'income') {
                totalIncome = parseFloat(row.total);
            } else if (row.type === 'expense') {
                totalExpense = parseFloat(row.total);
            }
        });

        return {
            totalIncome,
            totalExpense,
            netBalance: totalIncome - totalExpense,
        };
    } catch (error) {
        throw error;
    }
};

const getCategoryBreakdown = async (userId) => {
    try {
        const result = await pool.query(
            `SELECT 
        category,
        type,
        COUNT(*) as transaction_count,
        SUM(amount) as total
      FROM financial_records
      WHERE user_id = $1
      GROUP BY category, type
      ORDER BY total DESC`,
            [userId]
        );

        return result.rows;
    } catch (error) {
        throw error;
    }
};

const getRecentActivity = async (userId, limit = 10) => {
    try {
        const result = await pool.query(
            `SELECT 
        id,
        amount,
        type,
        category,
        record_date,
        description,
        created_at
      FROM financial_records
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT $2`,
            [userId, limit]
        );

        return result.rows;
    } catch (error) {
        throw error;
    }
};

const getMonthlyTrends = async (userId) => {
    try {
        const result = await pool.query(
            `SELECT 
        DATE_TRUNC('month', record_date)::DATE as month,
        type,
        SUM(amount) as total
      FROM financial_records
      WHERE user_id = $1
      GROUP BY DATE_TRUNC('month', record_date), type
      ORDER BY month DESC
      LIMIT 12`,
            [userId]
        );

        return result.rows;
    } catch (error) {
        throw error;
    }
};

const getAdminDashboard = async () => {
    try {
        const userStats = await pool.query(
            `SELECT 
        COUNT(DISTINCT u.id) as total_users,
        COUNT(DISTINCT CASE WHEN u.status = 'active' THEN u.id END) as active_users,
        COUNT(DISTINCT CASE WHEN u.role = 'admin' THEN u.id END) as admin_count,
        COUNT(DISTINCT CASE WHEN u.role = 'analyst' THEN u.id END) as analyst_count,
        COUNT(DISTINCT CASE WHEN u.role = 'viewer' THEN u.id END) as viewer_count
      FROM users u`
        );

        const recordStats = await pool.query(
            `SELECT 
        COUNT(*) as total_records,
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as total_income,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as total_expense
      FROM financial_records`
        );

        return {
            users: userStats.rows[0],
            records: recordStats.rows[0],
        };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getFinancialSummary,
    getCategoryBreakdown,
    getRecentActivity,
    getMonthlyTrends,
    getAdminDashboard,
};