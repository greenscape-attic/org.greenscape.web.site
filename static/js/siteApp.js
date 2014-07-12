var siteApp = angular.module('siteApp', [ 'ngRoute', 'ngDragDrop',
		'ngSanitize', 'restangular', 'siteControllers', 'urish.load' ]);

siteApp.config([ '$routeProvider', '$controllerProvider',
		'RestangularProvider',
		function($routeProvider, $controllerProvider, RestangularProvider) {
			siteApp.registerCtrl = $controllerProvider.register;
			RestangularProvider.setBaseUrl('/api');
			RestangularProvider.setDefaultRequestParams('common', {
				v : 'v1'
			});

			$routeProvider.when('/:page', {
				template : '<div ng-include="templateUrl">Loading...</div>',
				controller : 'PageCtrl'
			});

			// $routeProvider.otherwise({
			// redirectTo : pages[0].pathURL
			//			});
		} ]);