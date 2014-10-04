var log = require('./modules/log');

exports.db = function(db) {
	var User = require('./api/user')(db);
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
};