require('rootpath')();

const logger = './logger';
const { ServerError } = require('./errors');

class Base {
    constructor(knex) {
        this.tableKey = 'id';
        this.knex = knex;
    }

    setTable(tableName) {
        if (!tableName) {
            throw new ServerError(
                `tableName of Base class object can't be null or empty. Provided value was: '${tableName}'`,
            );
        }
        this.tableName = tableName;
    }

    async insertRow(object, trx) {
        try {
            let insertQuery = this.knex(this.tableName)
                .insert(object)
                .returning(this.tableKey);
            if (trx) {
                insertQuery = insertQuery.transacting(trx);
            }
            const resp = await insertQuery;
            if (resp && resp.length === 1) {
                return resp[0];
            }

            logger.error(
                'Unexpected response in insert',
                this.tableName,
                object,
                resp,
            );
            throw new ServerError(
                `Unexpected response in insert ${this.tableName}`,
            );
        } catch (err) {
            logger.error('Error in insert', this.tableName, object);
            throw err;
        }
    }

    async getByID(id, trx) {
        try {
            let selectQuery = this.knex
                .select()
                .from(this.tableName)
                .where(this.tableKey, id);

            if (this.softDelete) selectQuery.where({ active: true });

            if (trx) {
                selectQuery = selectQuery.transacting(trx);
            }
            const resp = await selectQuery;
            if (resp && resp.length) {
                return resp[0];
            }
            return null;
        } catch (err) {
            logger.error('Error in select', this.tableName, id);
            throw err;
        }
    }

    async updateByID(id, object, trx) {
        try {
            let updateQuery = this.knex(this.tableName)
                .update(object)
                .where(this.tableKey, id);
            if (trx) {
                updateQuery = updateQuery.transacting(trx);
            }
            return await updateQuery;
        } catch (err) {
            logger.error('Error in update', this.tableName, id, object);
            throw err;
        }
    }

    async deleteByID(id, trx) {
        try {
            let query;

            if (this.softDelete) {
                query = this.knex(this.tableName)
                    .update({ active: false })
                    .where(this.tableKey, id);
            } else {
                query = this.knex(this.tableName)
                    .delete()
                    .where(this.tableKey, id);
            }

            if (trx) {
                query = query.transacting(trx);
            }

            return await query;
        } catch (err) {
            logger.error('Error in delete', this.tableName, id);
            throw err;
        }
    }
}

module.exports = Base;
