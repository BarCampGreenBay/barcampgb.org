var config = {
	db: {
		name: 'bcgb',
		host: 'localhost'
	},
	email: {
		user: process.env.SMTP_USER,
		password: process.env.SMTP_PASSWORD
	},
	env: {
		dev: (process.env.NODE_ENV !== 'prod'),
		prod: (process.env.NODE_ENV === 'prod')
	},
	web: {
		port: process.env.NODE_PORT || 8000,
		getUrl: function() {
			return (config.env.prod? 'http://barcampgb.org' : 'http://localhost:' + config.web.port);
		},
		sessionSecret: 'this is a secret!'
	}
};

module.exports = config;