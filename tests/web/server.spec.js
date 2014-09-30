var proxyquire = require('proxyquire').noCallThru();
var http = require('http');

describe('Server module', function() {
	it('should start a server', function() {
		var listenSpy = jasmine.createSpy('listen');
		spyOn(http, 'createServer').andReturn({
			listen: listenSpy,
			address: function() {
				return {};
			}
		});
		process.env.NODE_PORT = 'port';
		proxyquire('../../src/web/server', {
			http: http,
			'./app': 'app',
			'../config': { web: { port: 'port' } }
		});
		expect(http.createServer).toHaveBeenCalledWith('app');
		expect(listenSpy).toHaveBeenCalledWith('port', jasmine.any(Function));
	});
});