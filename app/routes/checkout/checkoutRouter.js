const jwtValidator = require('app/middlewares/jwtValidator');
const checkoutHandler = require('./checkoutHandler');

module.exports = (app, express) => {
    const api = express.Router();

    api.post('/buy', jwtValidator, checkoutHandler.buy);
    api.post('/management', jwtValidator, checkoutHandler.management);
    api.get('/items', jwtValidator, checkoutHandler.getAll);
    app.use('/api/checkout', api);
};
