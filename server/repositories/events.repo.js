const pool = require('../database');

class EventsRepository {
    async logEvent(eventType, payload) {
        const result = await pool.query(
            'INSERT INTO events_log (event_type, payload) VALUES ($1, $2) RETURNING *',
            [eventType, JSON.stringify(payload)]
        );
        return result.rows[0];
    }
}

module.exports = new EventsRepository();
