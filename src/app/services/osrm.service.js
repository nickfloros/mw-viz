require('angular');

var _ = require('lodash');

module.exports = angular.module('osrm-service-module', [])
	.service('OSRMService', ['$http', function ($http) {
		var _svc = this,
			_junctions = [],
			_boundingBox,
			_ways = [];

		_.extend(_svc, {
			road: function (roadName) {
				return $http.get('api/openStreet/road/' + roadName)
					.then(function (resp) {
						_junctions = []; // empty junction list ..
						_ways = resp.data.roadSegments;
						_boundingBox = resp.data.boundingBox;
						_.forEach(_ways, function (segment) {
							_.forEach(segment.path, function (node) {
								// pull junctions out of the list 
								if (node.tags && node.tags.highway === 'motorway_junction') {
									// add junction to the list if is not in already
									if (!_.find(_junctions, function (junction) {
											return node.id === junction.id;
										})) {
										_junctions.push(node);
									}
								}
							});
						});

						return true;
					});
			},
			junctions: function () {
				return _junctions;
			},
			ways: function () {
				return _ways;
			},
			boundingBox: function (val) {
				return arguments.length > 0 ? _boundingBox = val : _boundingBox;
			},
		});

	}]);