var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var mongooseToken = require('mongoose-token');
var schema = mongoose.Schema({
	name: String,
	admin: Boolean
});

// passport-local-mongoose will augment user with extra fields and functions
schema.plugin(passportLocalMongoose, {
	usernameField: 'email'
});

// add password reset token functionality
schema.plugin(mongooseToken);

schema.static('forgotPassword', function(email) {
	return this.findByUsername(email).exec()
		.then(function(user) {
			if (!user) {
				throw new Error('User not found!');
			}
			return user.setToken();
		});
});

schema.method('resetPassword', function(password, cb) {
	var user = this;
	user.setPassword(password, function(err) {
		if (err) {
			return cb(err);
		}
		user.resetToken(cb);
	});
});

module.exports = function(db) {
	return db.connection.model('User', schema);
};