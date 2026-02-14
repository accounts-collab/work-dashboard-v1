const { Pool } = require('pg');
require('dotenv').config();

if (!process.env.DATABASE_URL) {
    console.error('FATAL ERROR: DATABASE_URL is not defined.');
    // In Vercel, this log will be visible and tell us exactly what's wrong.
    // We don't throw here to avoid crashing immediately, letting the health check run,
    // but the pool connection will likely fail.
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
});

pool.on('connect', () => {
    console.log('Database connected successfully');
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool,
};
