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
						var idx;
						// slit input to node  / ways 
						_.forEach(resp.data.elements, function (elem) {
							switch(elem.type) {
								case 'node' : 
								_nodes.push(elem);
								break;
								case 'way' : 
								_ways.push(elem);
								break;
							}
						});
						// link ways to nodes ..
						_.forEach(_ways, function (way) {
								// add list of nodes ..
								way['nodeList'] = [];
								_.forEach(way.nodes, function(node) {
										idx = _.findIndex(_nodes, function (n) {
											return n.id ===node;
										});
										way.nodeList.push({lat : _nodes[idx].lat, 
												lng : _nodes[idx].lon});
								});
						})

						return true;
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