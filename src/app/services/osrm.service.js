require('angular');

var _=require('lodash');  

module.exports=angular.module('osrm-service-module',[])
	.service('OSRMService',['$http', function($http) {
		var _svc = this;
			_junctions = [];
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
			wayCoordinates : function(way) {
				var coordinates = [], 
					idx = 0;
				_.forEach(way.nodes, function (nId) {
					node = _.find(_nodes, function (n) {
						return n.id === nId;
					});
					coordinates.push({lat: 50.924949,
														lng: -1.4707322});
				});
				return coordinates;
			},
			junctions : function(node) {

			},
			road : function(roadName) {

				return $http.get('/api/osm', {
					params : {
						roadName : roadName
					}
				})
				.then(function (resp) {
						_junctions = []; // empty junction list ..
						_ways = resp.data;

						_.forEach(_ways, function (segment) {
							_.forEach(segment.path, function (node) {
								if (node.tags && node.tags.highway==='motorway_junction') {
									if (!_.find(_junctions, function(junction) {
										return node.id === junction.id;
									})) {
										_junctions.push(node);
										console.log(node.id);
									}
								}
							});
						});

						return true;
					});
			},
			nodes : function() {
				return _nodes;
			},
			junctions : function() {
				return _junctions;
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