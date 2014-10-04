var nunjucks = require('nunjucks');
var express = require('express');
var passport = require('passport');
var app = express();
var config = require('../config');
var db = require('../modules/db');
var routes = require('./routes');
var components = require('./modules/polymer_components');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var session = require('cookie-session');

module.exports = app;

nunjucks.configure(__dirname, {
	express: app
});

app.locals.components = components;

db.connect();
if (config.env.dev) {
	require('../bootstrap').db(db);
}

app.use(session({ secret: config.web.sessionSecret }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// catch db connection errors
app.use(function(req, res, next) {
	if (db.readyState !== 1 && config.env.prod) {
		return res.status(500).send('No database connection.');
	}
	next();
});

routes(app, passport, db);

app.use('/vendor', express.static(__dirname + '/../../bower_components'));
app.use('/assets', express.static(__dirname + '/assets'));