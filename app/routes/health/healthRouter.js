require('rootpath')();
const debug = require('debug')('rappi:healthRouter');
const pkg = require('package.json');
const os = require('os');
const v8 = require('v8');

module.exports = (app, express) => {
    const api = express.Router();
    api.get('/', async (req, res, next) => {
        try {
            debug('Health');
            res.json({
                name: process.name,
                nodeVersion: process.versions.node,
                envMode: process.env.NODE_ENV || null,
                memoryUsage: process.memoryUsage(),
                upTime: process.uptime(),
                totalMem: os.totalmem(),
                freeMem: os.freemem(),
                loadAvg: os.loadavg(),
                heap: v8.getHeapStatistics(),
                host: os.hostname(),
                packageJSON: pkg.version
            });
        } catch (error) {
            debug('Health error', error);
            next(error);
        }
    });
    app.use('/health', api);
};
