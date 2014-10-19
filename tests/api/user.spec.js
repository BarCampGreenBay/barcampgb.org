var db = require('../../src/modules/db');
var User = require('../../src/api/user');

describe('User API', function() {
	
	it('should return user model', function() {
		expect(User(db).modelName).toEqual('User');
	});

	it('should contain appropriate schema', function() {
		expect(Object.keys(User(db).schema.paths)).toEqual([
			'name', 'shirtSize', 'diet', 'admin', '_id', 'email', 'hash', 'salt', 'token', 'tokenExpires', '__v'
		]);
	});

});