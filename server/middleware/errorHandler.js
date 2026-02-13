const ApiResponse = require('../utils/apiResponse');
const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    logger.error(`Error: ${message}`, {
        requestId: req.id,
        stack: err.stack,
        statusCode,
        method: req.method,
        url: req.originalUrl
    });

    ApiResponse.error(res, message, statusCode, process.env.NODE_ENV === 'development' ? err.stack : null);
};

module.exports = errorHandler;
