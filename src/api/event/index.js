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
	donateUrl: String,
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
	return this.find({ active: true }).limit(1).sort({ date: -1 }).exec(cb).then(function(results) {
		return results[0];
	});
};

schema.statics.findByYear = function(year, cb) {
	var start = new Date(year, 0, 1);
	var end = new Date(year, 11, 32);
	var query = this.findOne({ date: { $gte: start, $lt: end } });
	if (cb) {
		return query.exec(cb);
	}
	return query;
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
