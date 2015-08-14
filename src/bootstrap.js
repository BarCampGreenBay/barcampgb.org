var log = require('./modules/log');

exports.db = function(db) {
	var User = require('./api/user')(db);
	var Event = require('./api/event')(db);
	var Proposal = require('./api/proposal')(db);
	var password = 'test';
	var testUser = new User({
		name: 'test',
		email: 'test@test.com',
		shirtSize: 'Unisex Medium',
		diet: 'None',
		admin: true
	});
	User.register(testUser, password, function(err) {
		if (!err) {
			log.info('Test user created: %s/%s', testUser.email, password);
		}
	});
	var testUser2 = new User({
		name: 'test',
		email: 'test2@test.com',
		shirtSize: 'Women\'s Medium',
		diet: 'Vegetarian',
		admin: false
	});
	User.register(testUser2, password, function(err) {
		if (!err) {
			log.info('Test user created: %s/%s', testUser2.email, password);
		}
	});
	var activeEvent = new Event({
		date: Date.now() + 1000 * 60 * 60 * 24,
		location: {
			name: 'Location',
			address: '123 Street',
			city: 'Green Bay',
			state: 'WI',
			url: 'http://maps.google.com'
		},
		sponsors: [{
			name: 'Test Sponsor',
			logoUrl: 'http://placehold.it/150x100',
			url: 'http://google.com'
		}],
		donateUrl: 'http://payit2.com',
		registrants: [testUser._id],
		active: true
	});
	activeEvent.save(function(err) {
		if (!err) {
			log.info('Test event created.');
		}
	});
	activeEvent.addProposal(new Proposal({
		owner: testUser._id,
		title: 'Proposal title',
		description: 'Proposal description'
	}), function() {
		log.info('Test proposal created.');
	});
	activeEvent.addProposal(new Proposal({
		owner: testUser2._id,
		title: 'Proposal title 2',
		description: 'Proposal description 2'
	}), function() {
		log.info('Test proposal created.');
	});
};
