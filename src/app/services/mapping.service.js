require('angular');

var _ = require('lodash');

module.exports = angular.module('mapping-service-module', [
		require('./bounding-box.service').name,
		require('./places.service').name,
		require('./geocoder.service').name,
	])
	.service('MappingService', ['$http', '$interval', '$window', '$q', 'PlacesService', 'GeocoderService', 'BoundingBoxService', function MappingService($http, $interval, $window, $q, PlacesService, GeocoderService, BoundingBoxService) {
		var svc = this,
			_directionsDisplay,
			_map,
			mapOptions = {
				zoomControl: true,
				zoom: 6,
				center: new google.maps.LatLng(53.881463, -4.196777),
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				disableDefaultUI: true
			};

		_.extend(svc, {
			init : function int(elementId) {
				// insta
				_map = new google.maps.Map(elementId, mapOptions);
				// create route display
			  _directionsDisplay = new google.maps.DirectionsRenderer();
				_directionsDisplay.setMap(map);
			},
			boundingBox: function () {
				return BoundingBoxService;
			},
			data: function dataAcessor() {},
			map: function mapAcessor(val) {
				return arguments.length ? _map = val : _map;
			},
			breakDownMarker: function breakdownMarkerAcessor(val) {
				return arguments.length ? _breakdownMarker = val : _breakdownMarker;
			},
			heatmap: function heatmapAcessor(val) {
				if (arguments.length) {
					_heatmap = val
					_heatmap.setMap(_map);
				}

				return _heatmap;
			},
			geocodeList: GeocoderService.results,
			selectedPlace: PlacesService.selectedPlace,
			reset: function () {
				PlacesService.reset();
				GeocoderService.reset();
			},
			geocode: function (latLng) {
				PlacesService.search(_map, latLng, 100);
				return GeocoderService.search(_map, latLng);
			},
			removePOI: function removePOI() {
				_map.data.forEach(function (feature) {
					_map.data.remove(feature);

				});
			},
			directionsDisplay : function directionsDisplayAccessor() {
				return _directionsDisplay;
			},
			setCenter: function setCenter(latLng) {
				_map.setCenter(_offsetCenter(latLng, 0 - $window.innerWidth / 4));
			},
			getCenter: function getCenter() {
				return _offsetCenter(_map.getCenter(), $window.innerWidth / 4);
			}
		})
	}]);