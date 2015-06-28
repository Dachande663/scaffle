(function(app){

	'use strict';


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
		};
	});


	function ucfirst(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}


})(angular.module('Scaffle.App'));
