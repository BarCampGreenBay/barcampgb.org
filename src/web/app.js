var nunjucks = require('nunjucks');
var express = require('express');
var passport = require('passport');
var app = express();
var config = require('../config');
var db = require('../modules/db');
var email = require('../modules/email')(nunjucks);
var routes = require('./routes');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var session = require('cookie-session');
var methodOverride = require('method-override');
var browserify = require('browserify-middleware');
var nunjucksDate = require('nunjucks-date');

module.exports = app;

var nunjucksEnv = nunjucks.configure(__dirname, {
	express: app
});
nunjucksDate.install(nunjucksEnv);

db.connect();
if (config.env.dev) {
	require('../bootstrap').db(db);
}

app.use(session({ secret: config.web.sessionSecret }));
app.use(methodOverride('_method'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// catch db connection errors
app.use(function(req, res, next) {
	if (db.connection.readyState !== 1 && config.env.prod) {
		return res.status(500).send('No database connection.');
	}
	next();
});

routes(app, passport, db, email);

app.use('/assets', express.static(__dirname + '/assets'));
app.use('/js/client.js', browserify(__dirname + '/assets/js/client.jsx', {
	transform: ['reactify']
}));
