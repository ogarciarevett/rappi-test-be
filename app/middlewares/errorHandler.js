require('rootpath')();
const logger = require('app/utils/logger');
const HTTP_STATUS = require('http-status-codes');

module.exports = () => (error, req, res, next) => {
    if (error.status && error.message) {
        logger.error(error);
        res.status(error.status).json({
            success: false,
            status: error.status,
            message: error.message,
        });
    } else {
        logger.info(
            `Catching uncaught error from path: ${req.path}. Err: ${error}`,
        );

        const status = HTTP_STATUS.INTERNAL_SERVER_ERROR;

        const errorMessage = error.message || 'An unknown error occurred';

        const jsonResponse = {
            success: false,
            status: status,
            message: errorMessage,
            error,
        };

        logger.debug(jsonResponse);

        res.status(status).json(jsonResponse);
    }
};
