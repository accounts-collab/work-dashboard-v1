class ApiResponse {
    constructor(statusCode, data, message = 'Success') {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
        this.timestamp = new Date().toISOString();
    }

    static success(res, data, message = 'Success', statusCode = 200) {
        return res.status(statusCode).json(new ApiResponse(statusCode, data, message));
    }

    static error(res, message = 'Error', statusCode = 500, error = null) {
        const response = new ApiResponse(statusCode, null, message);
        response.error = error;
        return res.status(statusCode).json(response);
    }
}

module.exports = ApiResponse;
