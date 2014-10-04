var nodemailer = require('nodemailer');
var log = require('./log');
var config = require('../config');

module.exports = function(nunjucks) {
	var shouldSend = true;
	var transport;

	if (!config.email.user || !config.email.password) {
		log.error('Email: no username or password.');
		shouldSend = false;
	}

	transport = nodemailer.createTransport({
	    service: 'Mailgun',
	    auth: {
	        user: config.email.user,
	        pass: config.email.password
	    }
	});

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
			subject: 'BarCamp Green Bay password reset',
			message: nunjucks.render('emails/password-reset.txt', templateLocals)
		}, cb);
	}

	return {
		sendPasswordReset: sendPasswordReset
	};

};