/**
 * @description - postcss options
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

/* eslint-disable import/no-extraneous-dependencies */
const nested = require('postcss-nested');

module.exports = () => ({
  plugins: [nested()],
});
