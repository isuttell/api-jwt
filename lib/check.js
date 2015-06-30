/*******************************************************************************
 * check
 *
 * @author       Isaac Suttell <isaac@isaacsuttell.com>
 * @file         Check a token is valid
 ******************************************************************************/

var jwt = require('jsonwebtoken');
var _ = require('lodash');
var util = require('./util');
var debug = require('debug')('apijwt');

/**
 * Sets up defaults from the library
 *
 * @param     {Object}    options
 * @return    {Function}
 */
module.exports = function(options) {
  options = options || {};

  /**
   * Checks if a token matches a value
   *
   * @param     {String}      token
   * @param     {String}      value
   * @param     {Function}    callback
   */
  return function(token, value, callback) {
    // Make sure secret is a string and defined
    util.assertValidSecret(options.secret);

    jwt.verify(token, options.secret, function(err, decoded) {
      debug({
        token: token,
        expected: value,
        actual: decoded.payload
      });
      if (err) {
        callback(err);
      } else {
        callback(null, decoded.payload === value);
      }
    });
    return token;
  };
};
