const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const { authenticateToken, authorize } = require('../middleware/auth');

const router = express.Router();

router.get(
    '/summary',
    authenticateToken,
    authorize(['viewer', 'analyst', 'admin']),
    dashboardController.getFinancialSummary
);

router.get(
    '/categories',
    authenticateToken,
    authorize(['analyst', 'admin']),
    dashboardController.getCategoryBreakdown
);

router.get(
    '/recent-activity',
    authenticateToken,
    authorize(['viewer', 'analyst', 'admin']),
    dashboardController.getRecentActivity
);

router.get(
    '/trends',
    authenticateToken,
    authorize(['analyst', 'admin']),
    dashboardController.getMonthlyTrends
);

router.get(
    '/admin-dashboard',
    authenticateToken,
    authorize(['admin']),
    dashboardController.getAdminDashboard
);

module.exports = router;