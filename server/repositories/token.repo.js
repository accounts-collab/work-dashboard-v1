const pool = require('../database');

class TokenRepository {
    async save(token, userId, expiresAt) {
        await pool.query(
            'INSERT INTO refresh_tokens (token, user_id, expires_at) VALUES ($1, $2, $3)',
            [token, userId, expiresAt]
        );
    }

    async find(token) {
        const result = await pool.query('SELECT * FROM refresh_tokens WHERE token = $1', [token]);
        return result.rows[0];
    }

    async revoke(token) {
        await pool.query('DELETE FROM refresh_tokens WHERE token = $1', [token]);
    }

    async revokeUserTokens(userId) {
        await pool.query('DELETE FROM refresh_tokens WHERE user_id = $1', [userId]);
    }
}

module.exports = new TokenRepository();
