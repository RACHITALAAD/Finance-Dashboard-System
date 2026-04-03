const app = require('./app');
const pool = require('./config/database');

const PORT = process.env.PORT || 5000;

// Test database connection
pool.query('SELECT NOW()', (err, result) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Database connected successfully');
    }
});

pool.on('error', (err) => {
    console.error('Pool error:', err);
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});