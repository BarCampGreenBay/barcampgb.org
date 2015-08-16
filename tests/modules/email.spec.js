var proxyquire = require('proxyquire');
var nunjucksSpy = jasmine.createSpyObj('nunjucks', ['render']);
var nodemailerSpy = jasmine.createSpyObj('nodemailer', ['createTransport']);
var mailgunSpy = jasmine.createSpy('mailgun').and.returnValue('mailgun');
var email = proxyquire('../../src/modules/email', {
	'../config': {
		email: {
			apiKey: 'apiKey',
			domain: 'domain'
		},
		web: {
			getUrl: function() {
				return 'url';
			}
		}
	},
	nodemailer: nodemailerSpy,
	'nodemailer-mailgun-transport': mailgunSpy
});
var sendMailSpy;
var mailer;

describe('Email module', function() {
	beforeEach(function() {
		sendMailSpy = jasmine.createSpy('sendMail');
		nodemailerSpy.createTransport.and.returnValue({
			sendMail: sendMailSpy
		});
		mailer = email(nunjucksSpy);
	});
	it('should configure mailgun transport', function () {
		expect(mailgunSpy);
	});
	it('should create a nodemailer transport', function() {
		expect(nodemailerSpy.createTransport).toHaveBeenCalledWith('mailgun');
	});
	it('should send registration confirmation', function() {
		var user = {};
		nunjucksSpy.render.and.returnValue('message');
		mailer.sendRegistrationConfirmation('to', { user: user }, 'cb');
		expect(nunjucksSpy.render).toHaveBeenCalledWith('emails/registration-confirmation.txt', { user: user });
		expect(sendMailSpy).toHaveBeenCalledWith({
			to: 'to',
			subject: 'BarCamp Green Bay: Registration Confirmation',
			text: 'message',
			from: 'BarCamp Green Bay <info@barcampgb.org>'
		}, 'cb');
	});
	it('should send password reset email', function() {
		var user = { token: '1234' };
		nunjucksSpy.render.and.returnValue('message');
		mailer.sendPasswordReset('to', { user: user }, 'cb');
		expect(nunjucksSpy.render).toHaveBeenCalledWith('emails/password-reset.txt', { user: user, url: 'url/password/reset/1234' });
		expect(sendMailSpy).toHaveBeenCalledWith({
			to: 'to',
			subject: 'BarCamp Green Bay: Password Reset',
			text: 'message',
			from: 'BarCamp Green Bay <info@barcampgb.org>'
		}, 'cb');
	});
});
