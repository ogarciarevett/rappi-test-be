const { addTimestamps, createModifiedAtTrigger } = require('./timestamps');

const createTableWithTimestamps = (knex, tableName, cb) =>
  knex.schema
    .createTable(tableName, cb)
    .then(() => addTimestamps(knex, tableName))
    .then(() => createModifiedAtTrigger(knex, tableName));

const dropTable = ({ schema }, tableName) => schema.dropTable(tableName);

module.exports = {
  createTableWithTimestamps,
  dropTable,
};
