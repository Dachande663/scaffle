(function(app){

	'use strict';


	app.controller('ListEntitiesCtrl', function($scope, $http, $stateParams){
		$scope.collection = {
			slug: $stateParams.collection,
			plural: ucfirst($stateParams.collection)
		};
		$http.get('http://localhost:3001/1/' + $stateParams.collection).then(function(resp){
			$scope.entities = resp.data.items;
		});
	});


	function ucfirst(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}


})(angular.module('Scaffle.App'));
