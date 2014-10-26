var mongoose = require('mongoose');
var schema = mongoose.Schema({
	owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	title: String,
	description: String,
	votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

schema.path('votes').validate(function(arr) {
	var unique = arr.filter(function(value, index, self) {
		return self.indexOf(value) === index;
	});
	return (arr.length === unique.length);
}, 'Duplicate user');

schema.statics.findByEvent = function(event, cb) {
	return this.find({ '_id': { $in: event.proposals } }).exec(cb);
};

schema.methods.addVote = function(user, cb) {
	this.votes.push(user._id);
	this.save(cb);
};

schema.methods.removeVote = function(user, cb) {
	this.votes = this.votes.filter(function(userId) {
		return (userId.toString() !== user.id);
	});
	this.save(cb);
};

module.exports = function(db) {
	return db.connection.model('Proposal', schema);
};