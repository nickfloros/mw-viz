require('angular');
var _ = require('lodash');

module.exports = angular.module('mapping-controller', [
		require('../../services/mapping.service').name
	])
	.controller('MappingController', ['$rootScope', 'MappingService', function ($rootScope, MappingService) {
		var ctrl = this,
			_editableLocation = false,
			_placeList = [],
			_geocodeList = [];

		MappingService.init(document.getElementById('gmap'));
		
		MappingService.map().addListener('click', function (event) {

			MappingService.geocode(event.latLng)
				.then(function (dataSet) {
					// because geocode is outside angular's control
					if (!$rootScope.$$phase) {
						$rootScope.apply();
					}
				});
		});

		_.extend(ctrl, {
			placeList: function () {},
			geocodeList: function () {
				return MappingService.geocodeList();
			}
		});
	}]);