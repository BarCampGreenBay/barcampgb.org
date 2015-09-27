describe('App Module', function() {
	it('should export express app', function() {
		var app = require('../../src/web/app');
		expect(typeof app).toEqual('function');
	});
});
