require('angular');

var _ = require('lodash'),
	RoutePoint = require('../../models/route-point.model');

module.exports = angular.module('smart-motorway-controller.module', [
		// services
		require('../../services/mapping.service').name,
		require('../../services/route.service').name,
	])
	.controller('smartMotorwaysController', ['MappingService', 'RouteService', function (MappingService, RouteService) {
		var ctrl = this,
			_startPoint = new RoutePoint(),
			_endPoint = new RoutePoint();

		_.extend(ctrl, {
			init: function init() {
				// bind left click for start point
				MappingService.bindEvent('click', ctrl.leftClick);
				// bind right click for end point
				MappingService.bindEvent('rightclick', ctrl.rightClick);
			},
			compute: function compute() {
				MappingService.removeRoutes();
				return RouteService.compute()
					.then(function (route) {
						//RouteService.drawRoute(route.google);
						//						console.log(route.google.toJSON());
						MappingService.drawRoute(route);
					});
			},
			leftClick: function leftClict(event) {
				RouteService.showStartPoint(event.latLng);
			},
			rightClick: function rightClick(event) {
				RouteService.showEndPoint(event.latLng);
			},
			startPoint: function (val) {
				if (arguments.length) {
					MappingService.removeRoutes();
					RouteService.startPoint().geocode = val;
					RouteService.startPoint().marker.setPosition(val.geometry.location);
				}

				return RouteService.startPoint();
			},
			endPoint: function (val) {
				if (arguments.length) {
					MappingService.removeRoutes();
					RouteService.endPoint().geocode = val;
					RouteService.endPoint().marker.setPosition(val.geometry.location);
				}
				return RouteService.endPoint();
			},
			save: function() {

			},
			modelOptions: {
				getterSetter: true
			}

		});

	}]);