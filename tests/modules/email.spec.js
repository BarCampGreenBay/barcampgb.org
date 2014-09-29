var proxyquire = require('proxyquire');
var email = proxyquire('../../src/modules/email', {
	'../config': {
		email: {
			user: 'user',
			password: 'password'
		}
	}
});

describe('Email module', function() {
	it('should export a Mailgun transport', function() {
		expect(email.transporter.options.service).toEqual('Mailgun');
	});
	it('should use username and password from config', function() {
		expect(email.transporter.options.auth).toEqual({
			user: 'user',
			pass: 'password'
		});
	});
});