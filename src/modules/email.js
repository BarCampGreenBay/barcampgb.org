var nodemailer = require('nodemailer');
var mailgun = require('nodemailer-mailgun-transport');
var log = require('./log');
var config = require('../config');

module.exports = function(nunjucks) {
	var shouldSend = true;
	var transport;

	if (!config.email.apiKey || !config.email.domain) {
		log.error('Email: no api key or domain.');
		shouldSend = false;
	}

	transport = nodemailer.createTransport(mailgun({
		auth: {
			api_key: config.email.apiKey,
			domain: config.email.domain
		}
	}));

	function send (opts, cb) {
		if (!opts.from) {
			opts.from = 'BarCamp Green Bay <info@barcampgb.org>';
		}
		if (shouldSend) {
			transport.sendMail(opts, cb);
		}
		else {
			log.warn('Email not sent!', opts);
		}
	}

	function sendPasswordReset (to, templateLocals, cb) {
		templateLocals.url = config.web.getUrl() + '/password/reset/' + templateLocals.user.token;
		send({
			to: to,
			subject: 'BarCamp Green Bay: Password Reset',
			text: nunjucks.render('emails/password-reset.txt', templateLocals)
		}, cb);
	}

	function sendRegistrationConfirmation (to, templateLocals, cb) {
		send({
			to: to,
			subject: 'BarCamp Green Bay: Registration Confirmation',
			text: nunjucks.render('emails/registration-confirmation.txt', templateLocals)
		}, cb);
	}

	return {
		sendPasswordReset: sendPasswordReset,
		sendRegistrationConfirmation: sendRegistrationConfirmation
	};

};
