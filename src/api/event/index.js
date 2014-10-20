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
	registrants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	active: Boolean
});

schema.virtual('name').get(function() {
	return 'BarCamp Green Bay ' + this.date.getFullYear();
});

schema.path('registrants').validate(function(arr) {
	var unique = arr.filter(function(value, index, self) {
		return self.indexOf(value) === index;
	});
	return (arr.length === unique.length);
}, 'Duplicate user');

schema.statics.findActive = function(cb) {
	return this.findOne({ active: true }).exec(cb);
};

module.exports = function(db) {
	return db.connection.model('Event', schema);
};