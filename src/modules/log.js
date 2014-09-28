var bunyan = require('bunyan');
var log = bunyan.createLogger({ name: 'bcgb' });
module.exports = log;