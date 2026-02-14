const express = require('express');
const cors = require('cors');
const path = require('path');
const expressStaticGzip = require("express-static-gzip");
const cookieParser = require('cookie-parser');

const config = require('./config/default');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const requestId = require('./middleware/requestId');
const { helmet, limiter } = require('./middleware/security');
const sseService = require('./services/sse');

// Routes
const metricsRoutes = require('./routes/metrics');
const transactionsRoutes = require('./routes/transactions');
const webookRoutes = require('./routes/webhooks');
const authRoutes = require('./routes/auth');
const authenticateToken = require('./middleware/auth');

const app = express();

// Security & Infrastructure Middleware
app.use(helmet);
app.use(cors({ origin: config.CORS_ORIGIN }));
app.use(limiter);
app.use(requestId);
app.use(express.json());
app.use(cookieParser());
app.use(logger);

// SSE Endpoint
app.get('/api/events', (req, res) => {
    // SSE headers
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
        'X-Accel-Buffering': 'no' // Nginx support
    });

    const client = sseService.addClient(res);

    req.on('close', () => {
        client.close();
    });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/metrics', metricsRoutes);
app.use('/api/transactions', authenticateToken, transactionsRoutes);
app.use('/webhooks', webookRoutes);

// Health Check
app.get('/health', async (req, res) => {
    const healthcheck = {
        uptime: process.uptime(),
        timestamp: Date.now(),
        status: 'OK',
        dbStatus: 'unknown',
        memoryUsage: process.memoryUsage(),
    };

    try {
        const db = require('./database');
        await db.query('SELECT 1');
        healthcheck.dbStatus = 'connected';
    } catch (error) {
        healthcheck.dbStatus = 'disconnected';
        healthcheck.status = 'ERROR';
        healthcheck.error = error.message;
        res.status(503);
    }

    res.json(healthcheck);
});

// Serve compressed static files with priority for Brotli - ONLY LOCALLY
if (!process.env.VERCEL) {
    app.use('/', expressStaticGzip(path.join(__dirname, '../Financial Dashboard/dist'), {
        enableBrotli: true,
        orderPreference: ['br', 'gz'],
        setHeaders: function (res, filePath) {
            if (filePath.endsWith('index.html')) {
                res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
            } else {
                res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
            }
        }
    }));

    // Fallback for SPA - ONLY LOCALLY
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../Financial Dashboard/dist/index.html'));
    });
}

// Error Handler
app.use(errorHandler);

// Export app for Vercel
module.exports = app;

// Only listen if run directly
if (require.main === module) {
    app.listen(config.PORT, () => {
        console.log(`Server is running on port ${config.PORT} in ${config.ENV} mode`);
    });
}

