(function(app){

	'use strict';


	app.controller('ViewEntityCtrl', function($scope, $stateParams, entity){
		$scope.collection = {
			slug: $stateParams.collection,
			plural: ucfirst($stateParams.collection)
		};
		$scope.entity = entity.data.item;
	});


	function ucfirst(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}


})(angular.module('Scaffle.App'));
