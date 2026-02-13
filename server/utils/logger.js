const winston = require('winston');

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    defaultMeta: { service: 'financial-dashboard-backend' },
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    ]
});

// If we're in production, we might want to log purely in JSON without colorization for better parsing
if (process.env.NODE_ENV === 'production') {
    logger.transports.forEach(t => {
        if (t instanceof winston.transports.Console) {
            t.format = winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            );
        }
    });
}

module.exports = logger;
