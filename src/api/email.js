var nodemailer = require('nodemailer');
var smtpUser = process.env.SMTP_USER;
var smtpPassword = process.env.SMTP_PASSWORD;
var transport;

if (!smtpUser || !smtpPassword) {
	console.error('Email error: no username or password.');
}

transport = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
        user: smtpUser,
        pass: smtpPassword
    }
});

module.exports = transport;