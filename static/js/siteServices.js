var siteServices = angular.module('siteServices', [ 'ngResource' ]);

siteServices.factory('Site', [ '$resource', function($resource) {
	return $resource('/api/site/:id');
} ]);