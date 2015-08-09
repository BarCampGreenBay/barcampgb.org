var log = require('../modules/log');
var merge = require('merge');

module.exports = function(app, passport, db, email) {

	var Event = require('../api/event')(db);
	var User = require('../api/user')(db);
	var Proposal = require('../api/proposal')(db);
	var auth = require('../modules/auth')(passport, User);

	app.get('/', getIndex());
	app.route('/login').get(getLogin()).post(postLogin());
	app.route('/register').get(getRegister()).post(postRegister());
	app.route('/password/forgot').get(getForgot()).post(postForgot());
	app.route('/password/reset/:token').get(getReset()).post(postReset());
	app.get('/logout', getLogout());

	app.get('/proposals', getProposals());
	app.route('/proposal').get(getProposal({ isNew: true })).post(postProposal());
	app.route('/proposal/:id').get(getProposal()).put(putProposal()).delete(deleteProposal());
	app.post('/proposal/:id/vote', postProposalVote());

	function getIndex () {
		return [
			findActiveEvent(),
			render('index.html')
		];
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
			findActiveEvent(),
			render('register.html')
		];
	}

	function postRegister () {
		return [
			function createNewUser (req, res, next) {
				if (req.body.existingUser === 'yes') {
					return next();
				}
				var user = new User(req.body);
				User.register(user, req.body.password, function(err) {
					req.tempUser = user;
					if (!err) {
						email.sendRegistrationConfirmation(user.email, { user: user });
					}
					next(err);
				});
			},
			loginUser(),
			function registerUser (req, res, next) {
				if (!req.body.event) {
					return next(new Error('No event specified!'));
				}
				Event.findById(req.body.event, function(err, event) {
					if (err) {
						return next(err);
					}
					event.registrants.push(req.user._id);
					event.save(next);
				});
			},
			flash('success', 'Registered!'),
			redirect('/'),
			handleError()
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

	function getProposals () {
		return [
			findActiveEvent(),
			function(req, res, next) {
				Proposal.findByEvent(req.event).then(function(proposals) {
					res.locals.proposals = proposals;
					next();
				});
			},
			render('proposals.html')
		];
	}

	function getProposal (opts) {
		opts = opts || {};
		var actions = [
			findProposal(),
			handleError({
				redirect: '/proposals'
			}),
			render('proposal.html')
		];
		if (opts.isNew) {
			actions.splice(0, 2);
		}
		return actions;
	}

	function postProposal () {
		return [
			findActiveEvent(),
			function(req, res, next) {
				var proposal = new Proposal({
					owner: req.user._id,
					title: req.body.title,
					description: req.body.description
				});
				req.event.addProposal(proposal, function(err) {
					next(err);
				});
			},
			flash('success', 'Created!'),
			redirect('/proposals')
		];
	}

	function putProposal () {
		return [
			findProposal(),
			userCanEditProposal(),
			function updateProposal (req, res, next) {
				req.proposal.title = req.body.title;
				req.proposal.description = req.body.description;
				req.proposal.save(function(err) {
					next(err);
				});
			},
			flash('Updated!'),
			redirect('/proposals')
		];
	}

	function deleteProposal () {
		return [
			findActiveEvent(),
			findProposal(),
			userCanEditProposal(),
			function removeProposal (req, res, next) {
				req.event.removeProposal(req.proposal, function(err) {
					next(err);
				});
			},
			flash('success', 'Deleted!'),
			redirect('/proposals')
		];
	}

	function postProposalVote () {
		return [
			findProposal(),
			function changeProposalVote (req, res, next) {
				if (req.body.vote === 'add') {
					req.proposal.addVote(req.user, next);
				}
				else {
					req.proposal.removeVote(req.user, next);
				}
			},
			redirect(function(req) {
				return '/proposal/' + req.proposal.id;
			})
		];
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
			if (typeof url === 'function') {
				url = url(req, res);
			}
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
				res.status(403);
				return next(new Error('Not authorized!'));
			}
			next();
		};
	}

	function findProposal () {
		return function(req, res, next) {
			Proposal.findById(req.params.id, function(err, proposal) {
				if (proposal) {
					req.proposal = proposal;
					res.locals.proposal = proposal;
				}
				else {
					err = new Error('No proposal found!');
				}
				next(err);
			});
		};
	}

	function userCanEditProposal () {
		return function(req, res, next) {
			if (req.user && req.user.canEditProposal(req.proposal)) {
				next();
			}
			else {
				res.status(403);
				next(new Error('No can do.'));
			}
		};
	}

	function findActiveEvent () {
		return function(req, res, next) {
			Event.findActive().then(function(activeEvent) {
				req.event = activeEvent;
				res.locals.event = activeEvent;
				res.locals.shirtSizes = User.schema.path('shirtSize').enumValues
				next();
			}, next);
		};
	}

	function loginUser () {
		return function(req, res, next) {
			if (!req.tempUser) {
				return next();
			}
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
			var message = err.message;
			var field;
			if (err.errors) {
				message = err.toString();
			}
			if (opts.flashError !== false) {
				req.flash('error', message);
			}
			log.error(err);
			res.redirect(opts.redirect || req.originalUrl);
		};
	}

};
