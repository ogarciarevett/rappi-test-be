require('rootpath')();
const logger = require('app/utils/logger');
const dbClient = require('app/communications/dbClient');
const { tableNames } = require('app/utils/constants');

class Bootstrap {
    static async cleanDatabase() {
        const client = dbClient.createConnection();
        try {
            logger.info(`Dropping Tables`);
            let query = `DROP TABLE IF EXISTS knex_migrations CASCADE;`;
            Object.keys(tableNames).map(async table => {
                const tableName = tableNames[table];
                logger.info(`dropping table ${tableName}`);
                query += `DROP TABLE IF EXISTS ${tableName} CASCADE;`;
            });
            await client.raw(query);
            logger.info(`Running migrations`);
            await client.migrate.latest();
        } catch (error) {
            logger.error(`Error truncating database ${error}`);
            return Promise.reject(error);
        }
    }

    static async start() {
        try {
            await this.cleanDatabase();
        } catch (error) {
            logger.error(`Error in bootstrap ${error}`);
            process.exit(1);
        }
    }
}

before(async () => {
    logger.info('Running bootstrap scripts');
    return await Bootstrap.start();
});

module.exports = Bootstrap;
