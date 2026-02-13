const logger = require('../utils/logger');

const requestLogger = (req, res, next) => {
    const start = Date.now();

    // Log response on finish
    res.on('finish', () => {
        const duration = Date.now() - start;
        const message = `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`;

        const meta = {
            requestId: req.id,
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            duration,
            userAgent: req.get('user-agent'),
            ip: req.ip
        };

        if (res.statusCode >= 400) {
            logger.warn(message, meta);
        } else {
            logger.info(message, meta);
        }
    });

    next();
};

module.exports = requestLogger;
