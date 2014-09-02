var express = require('express');
function createRouterFromController (controller) {
	var router = express.Router();
	var middleware = controller.before;
	var actions = Object.keys(controller);
	var routeRegex = new RegExp('^(get|put|delete|post)([A-Z].*)?$');

	if (middleware) {
		if (!Array.isArray(middleware)) {
			middleware = [middleware];
		}
		middleware.forEach(function(fn) {
			router.use(controller.route, fn);
		});
	}

	actions.forEach(function(action) {
		var verb, route, match;
		match = routeRegex.exec(action);
		route = controller.route;
		if (match) {
			verb = match[1];
			if (match[2]) {
				route += '/' + match[2].toLowerCase();
			}
			router[verb](route, controller[action]);
		}
	});

	return router;
}
exports.attachRoutes = function(controllers, app) {
	controllers.forEach(function(controller) {
		app.use(controller.root, createRouterFromController(controller));
	});
};