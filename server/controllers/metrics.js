const metricsRepo = require('../repositories/metrics.repo');
const ApiResponse = require('../utils/apiResponse');

exports.getKpis = async (req, res, next) => {
    try {
        const data = await metricsRepo.getKpis();
        ApiResponse.success(res, data);
    } catch (error) {
        next(error);
    }
};

exports.getTrends = async (req, res, next) => {
    try {
        const data = await metricsRepo.getTrends();
        ApiResponse.success(res, data);
    } catch (error) {
        next(error);
    }
};

exports.getCashflow = async (req, res, next) => {
    try {
        const data = await metricsRepo.getCashflow();
        ApiResponse.success(res, data);
    } catch (error) {
        next(error);
    }
};
