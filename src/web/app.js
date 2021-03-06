var fs = require('fs');
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
var nunjucksDate = require('nunjucks-date');
var favicon = require('serve-favicon');
var error404 = fs.readFileSync(__dirname + '/assets/404.html');
var error500 = fs.readFileSync(__dirname + '/assets/500.html');

module.exports = app;

var nunjucksEnv = nunjucks.configure(__dirname, {
	express: app
});
nunjucksDate.install(nunjucksEnv);

db.connect();

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
		return res.status(500).end(error500);
	}
	next();
});

routes(app, passport, db, email);

app.use(favicon(__dirname + '/assets/favicon.ico'));
app.use('/assets', express.static(__dirname + '/assets'));

app.use(function(req, res) {
	res.status(404).end(error404);
});
