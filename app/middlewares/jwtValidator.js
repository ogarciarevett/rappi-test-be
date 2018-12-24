const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const { domain, clientID } = require('config').get('auth0');

module.exports = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${domain}/.well-known/jwks.json`,
    }),
    audience: clientID,
    issuer: `https://${domain}/`,
    algorithms: ['RS256'],
});
