var proxyquire = require('proxyquire');
var expressSpy, appSpy, nunjucksSpy, dbSpy, sessionSpy, bodyParserSpy, passportSpy, flashSpy, routesSpy;
var init = function (proxies) {
	appSpy = jasmine.createSpyObj('app', ['use', 'locals']);
	expressSpy = jasmine.createSpy('express').andReturn(appSpy);
	expressSpy.static = jasmine.createSpy('static').andReturn('static');
	nunjucksSpy = jasmine.createSpyObj('nunjucks', ['configure']);
	dbSpy = jasmine.createSpyObj('db', ['connect']);
	emailSpy = jasmine.createSpyObj('email', ['sendPasswordReset']);
	sessionSpy = jasmine.createSpy('session').andReturn('session');
	bodyParserSpy = {
		urlencoded: jasmine.createSpy('urlencoded').andReturn('urlencoded'),
		json: jasmine.createSpy('json').andReturn('json')
	};
	passportSpy = {
		initialize: jasmine.createSpy('initialize').andReturn('passport init'),
		session: jasmine.createSpy('session').andReturn('passport session')
	};
	flashSpy = jasmine.createSpy('flash').andReturn('flash');
	routesSpy = jasmine.createSpy('routes');
	return proxyquire('../../src/web/app', {
		express: expressSpy,
		nunjucks: nunjucksSpy,
		'../modules/db': dbSpy,
		'../modules/email': function() {
			return emailSpy;
		},
		'cookie-session': sessionSpy,
		'./routes': routesSpy,
		'body-parser': bodyParserSpy,
		'../config': {
			env: {
				dev: false,
				prod: true
			}
		},
		passport: passportSpy,
		'connect-flash': flashSpy
	});
};

describe('App Module', function() {
	it('should export express app', function() {
		var app = init();
		expect(app).toEqual(appSpy);
	});
	it('should configure nunjucks', function() {
		init();
		expect(nunjucksSpy.configure).toHaveBeenCalledWith(jasmine.any(String), { express: appSpy });
	});
	it('should connect to db', function() {
		init();
		expect(dbSpy.connect).toHaveBeenCalled();
	});
	it('should set up cookie session', function() {
		init();
		expect(sessionSpy).toHaveBeenCalledWith({ secret: 'this is a secret!' });
		expect(appSpy.use).toHaveBeenCalledWith('session');
	});
	it('should configure body bodyparser', function() {
		init();
		expect(bodyParserSpy.urlencoded).toHaveBeenCalledWith({extended: false});
		expect(appSpy.use).toHaveBeenCalledWith('urlencoded');
		expect(bodyParserSpy.json).toHaveBeenCalled();
		expect(appSpy.use).toHaveBeenCalledWith('json');
	});
	it('should configure passport', function() {
		init();
		expect(passportSpy.initialize).toHaveBeenCalled();
		expect(appSpy.use).toHaveBeenCalledWith('passport init');
		expect(passportSpy.session).toHaveBeenCalled();
		expect(appSpy.use).toHaveBeenCalledWith('passport session');
	});
	it('should use flash', function() {
		init();
		expect(flashSpy).toHaveBeenCalled();
		expect(appSpy.use).toHaveBeenCalledWith('flash');
	});
	it('should set up routes', function() {
		init();
		expect(routesSpy).toHaveBeenCalledWith(appSpy, passportSpy, dbSpy, emailSpy);
	});
	it('should set up static directories', function() {
		init();
		expect(expressSpy.static).toHaveBeenCalledWith(jasmine.any(String));
		expect(appSpy.use).toHaveBeenCalledWith('/vendor', 'static');
		expect(appSpy.use).toHaveBeenCalledWith('/assets', 'static');
	});
});