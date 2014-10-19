var log = require('./modules/log');

exports.db = function(db) {
	var User = require('./api/user')(db);
	var Event = require('./api/event')(db);
	var email = 'test@test.com';
	var password = 'test';
	var testUser = new User({
		name: 'test',
		email: email,
		admin: true
	});
	User.register(testUser, password, function(err) {
		if (!err) {
			log.info('Test user created: %s/%s', email, password);
		}
	});
	var activeEvent = new Event({
		date: Date.now(),
		location: {
			name: 'Location',
			address: '123 Street',
			city: 'Green Bay',
			state: 'WI',
			url: 'http://maps.google.com'
		},
		registrants: [testUser._id],
		active: true
	});
	activeEvent.save(function(err) {
		if (!err) {
			log.info('Test event created.');
		}
	});
};