var http = require('http');
var config = require('../config');
var app = require('./app');
var log = require('../modules/log');
var server = http.createServer(app);

server.listen(config.web.port || 8000, function(err) {
	if (err) {
		return log.error(err);
	}
	log.info("BCGB Web server listening on %s", server.address().port);
});