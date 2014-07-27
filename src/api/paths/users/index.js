var User = require('./model');

module.exports = function() {

	this.root = '/users';
	this.route = '/:user_id';

	this.before = [
		function getUser (req, res, next) {
			User.findById(req.params.user_id, function(err, user) {
				if (err) {
					return next();
				}

				req.user = user;
				next();
			});
		}
	];

	this.get = function(req, res, next) {
		if (!req.user) {
			res.status(404);
			res.json({
				error: 'User ' + req.params.user_id + ' not found.'
			});
			return;
		}
		res.json(req.user);
	};

};