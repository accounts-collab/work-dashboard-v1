const express = require('express');
const router = express.Router();
const webhooksController = require('../controllers/webhooks');

router.post('/stripe', webhooksController.handleStripeWebhook);
router.post('/payment', webhooksController.handlePaymentWebhook);
router.post('/accounting', webhooksController.handleAccountingWebhook);

module.exports = router;
