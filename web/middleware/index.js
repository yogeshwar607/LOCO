const basic = require('./basic.middleware');
const handleError = require('./handleError.middleware');
const requestLogger = require('./requestLogger.middleware');

module.exports = {
  basic,
  handleError,
  requestLogger,
  };