var http = require('http');
var app = require('./app');
var server = http.createServer(app);

server.listen(process.env.API_PORT || 3000);