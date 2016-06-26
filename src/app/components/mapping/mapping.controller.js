require('angular');
var _ = require('lodash');

module.exports = angular.module('mapping-controller', [
		require('../../services/mapping.service').name,
		require('../../services/route.service').name,
	])
	.controller('MappingController', ['$rootScope', 'RouteService', 'MappingService', function ($rootScope, RouteService, MappingService) {
		var ctrl = this,
			_editableLocation = false,
			_placeList = [],
			_geocodeList = [];

		MappingService.init(document.getElementById('gmap'));
		RouteService.init();

		_.extend(ctrl, {
			placeList: function () {},
			geocodeList: function () {
				return MappingService.geocodeList();
			}
		});

	}]);