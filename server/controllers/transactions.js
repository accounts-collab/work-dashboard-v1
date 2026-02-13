const transactionsRepo = require('../repositories/transactions.repo');
const ApiResponse = require('../utils/apiResponse');

exports.getTransactions = async (req, res, next) => {
    try {
        const data = await transactionsRepo.getAll();
        ApiResponse.success(res, data);
    } catch (error) {
        next(error);
    }
};
