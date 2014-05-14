var siteApp = angular.module('siteApp', [ 'ngRoute', 'ngDragDrop',
		'restangular', 'siteControllers' ]);

siteApp.config([ '$routeProvider', 'RestangularProvider',
		function($routeProvider, RestangularProvider) {
			RestangularProvider.setBaseUrl('/api');
			RestangularProvider.setDefaultRequestParams('common', {
				v : 'v1'
			});
			var pages = [ {
				'name' : 'Home',
				'pathURL' : '/home',
				'layoutURL' : '/common/layout/2-col.html'
			}, {
				'name' : 'Products',
				'pathURL' : '/products',
				'layoutURL' : '/common/layout/2-col.html',
				'pages' : [ {
					'name' : 'AnMob',
					'url' : '/products/anmob',
					'layoutURL' : '/common/layout/2-col.html'
				} ]
			}, {
				'name' : 'About Us',
				'pathURL' : '/aboutUs',
				'layoutURL' : '/common/layout/2-col.html'
			} ];

			$routeProvider.when('/:page', {
				template : '<div ng-include="templateUrl">Loading...</div>',
				controller : 'NavigationCtrl'
			});
			// $routeProvider.otherwise({
			// redirectTo : pages[0].pathURL
			// });
		} ]);