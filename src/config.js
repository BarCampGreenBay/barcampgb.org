var config = {
	db: {
		name: 'bcgb',
		host: process.env.MONGOD_HOST || 'localhost',
		port: process.env.MONGOD_PORT || 27017
	},
	email: {
		user: process.env.SMTP_USER,
		password: process.env.SMTP_PASSWORD
	},
	env: {
		dev: (process.env.NODE_ENV !== 'production'),
		prod: (process.env.NODE_ENV === 'production')
	},
	web: {
		port: process.env.NODE_PORT || process.env.PORT || 8000,
		getUrl: function() {
			return (config.env.prod? 'http://barcampgb.org' : 'http://localhost:' + config.web.port);
		},
		sessionSecret: 'this is a secret!'
	}
};

module.exports = config;
