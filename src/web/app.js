var nunjucks = require('nunjucks');
var express = require('express');
var app = express();

module.exports = app;

nunjucks.configure(__dirname, {
	express: app
});

app.route('/').get(function(req, res) {
	res.render('views/index.html');
});