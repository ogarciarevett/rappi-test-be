require('rootpath')();
const { UNAUTHORIZED } = require('http-status-codes');

class UnauthorizedError extends Error {
    constructor(param = '') {
        const message = param instanceof Error ? param.message : param;
        super(message);
        this.defaultMessage = 'Unauthorized error';
        this.name = this.constructor.name;
        this.status = UNAUTHORIZED;
    }
}

module.exports = UnauthorizedError;
