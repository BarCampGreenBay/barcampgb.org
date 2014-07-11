var http = require('http');
var app = require('./app');
var server = http.createServer(app);

server.listen(process.env.NODE_PORT || 8002, function(err) {
	if (err) {
		throw new Error(err);
	}
	console.log("BCGB Web server listening on %s", server.address().port);
});