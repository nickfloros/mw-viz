require('angular');

var _=require('lodash');  

module.exports=angular.module('roads-service-module',[])
	.service('RoadsService',['$http', function($http) {
		var _svc = this;
			_nodes = [],
			_ways=[];

		_.extend(_svc, {
			find : function(swPoint, nePoint) {
				$http.get('/api/osrm', function(dataSet) {

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