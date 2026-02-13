const { Pool } = require('pg');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const migrateAuth = async () => {
    try {
        console.log('Applying auth migrations...');
        const schema = fs.readFileSync(path.join(__dirname, 'migrations', 'auth_tables.sql'), 'utf8');
        await pool.query(schema);
        console.log('Auth tables created successfully!');
    } catch (err) {
        console.error('Error applying auth migrations:', err);
    } finally {
        await pool.end();
    }
};

migrateAuth();
