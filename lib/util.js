/*******************************************************************************
 * util
 *
 * @author       Isaac Suttell <isaac@isaacsuttell.com>
 * @file         Utility Functions
 ******************************************************************************/

var _ = require('lodash');

/**
 * Ensure a secret is a string and a certian length
 *
 * @param     {String}     str
 * @return    {Boolean}
 */
module.exports.assertValidSecret = function assertValidSecret(str) {
  // Make sure secret is a string and defined
  if(!_.isString(str) || str.length < 32) {
    throw new TypeError('Secret not setup correctly');
  }
  return true;
};


/**
 * Get the IP of the request
 *
 * @param     {Express.req}    req
 * @return    {String}
 */
module.exports.getIp = function getIp(req) {
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
};
