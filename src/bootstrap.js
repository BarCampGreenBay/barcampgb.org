exports.db = function(db) {
	var User = require('./api/user')(db);
	var testUser = new User({
		name: 'test',
		username: 'test@test.com',
		admin: true
	});
	User.register(testUser, 'test', function() {
		console.log('test user created');
	});
};