const path = require('path');
const postgresql = require('config').get('postgresql');

const configurationData = {
  client: 'pg',
  version: '7.2',
  connection: {
    user: postgresql.user,
    password: postgresql.password,
    host: postgresql.host,
    port: postgresql.port,
    database: postgresql.database,
  },
  migrations: {
    directory: path.join(__dirname, 'migrations'),
    tableName: 'migrations',
  },
};

module.exports = {
  development: configurationData,
  test: configurationData,
  production: configurationData,
};
