var log = require('./modules/log');

exports.db = function(db) {
	var User = require('./api/user')(db);
	var testUser = new User({
		name: 'test',
		username: 'test@test.com',
		admin: true
	});
	User.register(testUser, 'test', function() {
		log.info('test user created');
	});
};