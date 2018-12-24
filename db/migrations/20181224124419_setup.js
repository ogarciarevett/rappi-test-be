require('rootpath')();
const TABLE_NAMES = require('app/utils/constants').tableNames;
const { createTimestampsProcedure } = require('db/utilities/timestamps');
const { dropTable, createTableWithTimestamps } = require('db/utilities/tables');

const createProductTable = knex =>
  createTableWithTimestamps(knex, TABLE_NAMES.PRODUCT, t => {
    t.increments('id')
      .primary()
      .notNull();
    t.integer('category_id')
      .references('id')
      .inTable('category')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      .index();
    t.integer('quantity').notNull();
    t.text('price').notNull();
    t.boolean('available').notNull();
    t.integer('sublevel_id').notNull();
    t.text('name').notNull();
    t.uuid('uuid')
      .notNull()
      .defaultTo(knex.raw('uuid_generate_v4()'));
  });

const createCategoryTable = knex =>
  createTableWithTimestamps(knex, TABLE_NAMES.CATEGORY, t => {
    t.increments('id')
      .primary()
      .notNull();
    t.text('name').notNull();
    t.specificType('sublevels', 'json[]').notNull();
  });

exports.up = async knex => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await createTimestampsProcedure(knex);
  await createCategoryTable(knex);
  await createProductTable(knex);
};

exports.down = async knex => {
  await dropTable(knex, TABLE_NAMES.PRODUCT);
  return await dropTable(knex, TABLE_NAMES.CATEGORY);
};
