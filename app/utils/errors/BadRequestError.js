require('rootpath')();
const { BAD_REQUEST } = require('http-status-codes');

class BadRequestError extends Error {
    constructor(param = '') {
        const message = param instanceof Error ? param.message : param;
        super(message);

        this.defaultMessage = 'Bad request error';
        this.name = this.constructor.name;
        this.status = BAD_REQUEST;
    }
}

module.exports = BadRequestError;
