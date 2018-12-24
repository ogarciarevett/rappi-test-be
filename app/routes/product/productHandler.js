require('rootpath')();
const debug = require('debug')('rappi:productHandler');
const HTTP_STATUSES = require('http-status-codes');
const ProductValidator = require('app/validators/productValidator');
const ProductController = require('app/controllers/productController');

class ProductHandler {
    static async find(req, res, next) {
        try {
            const { query } = req;
            await ProductValidator.validateSearch(query);
            const items = await ProductController.getAll(query.search);
            res.status(HTTP_STATUSES.OK).json(items);
        } catch (error) {
            debug(error);
            next(error);
        }
    }

    static async findById(req, res, next) {
        try {
            const { params } = req;
            await ProductValidator.validateIdParam(params);
            const item = await ProductController.getID(params.id);
            res.status(HTTP_STATUSES.OK).json(item);
        } catch (error) {
            debug(error);
            next(error);
        }
    }
}

module.exports = ProductHandler;
