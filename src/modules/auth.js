module.exports = function(passport, User) {
	passport.use(User.createStrategy());
	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());

	return passport.authenticate.bind(passport);
};