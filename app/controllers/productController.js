const debug = require('debug')('rappi:productController');

class ProductController {
  static async getAll(query) {
    try {
      return { test: true }
    } catch (error) {
      debug(error);
      return Promise.reject(error);
    }
  }

  static async getID(id) {
    try {
      return { test: true }
    } catch (error) {
      debug(error);
      return Promise.reject(error.data);
    }
  }
}

module.exports = ProductController;
