(function(app){

	'use strict';


	app.service('RangerLoader', function($http){


		var Ranger = function(data) {
			this.schema_map = {};
			this.data = data;
			angular.forEach(data.schemas, function(schema, i){
				this.schema_map[schema.slug] = i;
			}, this);
		};


		Ranger.prototype.doSomething = function() {
			console.log('doing something');
		};


		Ranger.prototype.getSchemas = function() {
			return this.data.schemas;
		};


		Ranger.prototype.getSchema = function(slug) {
			return (slug in this.schema_map) ? this.data.schemas[this.schema_map[slug]] : null;
		};


		function loadDataFromUrl() {

			return $http.get('/ranger.json')
				.then(function(resp){
					return new Ranger(resp.data);
				});

		}


		return {
			load: loadDataFromUrl
		};


	});


})(angular.module('Scaffle.App'));
