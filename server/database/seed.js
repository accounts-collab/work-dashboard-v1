const { Pool } = require('pg');
require('dotenv').config();
const { transactionsData, kpiData, trendsData, cashflowData } = require('../data/mock');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const seedDatabase = async () => {
    try {
        console.log('Connecting to database...');
        // Create tables
        const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
        await pool.query(schema);
        console.log('Schema created.');

        // Clear existing data
        await pool.query('TRUNCATE TABLE transactions, metrics_snapshots, events_log RESTART IDENTITY');

        // Seed Transactions
        console.log('Seeding transactions...');
        for (const txn of transactionsData) {
            // txn.amount format is "+ $12,500.00" or "- $450.00"
            // We need to parse it to a number.
            const amountStr = txn.amount.replace(/[^0-9.-]+/g, "");
            const amount = parseFloat(amountStr);

            await pool.query(
                `INSERT INTO transactions (name, amount, date, status, type) VALUES ($1, $2, $3, $4, $5)`,
                [txn.name, amount, txn.date, txn.status, txn.type]
            );
        }

        // Seed Initial Metrics Snapshot
        console.log('Seeding metrics snapshot...');
        const snapshot = {
            kpi: kpiData,
            trends: trendsData,
            cashflow: cashflowData
        };

        await pool.query(
            `INSERT INTO metrics_snapshots (snapshot_data) VALUES ($1)`,
            [JSON.stringify(snapshot)]
        );

        console.log('Database seeded successfully!');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        await pool.end();
    }
};

seedDatabase();
