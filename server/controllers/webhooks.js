const eventBus = require('../events/eventBus');
const metricsRepo = require('../repositories/metrics.repo');
const ApiResponse = require('../utils/apiResponse');

exports.handleStripeWebhook = async (req, res, next) => {
    try {
        const event = req.body;
        console.log(`[Stripe] Event received: ${event.type}`);

        if (event.type === 'payment_intent.succeeded') {
            const amount = event.amount ? event.amount / 100 : 0;

            // Update Data Stores via Repository
            await metricsRepo.updateKpi("Total Revenue", amount);
            await metricsRepo.updateKpi("Net Profit", amount);

            // Emit internal event
            eventBus.emit('dashboard:update', {
                type: 'dashboard_update',
                message: 'New Stripe Payment Received',
                amount
            });
        }

        ApiResponse.success(res, { received: true });
    } catch (error) {
        next(error);
    }
};

exports.handlePaymentWebhook = async (req, res, next) => {
    try {
        const payment = req.body;
        console.log(`[Payment] Webhook received`);

        if (payment.type === 'expense') {
            const amount = parseFloat(payment.amount);

            await metricsRepo.updateKpi("Total Expenses", amount);

            eventBus.emit('dashboard:update', {
                type: 'dashboard_update',
                message: 'New Expense Recorded',
                amount
            });
        }

        ApiResponse.success(res, { received: true });
    } catch (error) {
        next(error);
    }
};

exports.handleAccountingWebhook = async (req, res, next) => {
    try {
        const data = req.body;
        console.log(`[Accounting] Webhook received`);

        eventBus.emit('notification', {
            type: 'notification',
            message: 'Accounting Data Synced'
        });

        ApiResponse.success(res, { received: true });
    } catch (error) {
        next(error);
    }
};
