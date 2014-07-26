var mongoose = require('mongoose');
var dbHost = 'localhost';
var dbName = 'bcgb';
var db = mongoose.createConnection(dbHost, dbName);
module.exports = db;

db.on('error', console.error.bind(console, 'mongodb connection error:'));