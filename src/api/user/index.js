var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var schema = mongoose.Schema({
	name: String,
	admin: Boolean
});

// passport-local-mongoose will augment user with extra fields and functions
schema.plugin(passportLocalMongoose);

module.exports = function(db) {
	return db.connection.model('User', schema);
};