require('rootpath')();
const { INTERNAL_SERVER_ERROR } = require('http-status-codes');

class ServerError extends Error {
    constructor(param = '') {
        const message = param instanceof Error ? param.message : param;
        super(message);
        this.defaultMessage = 'Internal server error';
        this.name = this.constructor.name;
        this.status = INTERNAL_SERVER_ERROR;
    }
}

module.exports = ServerError;
