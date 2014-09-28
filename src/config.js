module.exports = {
	db: {
		name: 'bcgb',
		host: 'localhost'
	},
	email: {
		user: process.env.SMTP_USER,
		password: process.env.SMTP_PASSWORD
	}
};