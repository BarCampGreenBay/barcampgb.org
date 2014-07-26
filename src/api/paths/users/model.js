var mongoose = require('mongoose');
var db = require('../../db.js');
var schema = mongoose.Schema({
	name: String
});
var model = db.model('User', schema);

module.exports = model;