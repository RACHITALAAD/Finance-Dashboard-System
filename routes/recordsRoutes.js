const express = require('express');
const recordsController = require('../controllers/recordsController');
const { authenticateToken, authorize } = require('../middleware/auth');
const { validateRecord } = require('../middleware/validation');

const router = express.Router();

router.post(
    '/',
    authenticateToken,
    authorize(['analyst', 'admin']),
    validateRecord,
    recordsController.createRecord
);

router.get(
    '/',
    authenticateToken,
    authorize(['viewer', 'analyst', 'admin']),
    recordsController.getRecords
);

router.get(
    '/:id',
    authenticateToken,
    authorize(['viewer', 'analyst', 'admin']),
    recordsController.getRecordById
);

router.put(
    '/:id',
    authenticateToken,
    authorize(['analyst', 'admin']),
    validateRecord,
    recordsController.updateRecord
);

router.delete(
    '/:id',
    authenticateToken,
    authorize(['analyst', 'admin']),
    recordsController.deleteRecord
);

module.exports = router;