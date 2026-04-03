const app = require('./app');
const pool = require('./config/database');

const PORT = process.env.PORT || 5000;

// Test database connection
pool.query('SELECT NOW()', (err, result) => {
    if (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    } else {
        console.log('Database connected successfully');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Press Ctrl+C to stop the server`);
});