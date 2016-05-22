require('angular');
var _ = require('lodash');

module.exports = angular.module('mapping-controller', [
		require('../../services/mapping.service').name
	])
	.controller('MappingController', ['$rootScope', 'MappingService', function ($rootScope, MappingService) {
		var ctrl = this,
			_editableLocation = false,
			_placeList = [],
			_geocodeList = [],

			mapOptions = {
				zoomControl: true,
				zoom: 6,
				center: new google.maps.LatLng(53.881463, -4.196777),
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				disableDefaultUI: true
			};

		MappingService.map(new google.maps.Map(document.getElementById('gmap'), mapOptions));

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