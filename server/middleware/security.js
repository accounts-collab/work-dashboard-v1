const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const config = require('../config/default');

const limiter = rateLimit({
    windowMs: config.RATE_LIMIT_WINDOW_MS,
    max: config.RATE_LIMIT_MAX,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many requests, please try again later.',
        statusCode: 429
    }
});

module.exports = {
    helmet: helmet(),
    limiter
};
