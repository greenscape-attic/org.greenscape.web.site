var siteControllers = angular.module('siteControllers', []);

siteControllers.controller('SiteCtrl', [
		'$scope',
		'$rootScope',
		'$route',
		'$http',
		'$location',
		'$log',
		'Restangular',
		function($scope, $rootScope, $route, $http, $location, $log,
				Restangular) {
			$scope.addPage = function() {
				var page = Restangular.all('model/site/' + $scope.gSite.modelId
						+ '/page');
				page.post({
					'name' : 'New Page'
				}).then(function(page) {
					$scope.gSite.pages.push(page);
					$location.path(page.pathURL);
				});
			};
			$scope.managePage = function() {
				$('#managePage').foundation('reveal', 'open');
			};
			$scope.setControlVisible = function(isVisible) {
				cnt_show = isVisible;
			}

			$scope.gPagelets = {};
			var site = Restangular.all('model');
			site.customGET('site', {
				'name' : 'Greenscape'
			}).then(function(sites) {
				$scope.gSite = sites[0];
				$rootScope.siteName = $scope.gSite.name;
				site.customGET('page').then(function(pages) {
					$scope.gSite.pages = pages;
					$location.path(pages[0].pathURL);
				});
			});
		} ]);

siteControllers.controller('PageCtrl', [
		'$scope',
		'$rootScope',
		'$location',
		'$log',
		'Restangular',
		function($scope, $rootScope, $location, $log, Restangular) {
			var pages = $scope.gSite.pages;
			for (var i = 0; i < pages.length; ++i) {
				if ($location.path() === ('/' + pages[i].pathURL)) {
					$scope.templateUrl = pages[i].layoutURL;
					$rootScope.currentPage = angular.copy(pages[i]);
					$rootScope.currentPageIndex = i;
					var pageWeblets = Restangular.all('model/page/'
							+ pages[i].modelId + '/pagelet');
					pageWeblets.getList().then(function(pagelets) {
						if (pagelets.length > 0) {
							$scope.gSite.pages[i].pagelets = pagelets;
							$scope.gPagelets = pagelets;
						}
					});
					break;
				}
			}

		} ]);

siteControllers
		.controller(
				'PageSettingsCtrl',
				[
						'$scope',
						'$location',
						'$log',
						'Restangular',
						function($scope, $location, $log, Restangular) {
							$scope.currentTab = 1;
							$scope.showTabContent = function(tabIndex) {
								$scope.currentTab = tabIndex;
							};
							$scope.setErrorVisible = function(visible) {
								$scope.isError = visible;
							}
							$scope.cancel = function() {
								$('#managePage').foundation('reveal', 'close');
							};
							$scope.save = function() {
								var page = Restangular.one('model/site/'
										+ $scope.gSite.modelId + '/page/'
										+ $scope.currentPage.modelId);
								page
										.put(
												{
													'name' : $scope.currentPage.name,
													'pathURL' : $scope.currentPage.pathURL
												})
										.then(
												function(page) {
													$scope.gSite.pages[$scope.currentPageIndex] = angular
															.copy($scope.currentPage);
													$location
															.path($scope.currentPage.pathURL);
												});
							};
							$scope.remove = function() {
								var page = Restangular.one('model/site/'
										+ $scope.gSite.modelId + '/page/'
										+ $scope.currentPage.modelId);
								page
										.remove()
										.then(
												function() {
													$scope.gSite.pages
															.splice(
																	$scope.currentPageIndex,
																	1);
													$location
															.path($scope.gSite.pages[0].pathURL);
													$('#managePage')
															.foundation(
																	'reveal',
																	'close');
												},
												function(response) {
													$scope
															.setErrorVisible(true);
													$scope.errorMsg = response.data;
												});
							};
						} ]);