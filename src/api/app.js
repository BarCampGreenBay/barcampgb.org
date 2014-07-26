var express = require('express');
var app = express();
var db = require('./db');
var router = require('./router');

// return error if db not connected
app.use(function(req, res, next) {
	if (db.readyState !== 1 && app.get('env') !== 'development') {
		return res.status(500).json({
			error: 'No database connection.'
		});
	}
	next();
});

router.attachPaths(app);

module.exports = app;