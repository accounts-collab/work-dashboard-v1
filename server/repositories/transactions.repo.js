const pool = require('../database');

class TransactionsRepository {
    async getAll() {
        const result = await pool.query('SELECT * FROM transactions ORDER BY date DESC');
        return result.rows.map(row => ({
            ...row,
            amount: this.formatAmount(row.amount, row.type)
        }));
    }

    // Helper to match the mock data string format "+ $12,500.00"
    formatAmount(amount, type) {
        const num = parseFloat(amount);
        const sign = type === 'income' ? '+' : '-';
        const formatted = Math.abs(num).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        return `${sign} $${formatted}`;
    }

    async add(transaction) {
        const { name, amount, date, status, type } = transaction;
        const result = await pool.query(
            'INSERT INTO transactions (name, amount, date, status, type) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, amount, date, status, type]
        );
        const row = result.rows[0];
        return {
            ...row,
            amount: this.formatAmount(row.amount, row.type)
        };
    }
}

module.exports = new TransactionsRepository();
