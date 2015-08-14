var mongoose = require('mongoose');
var schema = mongoose.Schema({
	date: Date,
	location: {
		name: String,
		address: String,
		city: String,
		state: String,
		url: String
	},
	sponsors: [{
		name: String,
		logoUrl: String,
		url: String
	}],
	registrants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	proposals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Proposal' }],
	active: Boolean
});

schema.virtual('name').get(function() {
	return 'BarCamp Green Bay ' + this.date.getFullYear();
});

schema.virtual('registrationOpen').get(function() {
	return (this.date.getTime() > Date.now());
});

schema.path('registrants').validate(function(arr) {
	var unique = arr.filter(function(value, index, self) {
		return self.indexOf(value) === index;
	});
	return (arr.length === unique.length);
}, 'Duplicate user');

schema.statics.findActive = function(cb) {
	return this.findOne({ active: true }).sort({ date: -1 }).exec(cb);
};

schema.methods.addProposal = function(proposal, cb) {
	this.proposals.push(proposal.id);
	proposal.save(function(err) {
		if (err) {
			return cb(err);
		}
		this.save(cb);
	}.bind(this));
};

schema.methods.removeProposal = function(proposal, cb) {
	this.proposals = this.proposals.filter(function(proposalId) {
		return (proposalId.toString() !== proposal.id);
	});
	this.save(function(err) {
		if (err) {
			return cb(err);
		}
		proposal.remove(cb);
	});
};

module.exports = function(db) {
	return db.connection.model('Event', schema);
};
