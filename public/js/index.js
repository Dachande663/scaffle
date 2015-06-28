(function(angular){

	'use strict';


	var app = angular.module('Scaffle', ['ui.bootstrap', 'ui.router']);


	app.config(function($stateProvider, $urlRouterProvider){


		$urlRouterProvider.otherwise('/');


		$stateProvider.state('app', {
			abstract: true,
			url: '/',
			templateUrl: 'views/master.html'
		});

		$stateProvider.state('app.dashboard', {
			url: '',
			views: {
				'master@app': {
					templateUrl: 'views/dashboard.html'
				}
			}
		});


		$stateProvider.state('app.about', {
			url: 'about',
			views: {
				'master@app': {
					templateUrl: 'views/about.html'
				}
			}
		});


		$stateProvider.state('app.collections', {
			url: '-',
			views: {
				'master@app': {
					templateUrl: 'views/collection/index.html',
					controller: 'ListCollectionsCtrl'
				}
			}
		});


		$stateProvider.state('app.collection', {
			abstract: true,
			url: '-/:collection',
			template: '<ui-view/>'
		});


		$stateProvider.state('app.collection.list', {
			url: '?page',
			views: {
				'master@app': {
					templateUrl: 'views/collection/list.html',
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
					templateUrl: 'views/collection/view.html',
					controller: 'ViewEntityCtrl'
				}
			}
		});


	});


	app.controller('ListCollectionsCtrl', function($scope){
		$scope.collections = [
			{ _id: 'cinemas', name: 'Cinemas' },
			{ _id: 'movies', name: 'Movies' },
			{ _id: 'visits', name: 'Visits' }
		];
	});


	app.controller('ListEntitiesCtrl', function($scope, $http, $stateParams){
		$scope.collection = {
			slug: $stateParams.collection,
			plural: ucfirst($stateParams.collection)
		};
		$http.get('http://localhost:3001/1/' + $stateParams.collection).then(function(resp){
			$scope.entities = resp.data.items;
		})
	});


	app.controller('ViewEntityCtrl', function($scope, $stateParams, entity){
		$scope.collection = {
			slug: $stateParams.collection,
			plural: ucfirst($stateParams.collection)
		};
		$scope.entity = entity.data.item;
	});


	app.filter('humanize', function(){
		return function(str) {
			if(str === '_id') {
				return 'ID';
			}
			if(str.charAt(0) === '_') {
				str = str.substr(1);
			}
			str = str.replace(/_/g, ' ');
			return ucfirst(str);
		}
	});


	function ucfirst(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}


})(angular);
