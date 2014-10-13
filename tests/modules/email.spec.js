var proxyquire = require('proxyquire');
var nunjucksSpy = jasmine.createSpyObj('nunjucks', ['render']);
var nodemailerSpy = jasmine.createSpyObj('nodemailer', ['createTransport']);
var email = proxyquire('../../src/modules/email', {
	'../config': {
		email: {
			user: 'user',
			password: 'password'
		},
		web: {
			getUrl: function() {
				return 'url';
			}
		}
	},
	nodemailer: nodemailerSpy
});
var sendMailSpy;
var mailer;

describe('Email module', function() {
	beforeEach(function() {
		sendMailSpy = jasmine.createSpy('sendMail');
		nodemailerSpy.createTransport.andReturn({
			sendMail: sendMailSpy
		});
		mailer = email(nunjucksSpy);
	});
	it('should create a nodemailer transport', function() {
		expect(nodemailerSpy.createTransport).toHaveBeenCalledWith({
			service: 'Mailgun',
			auth: {
				user: 'user',
				pass: 'password'
			}
		});
	});
	it('should send registration confirmation', function() {
		var user = {};
		nunjucksSpy.render.andReturn('message');
		mailer.sendRegistrationConfirmation('to', { user: user }, 'cb');
		expect(nunjucksSpy.render).toHaveBeenCalledWith('emails/registration-confirmation.txt', { user: user });
		expect(sendMailSpy).toHaveBeenCalledWith({
			to: 'to',
			subject: 'BarCamp Green Bay: Registration Confirmation',
			message: 'message',
			from: 'BarCamp Green Bay <info@barcampgb.org>'
		}, 'cb');
	});
	it('should send password reset email', function() {
		var user = { token: '1234' };
		nunjucksSpy.render.andReturn('message');
		mailer.sendPasswordReset('to', { user: user }, 'cb');
		expect(nunjucksSpy.render).toHaveBeenCalledWith('emails/password-reset.txt', { user: user, url: 'url/password/reset/1234' });
		expect(sendMailSpy).toHaveBeenCalledWith({
			to: 'to',
			subject: 'BarCamp Green Bay: Password Reset',
			message: 'message',
			from: 'BarCamp Green Bay <info@barcampgb.org>'
		}, 'cb');
	});
});