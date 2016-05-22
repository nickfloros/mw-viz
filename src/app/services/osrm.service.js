require('angular');

var _=require('lodash');  

module.exports=angular.module('osrm-service-module',[])
	.service('OSRMService',['$http', function($http) {
		var _svc = this;
			_nodes = [],
			_ways=[];

		_.extend(_svc, {
			find : function(bounds) {
				return $http.post('/api/osrm', {
					bounds : bounds.toJSON()
				})
				.then(function (resp) {

					});
			},
			nodes : function() {
				return _nodes;
			},
			ways : function() {
				return _ways;
			},
			findNode : function(id) {
				return _.find(nodes, function(item) {
					return item.id = id;
				});
			}
		});

}]);