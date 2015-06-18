# api-jwt

JSON Web Token Middleware. Creates and verifies JWT for API Endpoints.

## Basic Usage

```js
var tokens = require('api-jwt')({
    /**
     * Keep it secret, keep it safe
     *
     * @required
     * @type    {String}
     */
    secret: 'this one time at band camp...',

    /**
     * How long in seconds until the token expires
     *
     * @type    {Number}
     */
    ttl: 3600, // Default

    /**
     * Default header to look for
     *
     * @type    {String}
     */
    header: 'X-Request-Token',

    /**
     * Algorithm to Use
     * https://github.com/auth0/node-jsonwebtoken#algorithms-supported
     *
     * @type    {String}
     */
    algorithm: 'HS512', // Default

    /**
     * Default Session Variable to look for
     *
     * @type    {String}
     */
    sessionName: '_secret'
});

/**
 * Save the value we want to verify against.
 *
 * @type    {String}
 */
req.session._secret = 'The cake is a lie';

/**
 * Create the token. Pass this to the client but don't save it to the session.
 *
 * @type    {String}
 */
var token = tokens.create(req.session._secret);

/**
 * Apply to a route. This will look for the token in the request, decode it and check if it matches the secret stored in the session. Looks for the token first in the header, then body, then query.
 */
app.get('/api/1/resource', tokens.verify, handleGetResource);

```
