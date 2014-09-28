module.exports = function(app, passport, db) {

	var User = require('../api/user')(db);
	var auth = require('../modules/auth')(passport, User);

	app.get('/', render('views/index.html'));
	app.route('/login')
		.get(
			ifAuthorized(redirect('/')),
			render('views/login.html')
		)
		.post(auth('local', {
			failureFlash: true,
			failureRedirect: '/login'
		}), redirect('/'));
	app.get('/logout', logout());

	function render (view) {
		return function(req, res) {
			res.render(view, { user: req.user, errors: req.flash('error') });
		};
	}

	function redirect (url) {
		return function(req, res) {
			res.redirect(url);
		};
	}

	function logout () {
		return function(req, res) {
			req.logout();
			res.redirect('/');
		};
	}

	function ifAuthorized (fn) {
		return function(req, res, next) {
			if (req.user) {
				return fn(req, res);
			}
			next();
		};
	}

};