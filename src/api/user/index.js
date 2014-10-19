var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var mongooseToken = require('mongoose-token');
var schema = mongoose.Schema({
	name: { type: String, required: 'Name is required' },
	shirtSize: {
		type: String,
		enum: [
			'Unisex Small',
			'Unisex Medium',
			'Unisex Large',
			'Unisex X-Large',
			'Unisex XX-Large',
			'Women\'s Small',
			'Women\'s Medium',
			'Women\'s Large',
			'Women\'s X-Large',
			'Women\'s XX-Large',
		],
		required: 'Shirt size is required'
	},
	diet: String,
	admin: { type: Boolean, default: false }
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