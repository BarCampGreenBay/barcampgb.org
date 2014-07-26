var fs = require('fs');
var express = require('express');
function createRouterFromController (controller) {
	var router = express.Router();
	var route = router.route('/' + (controller.params? controller.params : ''));
	var middleware = controller.before;
	if (middleware) {
		if (!Array.isArray(middleware)) {
			middleware = [middleware];
		}
		middleware.forEach(function(fn) {
			router.use(fn);
		});
	}
	['get', 'put', 'delete', 'post'].forEach(function(verb) {
		if (controller[verb]) {
			route[verb](controller[verb]);
		}
	});
	return router;
}
exports.attachPaths = function(app) {
	fs.readdirSync(__dirname + '/paths').forEach(function(dir) {
		var controller = require('./paths/' + dir);
		app.use('/' + dir, createRouterFromController(new controller()));
	});
};