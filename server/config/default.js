require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 5000,
    ENV: process.env.NODE_ENV || 'development',
    CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
    CORS_WHITELIST: (process.env.CORS_WHITELIST || '').split(',').filter(Boolean),
    RATE_LIMIT_WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    RATE_LIMIT_MAX: 100, // limit each IP to 100 requests per windowMs
};
