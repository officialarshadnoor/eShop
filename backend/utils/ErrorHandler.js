class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCOde = statusCode;

        Error.captureStackTrace(this,this.constructor);
    }
};

module.exports = ErrorHandler;