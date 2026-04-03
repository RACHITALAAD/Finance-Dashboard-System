const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validateRecord = (req, res, next) => {
    const { amount, type, category, record_date } = req.body;

    if (!amount || amount <= 0) {
        return res.status(400).json({ error: 'Amount must be a positive number' });
    }

    if (!['income', 'expense'].includes(type)) {
        return res.status(400).json({ error: 'Type must be "income" or "expense"' });
    }

    if (!category || category.trim() === '') {
        return res.status(400).json({ error: 'Category is required' });
    }

    if (!record_date || isNaN(Date.parse(record_date))) {
        return res.status(400).json({ error: 'Valid date is required' });
    }

    next();
};

module.exports = { validateEmail, validateRecord };