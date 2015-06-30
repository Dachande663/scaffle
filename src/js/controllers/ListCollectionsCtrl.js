(function(app){

	'use strict';


	app.controller('ListCollectionsCtrl', function($scope, Ranger){
		$scope.collections = Ranger.getSchemas();
	});


})(angular.module('Scaffle.App'));
