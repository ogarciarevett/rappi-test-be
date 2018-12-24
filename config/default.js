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
        clientID:
            process.env.AUTH0_CLIENT_ID || 'fvGojA5YGbpweMr5qw5Va80leEXK1dad',
    },
};
