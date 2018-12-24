const express = require('express');
const config = require('config');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const morgan = require('morgan');
const logger = require('./app/utils/logger');

const basicAuth = require('express-basic-auth');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const routes = require('./app/routes');
const errorHandler = require('./app/middlewares/errorHandler');

const app = express();
const port = config.get('port');

// Swagger setup
const swaggerUsers = config.get('swagger.users');
const swaggerSpec = swaggerJSDoc(config.get('swagger.options'));

app.use(
    morgan('dev', {
        skip: (req, res) => res.statusCode < 400,
        stream: process.stderr,
    }),
);

app.use(
    morgan('dev', {
        skip: (req, res) => res.statusCode >= 400,
        stream: process.stdout,
    }),
);

app.get(
    '/api-docs.json',
    basicAuth({ users: swaggerUsers, challenge: true }),
    (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    },
);
app.use(
    '/docs',
    basicAuth({ users: swaggerUsers, challenge: true }),
    swaggerUI.serve,
    swaggerUI.setup(swaggerSpec),
);

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet.noCache());
app.use(helmet.frameguard());

app.get('/', (req, res) => res.send('Welcome to the Backend Omar test'));

/* Routes */
routes(app, express);

app.use(errorHandler());

app.listen(port, () => {
    logger.info(`server listening on port : ${port}`);
});
