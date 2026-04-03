const recordService = require('../services/recordService');

// Create record
const createRecord = async (req, res) => {
    try {
        const { amount, type, category, record_date, description } = req.body;
        const userId = req.user.id;

        const record = await recordService.createRecord(
            userId,
            amount,
            type,
            category,
            record_date,
            description
        );

        res.status(201).json({
            message: 'Record created successfully',
            record,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all records with filters
const getRecords = async (req, res) => {
    try {
        const userId = req.user.id;
        const { type, category, startDate, endDate } = req.query;

        const filters = {};
        if (type) filters.type = type;
        if (category) filters.category = category;
        if (startDate) filters.startDate = startDate;
        if (endDate) filters.endDate = endDate;

        const records = await recordService.getRecordsByUser(userId, filters);

        res.json({
            message: 'Records retrieved successfully',
            count: records.length,
            records,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get single record
const getRecordById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const record = await recordService.getRecordById(id, userId);

        if (!record) {
            return res.status(404).json({ error: 'Record not found' });
        }

        res.json({
            message: 'Record retrieved successfully',
            record,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update record
const updateRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const { amount, type, category, record_date, description } = req.body;

        const updates = { amount, type, category, record_date, description };

        const record = await recordService.updateRecord(id, userId, updates);

        res.json({
            message: 'Record updated successfully',
            record,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete record
const deleteRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const result = await recordService.deleteRecord(id, userId);

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createRecord,
    getRecords,
    getRecordById,
    updateRecord,
    deleteRecord,
};