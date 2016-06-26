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
				return RouteService.compute()
					.then(function(route) {
						console.log(route);
					});
			},
			leftClick: function leftClict(event) {
				RouteService.showStartPoint(event.latLng);
			},
			rightClick: function rightClick(event) {
				RouteService.showEndPoint(event.latLng);
			},
			startPoint:function() {
				return RouteService.startPoint();
			},
			endPoint:function() {
				return RouteService.endPoint();
			},
			modelOptions: {
				getterSetter: true
			}

		});

	}]);