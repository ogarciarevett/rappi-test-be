const knex = require('knex');
const pgConfig = require('config').get('postgresql');

let isolatedKnexConnections = [];
let singletonConnection = null;

const dbConfig = {
    client: 'pg',
    version: '7.2',
    connection: {
        user: pgConfig.user,
        password: pgConfig.password,
        host: pgConfig.host,
        port: pgConfig.port,
        database: pgConfig.database,
    },
    pool: {
        min: pgConfig.minPool,
        max: pgConfig.maxPool,
    },
};

class dbClient {
    newConnection() {
        return knex(dbConfig);
    }

    getConnection() {
        // TODO:set connection based on environment. Testing DB
        if (!singletonConnection) {
            singletonConnection = this.newConnection();
        }
        return singletonConnection;
    }

    createConnection(shouldIsolateKnexConnection) {
        // eslint-disable-next-line
        let knex;
        if (shouldIsolateKnexConnection) {
            knex = this.newConnection();
            isolatedKnexConnections.push(knex);
        } else {
            knex = this.getConnection();
        }
        return knex;
    }

    closeAllIsolated() {
        console.log(
            `Closing ${isolatedKnexConnections.length} Knex Connenctions`,
        );
        const promises = [];
        for (let i = 0; i < isolatedKnexConnections.length; i++) {
            promises.push(isolatedKnexConnections[i].destroy());
        }
        isolatedKnexConnections = [];
        return Promise.all(promises).catch(err => {
            console.log('ERRRR', err);
            return err;
        });
    }
}
module.exports = dbClient;
