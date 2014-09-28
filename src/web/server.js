var http = require('http');
var app = require('./app');
var log = require('../modules/log');
var server = http.createServer(app);

server.listen(process.env.NODE_PORT || 8000, function(err) {
	if (err) {
		throw new Error(err);
	}
	log.info("BCGB Web server listening on %s", server.address().port);
});