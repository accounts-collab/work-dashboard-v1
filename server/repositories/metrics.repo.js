const pool = require('../database');

class MetricsRepository {
    async getLatestSnapshot() {
        const result = await pool.query('SELECT snapshot_data FROM metrics_snapshots ORDER BY created_at DESC LIMIT 1');
        if (result.rows.length === 0) return null;
        return result.rows[0].snapshot_data;
    }

    async getKpis() {
        const snapshot = await this.getLatestSnapshot();
        return snapshot ? snapshot.kpi : [];
    }

    async getTrends() {
        const snapshot = await this.getLatestSnapshot();
        return snapshot ? snapshot.trends : [];
    }

    async getCashflow() {
        const snapshot = await this.getLatestSnapshot();
        return snapshot ? snapshot.cashflow : {};
    }

    async updateKpi(title, amount) {
        const snapshot = await this.getLatestSnapshot();
        if (!snapshot) return null;

        const kpiIndex = snapshot.kpi.findIndex(k => k.title === title);
        if (kpiIndex !== -1) {
            const kpi = snapshot.kpi[kpiIndex];
            const currentVal = parseFloat(kpi.value.replace(/[^0-9.-]+/g, ""));
            const newVal = currentVal + amount;
            kpi.value = `$${newVal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

            // Create new snapshot
            await pool.query('INSERT INTO metrics_snapshots (snapshot_data) VALUES ($1)', [JSON.stringify(snapshot)]);

            return kpi;
        }
        return null;
    }
}

module.exports = new MetricsRepository();
