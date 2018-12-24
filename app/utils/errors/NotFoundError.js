require('rootpath')();
const { NOT_FOUND } = require('http-status-codes');

class NotFoundError extends Error {
    constructor(param = '') {
        const message = param instanceof Error ? param.message : param;
        super(message);

        this.defaultMessage = 'Not found error';
        this.name = this.constructor.name;
        this.status = NOT_FOUND;
    }
}

module.exports = NotFoundError;
