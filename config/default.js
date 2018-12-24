module.exports = {
  port: process.env.PORT || 7000,
  swagger: {
    users: {
      ml: 'omartest',
    },
    options: {
      swaggerDefinition: {
        info: {
          title: 'Omar test',
          version: '1.0.0',
          description: 'This is a minimal API',
        },
        basePath: '/',
      },
      apis: [
        './swagger.yaml', // static swagger YAML
        '**/*Router*.js', // dinamic router documentation
      ],
    },
  },
  auth0: {
    domain: process.env.AUTH0_DOMAIN || 'rappi-test-be.auth0.com',
    clientID: process.env.AUTH0_CLIENT_ID || 'fvGojA5YGbpweMr5qw5Va80leEXK1dad',
  },
  postgresql: {
    maxPool: 8,
    minPool: 0,
    user: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASSWORD || 'test1234',
    host: process.env.PG_HOST || 'localhost',
    port: process.env.PG_PORT ? process.env.PG_PORT : '5432',
    database: (() => {
      if (process.env.CUSTOM_DB) return process.env.CUSTOM_DB;
      if (process.env.NODE_ENV === 'test') return 'rappi_test';
      return 'rappi';
    })(),
  },
};
