var nodemailer = require('nodemailer');
var log = require('./log');
var config = require('../config').email;
var transport;

if (!config.user || !config.password) {
	log.error('Email error: no username or password.');
}

transport = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
        user: config.user,
        pass: config.password
    }
});

module.exports = transport;