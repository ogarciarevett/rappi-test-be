const logger = require('app/utils/logger');

class ProductController {
    static async getAll(query) {
        try {
            return { test: true };
        } catch (error) {
            logger.error(error);
            return Promise.reject(error);
        }
    }

    static async getID(id) {
        try {
            return { test: true };
        } catch (error) {
            logger.error(error);
            return Promise.reject(error.data);
        }
    }
}

module.exports = ProductController;
