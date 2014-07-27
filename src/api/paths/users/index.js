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
			return res.status(404).json({
				error: 'User ' + req.params.user_id + ' not found.'
			});
		}
		res.json(req.user);
	};

};