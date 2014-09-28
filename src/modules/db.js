var mongoose = require('mongoose');
var config = require('../config');
if (config.env.dev) {
	require('mockgoose')(mongoose);
}
var db = mongoose.createConnection();

function connect () {
	if (config.env.prod) {
		db.open(config.db.host, config.db.name);
	}
	db.on('error', console.error.bind(console, 'mongodb connection error:'));
}

exports.connect = connect;
exports.connection = db;