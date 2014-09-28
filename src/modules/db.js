var mongoose = require('mongoose');
var db = mongoose.createConnection();
var config = require('../config.js').db;

function connect () {
	db.open(config.host, config.name);
	db.on('error', console.error.bind(console, 'mongodb connection error:'));
}

exports.connect = connect;
exports.connection = db;