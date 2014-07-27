var express = require('express');
function createRouterFromController (controller) {
	var router = express.Router();
	var route = router.route(controller.route);
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
exports.attachRoutes = function(controllers, app) {
	controllers.forEach(function(controller) {
		app.use(controller.root, createRouterFromController(controller));
	});
};