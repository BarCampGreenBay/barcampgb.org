var mongoose = require('mongoose');
var dbHost = 'localhost';
var dbName = 'bcgb';
var db = mongoose.createConnection();

function connect (argument) {
	db.open(dbHost, dbName);
	db.on('error', console.error.bind(console, 'mongodb connection error:'));
}

exports.connect = connect;
exports.connection = db;