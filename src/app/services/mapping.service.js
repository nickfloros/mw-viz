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
			_mapEvents = {
				click: null,
				rightclick: null,
				dragend: null,
				dragstart: null
			},
			mapOptions = {
				zoomControl: true,
				zoom: 6,
				center: new google.maps.LatLng(53.881463, -4.196777),
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				disableDefaultUI: true
			};

		_.extend(svc, {
			init: function int(elementId) {
				// insta
				_map = new google.maps.Map(elementId, mapOptions);
				// create route display
				_directionsDisplay = new google.maps.DirectionsRenderer();
				_directionsDisplay.setMap(_map);
			},
			removeAllEvents: function () {
				if (_mapEvents.click) {
					google.maps.event.removeListener(_mapEvents.click);
					_mapEvents.click = null;
				}
				if (_mapEvents.rightclick) {
					google.maps.event.removeListener(_mapEvents.rightclick);
					_mapEvents.rightclick = null;
				}
			},
			bindEvent: function (eventType, cbFunction) {
				if (_mapEvents[eventType]) {
					google.maps.event.removeListener(_mapEvents[eventType]);
					_mapEvents[eventType] = null;
				}

				if (_mapEvents[eventType] === null) {
					_mapEvents[eventType] = google.maps.event.addListener(_map, eventType, cbFunction);
				}
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
			showMarker: function showMarker( latLng, icon) {

				marker = new google.maps.Marker({
    			position: latLng,
    			map: _map,
    			icon : icon
			  });
			  return marker;
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
			directionsDisplay: function directionsDisplayAccessor() {
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