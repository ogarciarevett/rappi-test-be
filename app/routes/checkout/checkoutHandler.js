require('rootpath')();
const debug = require('debug')('rappi:checkoutHandler');
const HTTP_STATUSES = require('http-status-codes');
const CheckoutController = require('app/controllers/checkoutController');
const { BadRequestError } = require('app/utils/errors');

const checkoutCtrl = new CheckoutController();

class CheckoutHandler {
    static async buy(req, res, next) {
        try {
            const { payment } = req;
            const result = await CheckoutController.pay(payment);
            res.status(HTTP_STATUSES.OK).json(result);
        } catch (error) {
            debug(error);
            next(error);
        }
    }

    static async management(req, res, next) {
        try {
            const { type, id } = req.body;
            let result;
            if (type !== 'add' || type !== 'remove')
                throw new BadRequestError('no types allowed');
            else if (type === 'remove')
                result = await checkoutCtrl.removeItem(id);
            else if (type === 'add') result = await checkoutCtrl.addItem(id);

            res.status(HTTP_STATUSES.OK).json(result);
        } catch (error) {
            debug(error);
            next(error);
        }
    }

    static async getAll(req, res, next) {
        try {
            res.status(HTTP_STATUSES.OK).json(result);
        } catch (error) {
            debug(error);
            next(error);
        }
    }
}

module.exports = CheckoutHandler;
