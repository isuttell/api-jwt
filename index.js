/*******************************************************************************
 * Json Web Tokens
 *
 * @author       Isaac Suttell <isaac@isaacsuttell.com>
 * @file         Library to protect API end points from unauthorized access.
 *               Tokens are stored in the headers of each request. Middleware
 *               searches for this header and then decodes the token it finds.
 ******************************************************************************/

var _ = require('lodash');

/**
 * Default options
 *
 * @type    {Object}
 */
var defaults = {
  /**
   * How to encrypt it
   *
   * @type    {String}
   */
  algorithm: 'HS512',

  /**
   * Header to look for
   *
   * @type    {String}
   */
  header: 'X-Request-Token',

  /**
   * How long in seconds before we expire
   *
   * @type    {Number}
   */
  ttl: 3600,

  /**
   * Where to look in the session for the value to check againse
   *
   * @type    {String}
   */
  sessionName: '_secret'
};

/**
 * Create a token
 *
 * @type    {[type]}
 */
var create = require('./lib/create');
var check = require('./lib/check');
var middleware = require('./lib/middleware');

/**
 * Set up default options
 *
 * @param     {Object}    options
 * @return    {Object}
 */
module.exports = function(options) {
  options = _.extend({}, defaults, options);

  /**
   * Public API
   */
  return {
    /**
     * Create a token
     *
     * @type    {Function}
     */
    create: create(options),

    /**
     * Middleware to use in Express.js
     *
     * @type    {Function}
     */
    middleware: middleware(options),

    /**
     * Alias for Middleware
     *
     * @type    {Function}
     */
    verify: middleware(options),

    /**
     * Verify a token
     *
     * @type    {Function}
     */
    check: check(options)
  };
};
