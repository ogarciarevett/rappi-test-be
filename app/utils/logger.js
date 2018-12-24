const winston = require('winston');

const level = process.env.LOG_LEVEL || 'debug';

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: level,
            timestamp: () => new Date().toLocaleTimeString(),
            colorize: true,
        }),
        new winston.transports.File({
            filename: './logs/errors.log',
            level: 'error',
            timestamp: () => new Date().toLocaleTimeString(),
        }),
    ],
    exitOnError: false,
});

module.exports = logger;
