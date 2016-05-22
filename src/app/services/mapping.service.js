require('angular');

var _ = require('lodash');

module.exports = angular.module('mapping-service-module', [
		require('./places.service').name,
		require('./geocoder.service').name,
	])
	.service('MappingService', ['$http', '$interval', '$window', '$q', 'PlacesService', 'GeocoderService', function MappingService($http, $interval, $window, $q, PlacesService, GeocoderService) {
		var svc = this,
			_placeSearch,
			_geocodeList = [],
			_placesMarker = [],
			_map, _heatmap, _breakdownMarker, infoWindow,
			_geocoder = new google.maps.Geocoder(),
			_pointArray = new google.maps.MVCArray([]),
			infowindow = new google.maps.InfoWindow(),

			createPlacesMarker = function (place) {
				var placeLoc = place.geometry.location;
				var marker = new google.maps.Marker({
					map: _map,
					position: place.geometry.location
				});

				google.maps.event.addListener(marker, 'click', function (val) {
					infowindow.setContent(place.name);
					infowindow.open(_map, this);
				});

				_placesMarker.push(place);
			};

		_.extend(svc, {
			data: function dataAcessor() {
				return _pointArray;
			},
			map: function mapAcessor(val) {
				if (arguments.length) {
					_placesSearch = new google.maps.places.PlacesService(val);
				}
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
			geocodeList: function () {
				return _geocodeList;
			},
			reset: function () {
				_placesSearch = [];
				_geocoderList = [];
			},
			geocode: function (latLng) {
				var deferred = $q.defer();

				PlacesService.search(_map, latLng, 100);
				return GeocoderService.search(_map, latLng);

			},
			removePOI: function removePOI() {
				_map.data.forEach(function (feature) {
					_map.data.remove(feature);

				});
			},
			selectedPlace: PlacesService.selectedPlace,
			setCenter: function setCenter(latLng) {
				_map.setCenter(_offsetCenter(latLng, 0 - $window.innerWidth / 4));
			},
			getCenter: function getCenter() {
				return _offsetCenter(_map.getCenter(), $window.innerWidth / 4);
			}
		})
	}]);