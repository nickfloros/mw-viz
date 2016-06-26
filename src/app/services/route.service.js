require('angular');

var _ = require('lodash'),
	RoutePoint = require('../models/route-point.model');

module.exports = angular.module('route-service-module', [

		// factories
		require('../factories/geojson.factory').name,

		// services
		require('./reverse-geocoder.service').name,
		require('./mapping.service').name

	])
	.service('RouteService', ['$q', 'GeoJSONFactory', 'ReverseGeocoderService', 'MappingService', function ($q, GeoJSONFactory, ReverseGeocoderService, MappingService) {
		var svc = this,
			_directionsService = null,
			_directionsDisplay = null,
			_startPoint = new RoutePoint(),
			_endPoint = new RoutePoint(),
			_route = [];

		_.extend(svc, {
			init: function () {
				_directionsService = new google.maps.DirectionsService();
				_directionsDisplay = new google.maps.DirectionsRenderer();
				_directionsDisplay.setMap(MappingService.map());
				_directionsDisplay.setOptions({
					suppressMarkers: true
				});
			},
			showStartPoint: function showStartPoint(latLng) {
				_startPoint.raw = latLng;

				_startPoint.marker = MappingService.showMarker(latLng, {
					path: google.maps.SymbolPath.CIRCLE,
					scale: 3
				});

				ReverseGeocoderService.search(latLng)
					.then(function (locations) {
						_startPoint.geocodePoints = locations;
						_startPoint.geocode = locations[0];
					});
			},
			showEndPoint: function showEndPoint(latLng) {
				_endPoint.raw = latLng;

				_endPoint.marker = MappingService.showMarker(latLng, {
					path: google.maps.SymbolPath.CIRCLE,
					scale: 3
				});

				// reverse geocode position ..
				return ReverseGeocoderService.search(latLng)
					.then(function (locations) {
						_endPoint.geocodePoints = locations;
						_endPoint.geocode = locations[0]; // default to the first one 
					});
			},
			startPoint: function startPointAccessor(val) {
				return arguments.length ? _startPoint = val : _startPoint;
			},
			endPoint: function endPointAccesor(val) {
				return arguments.length ? _endPoint = val : _endPoint;
			},
			route: function routeAccessor(val) {
				return arguments.length ? _route = val : _route;
			},
			drawRoute: function drawRoute(route) {
				_directionsDisplay.setDirections(route);
			},
			compute: function compute() {
				var deferrred = $q.defer(),
					request = {
						origin: _startPoint.geocode.geometry.location,
						destination: _endPoint.geocode.geometry.location,
						travelMode: google.maps.TravelMode.DRIVING
					};

				_directionsService.route(request, function (result, status) {
					if (status == google.maps.DirectionsStatus.OK) {
						deferrred.resolve({
							google: result, // pick the first one 
							geoJSON: GeoJSONFactory.createPolyLineFromRoute(result.routes[0])
						});
					}
				});

				// at this point we want to compute the route 
				return deferrred.promise;
			}
		})
	}])