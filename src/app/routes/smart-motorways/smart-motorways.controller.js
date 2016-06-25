require('angular');

var _ = require('lodash'),
	RoutePoint = require('../../models/route-point.model');

module.exports = angular.module('smart-motorway-controller.module', [
		// services
		require('../../services/mapping.service').name,
		require('../../services/geocoder.service').name,
	])
	.controller('smartMotorwaysController', ['MappingService', 'GeocoderService', function (MappingService, GeocoderService) {
		var ctrl = this,
			_startPoint = new RoutePoint(),
			_endPoint = new RoutePoint();

		_.extend(ctrl, {
			init: function init() {
				MappingService.bindEvent('click', ctrl.leftClick);
				// bin left click for 
				MappingService.bindEvent('rightclick', ctrl.rightClick);
			},
			computeRoute: function computeRoute() {

			},
			leftClick: function leftClict(event) {
				_startPoint.raw.lat = event.latLng().lat();
				_startPoint.raw.lng = event.latLng().lng();
				MappingService.addMarker(event.latLng(), '')
			},
			rightClick: function rightClick(event) {
				console.log('rightclick');
			},
			modelOptions: {
				getterSetter: true
			}

		});

	}]);