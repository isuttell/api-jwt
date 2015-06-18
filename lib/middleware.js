/*******************************************************************************
 * middleware
 *
 * @author       Isaac Suttell <isaac@isaacsuttell.com>
 * @file         Check to see if a token exists, and is valid
 ******************************************************************************/

var jwt = require('jsonwebtoken');
var _ = require('lodash');

/**
 * Set up options for this middleware instance
 * @param     {Object}    options
 * @return    {Middleware}
 */
module.exports = function(options) {
  /**
   * Load module to verify token
   *
   * @type    {Function}
   */
  var check = require('./check')(options);

  /**
   * Middleware
   * @param     {Express.request}      req
   * @param     {Express.response}      res
   * @param     {Function}    next
   */
  return function(req, res, next) {
    /**
     * An array of possible token locations
     *
     * @type    {Array}
     */
    var tokens = [req.header(options.header)];

    // Check to see if json body is available
    if(req.body) {
      tokens = tokens.concat([req.body._token, req.body.token]);
    }

    // Lastly check the query string
    if(req.query) {
      tokens = tokens.concat([req.query.token]);
    }

    // Find the first one
    var token = _.find(tokens, function(val) {
      return _.isString(val);
    });

    // Ensure there's a token
    if (!token) {
      next({name: 'MissingToken'});
      return;
    }

    // Check it
    check(token, req.session[options.sessionName], function(err, success){
      if (err && err.name === 'TokenExpiredError') {
        // We expired....
        next('TokenExpiredError');
        return;
      } else if (err) {
        // Unexpected Error
        next(err);
        return;
      } else if(success !== true) {
        // Token doesn't match
        next({
          name: 'InvalidToken'
        });
        return;
      } else {
        // Sunshine
        next();
        return;
      }
    });
  };
};
