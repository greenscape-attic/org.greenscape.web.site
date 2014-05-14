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
				var page = Restangular.all('model/site/id/'
						+ $scope.gSite.modelId + '/page');
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
			var site = Restangular.all('model');
			site.customGET('site/name/' + 'Greenscape').then(function(site) {
				$scope.gSite = site;
				$rootScope.siteName = $scope.gSite.name;
				$route.reload();
			});
			$scope.gSiste = {
				'name' : 'Greenscape',
				'template' : {
					'url' : '/common/templates/main.html',
					'headerUrl' : '/common/templates/header.html',
					'footerUrl' : '/common/templates/footer.html'
				},
				'pages' : [ {
					'name' : 'Home',
					'url' : '#home',
				// 'layout' : '/common/layout/1-col.html'
				}, {
					'name' : 'Products',
					'url' : '#products',
					// 'layout' : '/common/layout/1-col.html',
					'pages' : [ {
						'name' : 'Mobile Manager',
						'url' : 'product/mobilemanager',
					// 'layout' : '/common/layout/1-col.html'
					} ]
				}, {
					'name' : 'About Us',
					'url' : '#aboutUs',
				// 'layout' : '/common/layout/2-col.html'
				} ]
			};
		} ]);

siteControllers.controller('NavigationCtrl',
		[
				'$scope',
				'$rootScope',
				'$location',
				'$routeParams',
				'$log',
				'Restangular',
				function($scope, $rootScope, $location, $routeParams, $log,
						Restangular) {
					// TODO: make REST call to get weblets
					// getWeblets(pageUrl)
					// $scope.head_show = true;
					// $scope.cnt_show = true;

					var pages = $scope.gSite.pages;
					if (pages == null) {
						var sitePages = Restangular.all('model/site/id/'
								+ $scope.gSite.modelId + '/page');
						sitePages.getList().then(function(pages) {
							$scope.gSite.pages = pages;
						});
					}
					for ( var i in pages) {
						if ($location.path() === ('/' + pages[i].pathURL)) {
							$scope.templateUrl = pages[i].layoutURL;
							$rootScope.currentPage = angular.copy(pages[i]);
							$rootScope.currentPageIndex = i;
							break;
						}
					}
					if ($location.path() === '/home') {
						$scope.weblets = [ {
							'webletId' : 1,
							'title' : 'Web Content Display',
							'viewUrl' : 'Still stuck in the past?',
							'editUrl' : '',
							'helpUrl' : 'Help me',
							'configUrl' : '',
							'row' : 1,
							'col' : 1,
							'order' : 2
						}, {
							'webletId' : 13,
							'title' : 'Web Content Display',
							'viewUrl' : 'Held by chains?',
							'editUrl' : '',
							'helpUrl' : '',
							'configUrl' : '',
							'row' : 1,
							'col' : 1,
							'order' : 1
						}, {
							'webletId' : 561,
							'title' : 'Web Content Display',
							'viewUrl' : 'The future is here',
							'editUrl' : '',
							'helpUrl' : '',
							'configUrl' : '',
							'row' : 1,
							'col' : 2,
							'order' : 1
						} ];
					} else if ($location.path() === '/products') {
						$scope.weblets = [ {
							'webletId' : 1,
							'title' : 'Web Content Display',
							'viewUrl' : 'MobileAds',
							'editUrl' : '',
							'helpUrl' : '',
							'configUrl' : '',
							'row' : 1,
							'col' : 1,
							'order' : 1
						}, {
							'webletId' : 561,
							'title' : 'Web Content Display',
							'viewUrl' : 'AnaMob',
							'editUrl' : '',
							'helpUrl' : '',
							'configUrl' : '',
							'row' : 1,
							'col' : 2,
							'order' : 1
						} ];
					} else if ($location.path() === '/aboutUs') {
						$scope.weblets = [ {
							'webletId' : 1,
							'title' : 'Web Content Display',
							'viewUrl' : 'Who we are',
							'editUrl' : '',
							'helpUrl' : '',
							'configUrl' : '',
							'row' : 1,
							'col' : 1,
							'order' : 1
						}, {
							'webletId' : 561,
							'title' : 'Web Content Display',
							'viewUrl' : 'What we do',
							'editUrl' : '',
							'helpUrl' : '',
							'configUrl' : '',
							'row' : 1,
							'col' : 1,
							'order' : 2
						} ];
					}

				} ]);

siteControllers.controller('PageSettingsCtrl', [
		'$scope',
		'$location',
		'$log',
		'Restangular',
		function($scope, $location, $log, Restangular) {
			$scope.currentTab = 1;
			$scope.showTabContent = function(tabIndex) {
				$scope.currentTab = tabIndex;
			};
			$scope.setErrorVisible = function(visible){
				$scope.isError = visible;
			}
			$scope.cancel = function() {
				$('#managePage').foundation('reveal', 'close');
			};
			$scope.save = function() {
				var page = Restangular.one('model/site/id/'
						+ $scope.gSite.modelId + '/page/'+$scope.currentPage.modelId);
				page.put({
					'name' : $scope.currentPage.name,
					'pathURL' : $scope.currentPage.pathURL
				}).then(function(page) {
					$scope.gSite.pages[$scope.currentPageIndex] = angular.copy($scope.currentPage);
					$location.path($scope.currentPage.pathURL);
				});
			};
			$scope.remove = function(){
				var page = Restangular.one('model/site/id/' + $scope.gSite.modelId + '/page/' + $scope.currentPage.modelId);
				page.remove().then(function() {
					$scope.gSite.pages.splice($scope.currentPageIndex, 1);
					$location.path($scope.gSite.pages[0].pathURL);
					$('#managePage').foundation('reveal', 'close');
				},function(response){
					$scope.setErrorVisible(true);
					$scope.errorMsg = response.data;
				});
			};
		} ]);