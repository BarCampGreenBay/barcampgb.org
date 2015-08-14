var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var mongooseToken = require('mongoose-token');
var messages = {
	nameError: 'Please tell us your name',
	emailError: 'Please tell us your %s',
	passwordError: 'Please set a password',
	shirtSizeError: 'Please tell us your shirt size so we can get you a shirt',
	noUser: 'User not found'
};
var schema = mongoose.Schema({
	name: { type: String, required: messages.nameError },
	shirtSize: {
		type: String,
		enum: {
			values: [
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
			message: messages.shirtSizeError
		},
		required: messages.shirtSizeError
	},
	diet: String,
	admin: { type: Boolean, default: false }
});

// passport-local-mongoose will augment user with extra fields and functions
schema.plugin(passportLocalMongoose, {
	usernameField: 'email',
	missingUsernameError: messages.emailError,
	missingPasswordError: messages.passwordError
});

// add password reset token functionality
schema.plugin(mongooseToken);

schema.statics.forgotPassword = function(email) {
	return this.findByUsername(email).exec()
		.then(function(user) {
			if (!user) {
				throw new Error(messages.noUser);
			}
			return user.setToken();
		});
};

schema.methods.resetPassword = function(password, cb) {
	var user = this;
	user.setPassword(password, function(err) {
		if (err) {
			return cb(err);
		}
		user.resetToken(cb);
	});
};

schema.methods.canEditProposal = function(proposal) {
	return (proposal.owner.toString() === this.id);
};

schema.methods.hasVotedForProposal = function(proposal) {
	return proposal.votes.some(function(userId) {
		return (userId.toString() === this.id);
	}.bind(this));
};

schema.methods.isRegisteredForEvent = function(event) {
	return event.registrants.some(function(userId) {
		return (userId.toString() === this.id);
	}.bind(this));
}

schema.methods.canRegisterForEvent = function(event) {
	return (event && event.registrationOpen && !this.isRegisteredForEvent(event));
}

module.exports = function(db) {
	return db.connection.model('User', schema);
};
