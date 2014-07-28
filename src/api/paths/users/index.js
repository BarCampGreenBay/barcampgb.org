var User = require('./model');
var email = require('../../email.js');

module.exports = function() {

	this.root = '/users';
	this.route = '/:user_id';

	this.before = [
		findUser
	];

	this.get = function(req, res, next) {
		res.json(req.user);
	};

	this.getResetPassword = function(req, res, next) {
		email.sendMail({
			from: 'info@barcampgb.org',
			to: 'chrisjaure@gmail.com',
			subject: 'test',
			text: 'will it blend?'
		}, function(err) {
			if (err) {
				console.error(err);
				res.status(500);
				return res.json({
					error: 'Password reset email not sent.'
				});
			}

			res.json({
				success: 'Password reset email sent.'
			});
		});
	};

	function findUser (req, res, next) {
		if (req.params.user_id) {
			User.findById(req.params.user_id, function(err, user) {
				if (err) {
					res.status(404);
					return res.json({
						error: 'User ' + req.params.user_id + ' not found.'
					});
				}

				req.user = user;
				next();
			});
		}
		else {
			next();
		}
	}

};