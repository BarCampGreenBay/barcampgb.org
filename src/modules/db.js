var mongoose = require('mongoose');
var config = require('../config');
var log = require('../modules/log');

mongoose.Promise = global.Promise;
var db = mongoose.createConnection();

function connect () {
	db.open(config.db.host, config.db.name, config.db.port);
	db.on('error', log.error.bind(log, 'mongodb connection error:'));
}

exports.connect = connect;
exports.connection = db;
