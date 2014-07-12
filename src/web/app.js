var nunjucks = require('nunjucks');
var express = require('express');
var app = express();
var components = require('./modules/polymer_components');

module.exports = app;

nunjucks.configure(__dirname, {
	express: app
});

app.locals.components = components;

app.route('/').get(function(req, res) {
	res.render('views/index.html');
});

app.use('/vendor', express.static(__dirname + '/../../bower_components'));
app.use('/assets', express.static(__dirname + '/assets'));