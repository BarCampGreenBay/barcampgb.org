var nunjucks = require('nunjucks');
var express = require('express');
var app = express();

module.exports = app;

nunjucks.configure(__dirname, {
	express: app
});

app.locals.vendor_components = require('./modules/vendor_components');

app.route('/').get(function(req, res) {
	res.render('views/index.html');
});

app.use('/vendor', express.static(__dirname + '/../../bower_components'));