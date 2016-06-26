require('angular');

var _ = require('lodash');

module.exports = angular.module('klm-factory-module', [])
	.factory('GeoJSONFactory', [function () {

		return {
			createPolyLineFromRoute: function create(googleRoute) {
				var waypoints = [];

				// create path 
				_.forEach(googleRoute.legs[0].steps, function (step) {
					_.forEach(step.lat_lngs, function (point) {
						waypoints.push([point.lng(), point.lat()])
					})
				});

				/*				_.forEach(googleRoute.overview_path, function (point) {
									waypoints.push([point.lng(), point.lat()]);
								});
				*/
				return {
					type: 'Feature',
					id: 'x',
					properties: {
						route: 1
					},
					geometry: {
						type: "LineString",
						coordinates: waypoints
					}
				};
			}
		};
	}]);