const dashboardService = require('../services/dashboardService');

// Get financial summary
const getFinancialSummary = async (req, res) => {
    try {
        const userId = req.user.id;
        const summary = await dashboardService.getFinancialSummary(userId);

        res.json({
            message: 'Financial summary retrieved',
            summary,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get category breakdown
const getCategoryBreakdown = async (req, res) => {
    try {
        const userId = req.user.id;
        const breakdown = await dashboardService.getCategoryBreakdown(userId);

        res.json({
            message: 'Category breakdown retrieved',
            breakdown,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get recent activity
const getRecentActivity = async (req, res) => {
    try {
        const userId = req.user.id;
        const { limit = 10 } = req.query;
        const activities = await dashboardService.getRecentActivity(userId, limit);

        res.json({
            message: 'Recent activities retrieved',
            count: activities.length,
            activities,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get monthly trends
const getMonthlyTrends = async (req, res) => {
    try {
        const userId = req.user.id;
        const trends = await dashboardService.getMonthlyTrends(userId);

        res.json({
            message: 'Monthly trends retrieved',
            trends,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get admin dashboard (only for admin users)
const getAdminDashboard = async (req, res) => {
    try {
        const dashboard = await dashboardService.getAdminDashboard();

        res.json({
            message: 'Admin dashboard retrieved',
            dashboard,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getFinancialSummary,
    getCategoryBreakdown,
    getRecentActivity,
    getMonthlyTrends,
    getAdminDashboard,
};