!function(t){"use strict";var e=t.module("Scaffle.App",["ui.bootstrap","ui.router"]);e.config(["$locationProvider","$stateProvider","$urlRouterProvider",function(t,e,o){t.html5Mode(!0),o.otherwise("/"),e.state("app",{"abstract":!0,url:"/",templateUrl:"master.html",resolve:{Ranger:["RangerLoader",function(t){return t.load()}]},controller:["$scope","Ranger",function(t,e){t.collections=e.getSchemas()}]}),e.state("app.dashboard",{url:"",views:{"master@app":{templateUrl:"dashboard.html",controller:["Ranger",function(t){console.log(t.doSomething())}]}}}),e.state("app.about",{url:"about",views:{"master@app":{templateUrl:"about.html"}}}),e.state("app.collections",{url:"-",views:{"master@app":{templateUrl:"collection/index.html",controller:"ListCollectionsCtrl"}}}),e.state("app.collection",{"abstract":!0,url:"-/:collection",template:"<ui-view/>",resolve:{Schema:["$stateParams","Ranger",function(t,e){return e.getSchema(t.collection)}]}}),e.state("app.collection.list",{url:"?page",views:{"master@app":{templateUrl:"collection/list.html",controller:"ListEntitiesCtrl"}}}),e.state("app.collection.view",{url:"/:slug",resolve:{entity:["$stateParams","$http",function(t,e){return e.get("http://localhost:3001/1/"+t.collection+"/"+t.slug)}]},views:{"master@app":{templateUrl:"collection/view.html",controller:"ViewEntityCtrl"}}})}])}(angular),function(t){"use strict";t.controller("ListCollectionsCtrl",["$scope","Ranger",function(t,e){t.collections=e.getSchemas()}])}(angular.module("Scaffle.App")),function(t){"use strict";t.controller("ListEntitiesCtrl",["$scope","$http","$stateParams","Schema",function(t,e,o,a){t.schema=a,e.get("http://localhost:3001/1/"+o.collection).then(function(e){t.entities=e.data.items})}])}(angular.module("Scaffle.App")),function(t){"use strict";function e(t){return t.charAt(0).toUpperCase()+t.slice(1)}t.controller("ViewEntityCtrl",["$scope","$stateParams","entity",function(t,o,a){t.collection={slug:o.collection,plural:e(o.collection)},t.entity=a.data.item}])}(angular.module("Scaffle.App")),function(t){"use strict";function e(t){return t.charAt(0).toUpperCase()+t.slice(1)}t.filter("humanize",function(){return function(t){return"_id"===t?"ID":("_"===t.charAt(0)&&(t=t.substr(1)),t=t.replace(/_/g," "),e(t))}})}(angular.module("Scaffle.App")),function(t){"use strict";t.service("RangerLoader",["$http",function(t){function e(){return t.get("/ranger.json").then(function(t){return new o(t.data)})}var o=function(t){this.schema_map={},this.data=t,angular.forEach(t.schemas,function(t,e){this.schema_map[t.slug]=e},this)};return o.prototype.doSomething=function(){console.log("doing something")},o.prototype.getSchemas=function(){return this.data.schemas},o.prototype.getSchema=function(t){return t in this.schema_map?this.data.schemas[this.schema_map[t]]:null},{load:e}}])}(angular.module("Scaffle.App"));
angular.module("Scaffle.App").run(["$templateCache", function($templateCache) {$templateCache.put("about.html","<ul class=\"breadcrumb\">\n	<li><a ui-sref=\"app.dashboard\">Dashboard</a></li>\n	<li class=\"active\">About</li>\n</ul>\n\n\n<div class=\"page-header\">\n	<h1>About Scaffle</h1>\n</div>\n\n\n<p>The about page.</p>\n");
$templateCache.put("dashboard.html","<div class=\"alert alert-success\">You were <strong>logged in</strong> successfully.</div>\n\n\n<ul class=\"breadcrumb\">\n	<li class=\"active\">Dashboard</li>\n</ul>\n\n\n<div class=\"page-header\">\n	<h1>Dashboard</h1>\n</div>\n\n\n<p>Welcome to the Scaffle dashboard.</p>\n");
$templateCache.put("master.html","<nav class=\"navbar navbar-inverse navbar-fixed-top\">\n\n	<div class=\"container\">\n\n		<div class=\"navbar-header\">\n			<button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\n				<span class=\"sr-only\">Toggle navigation</span>\n				<span class=\"icon-bar\"></span>\n				<span class=\"icon-bar\"></span>\n				<span class=\"icon-bar\"></span>\n			</button>\n			<a ui-sref=\"app.dashboard\" class=\"navbar-brand\">Scaffle</a>\n		</div>\n\n		<div id=\"navbar\" class=\"collapse navbar-collapse\">\n			<ul class=\"nav navbar-nav\">\n				<li class=\"dropdown\" dropdown>\n					<a ui-sref=\"app.collections\" class=\"dropdown-toggle\" dropdown-toggle>Collections <span class=\"caret\"></span></a>\n					<ul class=\"dropdown-menu\">\n						<li ng-repeat=\"collection in collections\">\n							<a ui-sref=\"app.collection.list({collection:collection.slug})\" ng-bind=\"::collection.name\"></a>\n						</li>\n						<li class=\"divider\"></li>\n						<li><a ui-sref=\"app.collections\">View all</a></li>\n					</ul>\n				</li>\n				<li><a ui-sref=\"app.schemas.list\">Schemas</a></li>\n				<li><a ui-sref=\"app.files.list\">Files</a></li>\n				<li><a ui-sref=\"app.users.list\">Users</a></li>\n				<li><a ui-sref=\"app.about\">About</a></li>\n			</ul>\n		</div>\n\n	</div>\n\n</nav>\n\n\n<div class=\"container\">\n\n	<div ui-view=\"master\"></div>\n\n</div>\n\n\n<footer>\n	<div class=\"container\">\n		<div class=\"row\">\n			<div class=\"col-lg-12\">\n				Powered by Scaffle. Part of the Peaks package.\n			</div>\n		</div>\n	</div>\n</footer>\n");
$templateCache.put("collection/index.html","<ul class=\"breadcrumb\">\n	<li><a ui-sref=\"app.dashboard\">Dashboard</a></li>\n	<li class=\"active\">Collections</li>\n</ul>\n\n\n<div class=\"page-header\">\n	<h1>Collections</h1>\n</div>\n\n\n<table class=\"table table-bordered table-striped\">\n\n	<thead>\n		<tr>\n			<th>Name</th>\n		</tr>\n	</thead>\n\n	<tbody>\n		<tr ng-repeat=\"collection in collections\">\n			<td>\n				<a ui-sref=\"app.collection.list({collection:collection.slug})\">{{ ::collection.name }}</a>\n			</td>\n		</tr>\n	</tbody>\n\n</table>\n");
$templateCache.put("collection/list.html","<ul class=\"breadcrumb\">\n	<li><a ui-sref=\"app.dashboard\">Dashboard</a></li>\n	<li><a ui-sref=\"app.collections\">Collections</a></li>\n	<li class=\"active\" ng-bind=\"::schema.name\"></li>\n</ul>\n\n\n<div class=\"page-header\">\n	<a ui-sref=\"app.collection.new\" class=\"btn btn-primary pull-right\">Add new</a>\n	<h1 ng-bind=\"::schema.name\"></h1>\n</div>\n\n\n<table class=\"table table-bordered table-striped\">\n\n	<thead>\n		<tr>\n			<th>Name</th>\n			<th>Created</th>\n			<th>Updated</th>\n			<th>&nbsp;</th>\n		</tr>\n	</thead>\n\n	<tbody>\n		<tr ng-repeat=\"entity in entities\">\n			<td><a ui-sref=\"app.collection.view({slug:entity._id})\" ng-bind=\"::entity.name\"></a></td>\n			<td ng-bind=\"::entity._created\"></td>\n			<td ng-bind=\"::entity._updated\"></td>\n			<td>\n				<a ui-sref=\"app.collection.view({slug:entity._id})\">edit</a>\n				<a ui-sref=\"app.collection.delete({slug:entity._id})\">delete</a>\n			</td>\n		</tr>\n	</tbody>\n\n</table>\n\n<ul class=\"pagination\">\n	<li class=\"disabled\"><a href=\"#\">&laquo;</a></li>\n	<li class=\"active\"><a href=\"#\">1</a></li>\n	<li class=\"disabled\"><a href=\"#\">&raquo;</a></li>\n</ul>\n");
$templateCache.put("collection/view.html","<ul class=\"breadcrumb\">\n	<li><a ui-sref=\"app.dashboard\">Dashboard</a></li>\n	<li><a ui-sref=\"app.collections\">Collections</a></li>\n	<li><a ui-sref=\"app.collection.list\" ng-bind=\"::collection.plural\"></a></li>\n	<li class=\"active\" ng-bind=\"::entity.name\"></li>\n</ul>\n\n\n<div class=\"page-header\">\n	<a ui-sref=\"app.collection.list\" class=\"btn btn-primary pull-right\">View all</a>\n	<h1 ng-bind=\"::entity.name\"></h1>\n</div>\n\n\n<form class=\"form-horizontal\">\n	<fieldset>\n\n		<div class=\"form-group\" ng-repeat=\"(key, value) in entity\">\n			<label class=\"col-lg-2 control-label\" ng-bind=\"key | humanize\"></label>\n			<div class=\"col-lg-10\">\n				<div ng-if=\"entity[key]._id\">\n					<span ng-bind=\"entity[key].name\"></span>\n				</div>\n				<div ng-if=\"!entity[key]._id\">\n					<input type=\"text\" class=\"form-control\" ng-model=\"entity[key]\">\n				</div>\n			</div>\n		</div>\n\n		<div class=\"form-group\">\n			<div class=\"col-lg-10 col-lg-offset-2\">\n				<button type=\"reset\" class=\"btn btn-default\">Cancel</button>\n				<button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n			</div>\n		</div>\n\n	</fieldset>\n</form>\n");}]);
//# sourceMappingURL=app.js.map