(function(angular){

	'use strict';


	var app = angular.module('Scaffle.App', ['ui.bootstrap', 'ui.router']);


	app.config(function($locationProvider, $stateProvider, $urlRouterProvider){


		$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise('/');


		$stateProvider.state('app', {
			abstract: true,
			url: '/',
			templateUrl: 'master.html',
			resolve: {
				Ranger: function(RangerLoader) {
					return RangerLoader.load();
				}
			},
			controller: function($scope, Ranger) {
				$scope.collections = Ranger.getSchemas();
			}
		});


		$stateProvider.state('app.dashboard', {
			url: '',
			views: {
				'master@app': {
					templateUrl: 'dashboard.html',
					controller: function(Ranger) {
						console.log(Ranger.doSomething());
					}
				}
			}
		});


		$stateProvider.state('app.about', {
			url: 'about',
			views: {
				'master@app': {
					templateUrl: 'about.html'
				}
			}
		});


		$stateProvider.state('app.collections', {
			url: '-',
			views: {
				'master@app': {
					templateUrl: 'collection/index.html',
					controller: 'ListCollectionsCtrl'
				}
			}
		});


		$stateProvider.state('app.collection', {
			abstract: true,
			url: '-/:collection',
			template: '<ui-view/>',
			resolve: {
				Schema: function($stateParams, Ranger) {
					return Ranger.getSchema($stateParams.collection);
				}
			}
		});


		$stateProvider.state('app.collection.list', {
			url: '?page',
			views: {
				'master@app': {
					templateUrl: 'collection/list.html',
					controller: 'ListEntitiesCtrl'
				}
			}
		});


		$stateProvider.state('app.collection.view', {
			url: '/:slug',
			resolve: {
				entity: function($stateParams, $http) {
					return $http.get('http://localhost:3001/1/' + $stateParams.collection + '/' + $stateParams.slug);
				}
			},
			views: {
				'master@app': {
					templateUrl: 'collection/view.html',
					controller: 'ViewEntityCtrl'
				}
			}
		});


	});


})(angular);
