const express = require('express');
const router = express.Router();
const metricsController = require('../controllers/metrics');

router.get('/kpis', metricsController.getKpis);
router.get('/trends', metricsController.getTrends);
router.get('/cashflow', metricsController.getCashflow);

module.exports = router;
