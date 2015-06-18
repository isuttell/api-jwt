/*******************************************************************************
 * create
 *
 * @author       Isaac Suttell <isaac@isaacsuttell.com>
 * @file         Create a json web token
 ******************************************************************************/

var jwt = require('jsonwebtoken');
var _ = require('lodash');
var util = require('./util');

/**
 * Sets up defaults from the library
 * @param     {Object}    options
 * @return    {Function}
 */
module.exports = function(options) {
  options = options || {};

  /**
   * Encrypts payload with secret
   *
   * @param     {Object}    payload
   * @param     {Object}    options
   * @return    {String}
   */
  return function(key, userOptions) {
    options = _.extend(options, userOptions);

    if (!_.isString(key)) {
      throw new TypeError('Key is not a string');
    }

    // Make sure secret is a string and defined
    util.assertValidSecret(options.secret);

    // Save as an object
    var payload = {
      payload: key
    };

    // Create token
    var token = jwt.sign(payload, options.secret, {
      expiresInSeconds: options.ttl || 3600
    });

    return token;
  };
};
