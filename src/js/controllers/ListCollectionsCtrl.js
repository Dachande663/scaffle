(function(app){

	'use strict';


	app.controller('ListCollectionsCtrl', function($scope){
		$scope.collections = [
			{ _id: 'cinemas', name: 'Cinemas' },
			{ _id: 'movies', name: 'Movies' },
			{ _id: 'visits', name: 'Visits' }
		];
	});


})(angular.module('Scaffle.App'));
