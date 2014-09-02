var mongoose = require('mongoose');
var db = require('../../db.js');
var schema = mongoose.Schema({
	name: String,
	email: String,
	admin: Boolean
});

module.exports = function(db) {
	return db.connection.model('User', schema);
};