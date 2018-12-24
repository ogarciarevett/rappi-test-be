const ProductHandler = require('./productHandler');

module.exports = (app, express) => {
    const api = express.Router();
    api.get('/', ProductHandler.find);

    api.get('/:id', ProductHandler.findById);

    app.use('/api/product', api);
};
