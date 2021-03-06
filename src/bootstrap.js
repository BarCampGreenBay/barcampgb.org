var db = require('./modules/db');
var totalActions = 5;
var loggedActions = 0;
function logAction() {
	loggedActions++;
	if (loggedActions === totalActions) {
		process.exit(0);
	}
}

db.connect();
db.connection.on('open', function () {
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
			console.log('Test user created: %s/%s', testUser.email, password);
		}
		logAction();
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
			console.log('Test user created: %s/%s', testUser2.email, password);
		}
		logAction();
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
			console.log('Test event created.');
		}
		logAction();
	});
	activeEvent.addProposal(new Proposal({
		owner: testUser._id,
		title: 'Proposal title',
		description: 'Proposal description'
	}), function() {
		console.log('Test proposal created.');
		logAction();
	});
	activeEvent.addProposal(new Proposal({
		owner: testUser2._id,
		title: 'Bacon ipsum dolor amet shankle spare ribs ribeye',
		description: 'Bacon ipsum dolor amet shankle spare ribs ribeye, short ribs prosciutto venison hamburger pork chop brisket kielbasa short loin sirloin beef andouille capicola. Salami cow boudin tail chuck brisket. Shoulder doner strip steak spare ribs. Venison pork chop cupim, picanha leberkas kevin chicken turducken meatloaf jowl ham pastrami ribeye pork belly. Strip steak salami ball tip hamburger porchetta swine, turkey tri-tip tenderloin pork chop ribeye pig tail ham flank. Shankle biltong capicola jowl tri-tip.'
	}), function() {
		console.log('Test proposal created.');
		logAction();
	});
});
