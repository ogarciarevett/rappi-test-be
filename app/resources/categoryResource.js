require('rootpath')();
const dbClient = require('app/communications/dbClient');
const logger = require('app/utils/logger');
const base = require('app/utilities/base');
const { PRODUCT } = require('app/constants');
const { paginate } = require('app/utilities/pagination');

class CategoryResource extends base {
  constructor() {
    super(dbClient.getConnection());
    this.setTable(PRODUCT);
    this.softDelete = true;
    this.paginate = paginate;
  }

  async getAll(page = null, itemLimit = null, conditions = {}) {
    try {
      return await this.paginate(
        this.knex,
        this.tableName,
        itemLimit,
        page,
        conditions,
      );
    } catch (error) {
      logger.error(`Error getting all items from ${this.tableName}`);
      return Promise.reject(error);
    }
  }

  /**
   *
   * @param {Object} conditions object containing the conditions to perform the query
   */
  async findBy(conditions = {}) {
    try {
      return await this.knex(this.tableName)
        .where(conditions)
        .select();
    } catch (error) {
      logger.error(error);
      return Promise.reject(error);
    }
  }
}

const resource = new CategoryResource();

module.exports = resource;
