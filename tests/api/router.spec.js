describe('router.js', function() {
	var app, controller;
	var router = require('../../src/api/router.js');
	function getRoute (app) {
		return app.use.mostRecentCall.args[1];
	}
	beforeEach(function() {
		app = {
			use: jasmine.createSpy('use')
		};
		controller = {
			root: '/root',
			route: '/route'
		};
	});
	it('should attach to controller.root', function() {
		router.attachRoutes([controller], app);
		expect(app.use.mostRecentCall.args[0]).toEqual(controller.root);
	});
	it('should add single middleware', function() {
		controller.before = function() {};
		router.attachRoutes([controller], app);
		expect(getRoute(app).stack.length).toBe(1);
	});
	it('should add multiple middleware', function() {
		controller.before = [function() {}, function() {}];
		router.attachRoutes([controller], app);
		expect(getRoute(app).stack.length).toBe(2);
	});
	it('should add middleware that responds to route', function() {
		controller.before = function() {};
		router.attachRoutes([controller], app);
		expect(getRoute(app).stack[0].regexp).toMatch(/\/route\\/);
	});
	it('should add controller.get', function() {
		controller.get = function() {};
		router.attachRoutes([controller], app);
		expect(getRoute(app).stack[0].route.methods.get).toBe(true);
	});
	it('should add controller.put', function() {
		controller.put = function() {};
		router.attachRoutes([controller], app);
		expect(getRoute(app).stack[0].route.methods.put).toBe(true);
	});
	it('should add controller.post', function() {
		controller.post = function() {};
		router.attachRoutes([controller], app);
		expect(getRoute(app).stack[0].route.methods.post).toBe(true);
	});
	it('should add controller.delete', function() {
		controller.delete = function() {};
		router.attachRoutes([controller], app);
		expect(getRoute(app).stack[0].route.methods.delete).toBe(true);
	});
	it('should add custom routes', function() {
		controller.getAThing = function() {};
		router.attachRoutes([controller], app);
		expect(getRoute(app).stack[0].route.methods.get).toBe(true);
		expect(getRoute(app).stack[0].route.path).toEqual('/route/athing');
	});
});