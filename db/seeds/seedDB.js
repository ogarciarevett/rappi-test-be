require('rootpath')();
const TABLE_NAMES = require('app/utils/constants').tableNames;
const productsData = require('migrations/seeds/products.json');
const categoriesData = require('migrations/seeds/categories.json');

const seedDB = async knex => {
  await knex(TABLE_NAMES.PRODUCT).insert(productsData);
  await knex(TABLE_NAMES.CATEGORIES).insert(categoriesData);
};

module.exports = seedDB;
