var log = require('../modules/log');
var merge = require('merge');

module.exports = function(app, passport, db, email) {

	var User = require('../api/user')(db);
	var auth = require('../modules/auth')(passport, User);

	app.get('/', getIndex());
	app.route('/login').get(getLogin()).post(postLogin());
	app.route('/register').get(getRegister()).post(postRegister());
	app.route('/password/forgot').get(getForgot()).post(postForgot());
	app.route('/password/reset/:token').get(getReset()).post(postReset());
	app.get('/logout', getLogout());

	function getIndex () {
		return render('index.html');
	}

	function getLogin () {
		return render('login.html');
	}

	function postLogin () {
		return [
			auth('local', {
				failureFlash: true,
				failureRedirect: '/login'
			}),
			flash('success', 'Logged in!'),
			redirect('/')
		];
	}

	function getRegister () {
		return [
			redirectIfLoggedIn('/'),
			render('register.html')
		];
	}

	function postRegister () {
		return [
			function(req, res, next) {
				var user = new User(req.body);
				User.register(user, req.body.password, function(err) {
					req.tempUser = user;
					if (!err) {
						email.sendRegistrationConfirmation(user.email, { user: user });
					}
					next(err);
				});
			},
			handleError(),
			flash('success', 'Registered!'),
			loginUser(),
			redirect('/')
		];
	}

	function getForgot () {
		return [
			redirectIfLoggedIn('/'),
			render('forgot-password.html')
		];
	}

	function postForgot () {
		return [
			function(req, res, next) {
				User.forgotPassword(req.body.email)
				.then(function(user) {
					email.sendPasswordReset(user.email, { user: user });
					next();
				})
				.then(null, function(err) {
					next(err);
				});
			},
			handleError(),
			flash('success', 'Password reset link sent! Please check your email.'),
			redirect('/')
		];
	}

	function getReset () {
		return [
			redirectIfLoggedIn('/'),
			findUserByToken(),
			handleError({
				redirect: '/password/forgot'
			}),
			render('reset-password.html')
		];
	}

	function postReset () {
		return [
			findUserByToken(),
			function(req, res, next) {
				req.tempUser.resetPassword(req.body.password, function(err) {
					next(err);
				});
			},
			handleError({
				redirect: '/password/forgot'
			}),
			flash('success', 'Password reset!'),
			loginUser(),
			redirect('/')
		];
	}

	function getLogout () {
		return function(req, res) {
			req.logout();
			res.redirect('/');
		};
	}

	function render (view, context) {
		return function(req, res) {
			res.render('views/' + view, merge({
				user: req.user,
				errors: req.flash('error'),
				successes: req.flash('success')
			}, context || {}));
		};
	}

	function redirect (url) {
		return function(req, res) {
			res.redirect(url);
		};
	}

	function redirectIfLoggedIn (url) {
		return function(req, res, next) {
			if (req.user) {
				req.flash('error', 'You\'re already logged in, silly!');
				return res.redirect(url);
			}
			next();
		};
	}

	function flash (type, message) {
		return function(req, res, next) {
			req.flash(type, message);
			next();
		};
	}

	function authorized () {
		return function(req, res, next) {
			if (!req.user) {
				return next(new Error('Not authorized!'));
			}
			next();
		};
	}

	function loginUser () {
		return function(req, res, next) {
			req.login(req.tempUser, function(err) {
				next(err);
			});
		};
	}

	function findUserByToken () {
		return function(req, res, next) {
			User.getByToken(req.params.token).then(function(user) {
				if (!user) {
					return next(new Error('Invalid or expired password reset token.'));
				}
				req.tempUser = user;
				next();
			}, function(err) {
				next(err);
			});
		};
	}

	function handleError (opts) {
		opts = opts || {};
		return function(err, req, res, next) {
			if (opts.flashError !== false) {
				req.flash('error', err.message);
			}
			res.redirect(opts.redirect || req.originalUrl);
		};
	}

};