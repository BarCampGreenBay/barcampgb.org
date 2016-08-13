var fs = require('fs');
var supertest = require('supertest');
var app = require('../../src/web/app');

describe('App Module', function() {
	it('should export express app', function() {
		expect(typeof app).toEqual('function');
	});

	it('should serve static content', function (done) {
		supertest(app)
			.get('/assets/site.css')
			.expect(200, done);
	});
	it('should serve favicon', function (done) {
		supertest(app)
			.get('/favicon.ico')
			.expect(200, done);
	});
	it('should show 404 page', function (done) {
		var file = fs.readFileSync(__dirname + '/../../src/web/assets/404.html', 'utf-8');
		supertest(app)
			.get('/pathThatWill404')
			.expect(404, file, done);
	});
});
