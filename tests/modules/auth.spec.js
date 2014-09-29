var auth = require('../../src/modules/auth');

describe('Auth Module', function() {
	var passport, User;
	beforeEach(function() {
		passport = jasmine.createSpyObj('passport', [
			'use', 'serializeUser', 'deserializeUser', 'authenticate'
		]);
		User = jasmine.createSpyObj('User', [
			'createStrategy', 'serializeUser', 'deserializeUser'
		]);
	});
	it('should use User strategy', function() {
		auth(passport, User);
		expect(passport.use).toHaveBeenCalled();
		expect(User.createStrategy).toHaveBeenCalled();
	});
	it('should use User serialization', function() {
		auth(passport, User);
		expect(passport.serializeUser).toHaveBeenCalled();
		expect(User.serializeUser).toHaveBeenCalled();
	});
	it('should use User deserialization', function() {
		auth(passport, User);
		expect(passport.deserializeUser).toHaveBeenCalled();
		expect(User.deserializeUser).toHaveBeenCalled();
	});
	it('should return authenticate method', function() {
		var authenticate = auth(passport, User);
		authenticate();
		expect(passport.authenticate).toHaveBeenCalled();
	});
});