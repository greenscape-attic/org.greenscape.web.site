'use strict';

var siteApp = angular.module('siteApp', [ 'ngRoute', 'ngDragDrop',
		'ngSanitize', 'ngStorage', 'restangular', 'services',
		'siteControllers', 'urish.load' ]);

siteApp.config([ '$routeProvider', '$controllerProvider',
		'RestangularProvider',
		function($routeProvider, $controllerProvider, RestangularProvider) {
			siteApp.registerCtrl = $controllerProvider.register;
			siteApp.routeProvider = $routeProvider;
			RestangularProvider.setBaseUrl('/api');

			$routeProvider.when('/:page', {
				template : '<div ng-include="templateUrl">Loading...</div>',
				controller : 'PageCtrl'
			});

			// $routeProvider.otherwise({
			// redirectTo : pages[0].pathURL
			// });
		} ]);

siteApp.factory('AuthRestangular', function(Restangular) {
	return Restangular.withConfig(function(RestangularConfigurer) {
		RestangularConfigurer.setBaseUrl('/auth');
	});
});