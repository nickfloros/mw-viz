require('angular');

var _=require('lodash'),
	RoutePoint = require('../models/route-point.model');

module.exports = angular.module('route-service-module',[
		require('./reverse-geocoder.service').name,
		require('./mapping.service').name

	])
	.service('RouteService',['$q','ReverseGeocoderService','MappingService', function ($q, ReverseGeocoderService, MappingService){
		var svc = this,
			_directionsService = new google.maps.DirectionsService(),
			_directionsDisplay = new google.maps.DirectionsRenderer();
			_startPoint = new RoutePoint(), 
			_endPoint = new RoutePoint(),
			_route = [];

		_.extend(svc, {
			init:function() {
			},		
			showStartPoint: function showStartPoint(latLng) {
				_startPoint.raw = latLng;

				_startPoint.marker = MappingService.showMarker(latLng, {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 3
          });

				ReverseGeocoderService.search(latLng)
					.then(function (loc) {
						_startPoint.geocode = loc;
						console.log('startPoint', loc);
					});
			},
			showEndPoint: function showEndPoint(latLng) {
				_endPoint.raw = latLng;

				_endPoint.marker = MappingService.showMarker(latLng, {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 3
          });

				// reverse geocode position ..
				ReverseGeocoderService.search(latLng)
						.then(function (loc) {
						_endPoint.geocode = loc;
						console.log('end point',loc);
					});
			},
			startPoint : function startPointAccessor(val) {
				return arguments.length?_startPoint = val : _startPoint;
			},
			endPoint : function endPointAccesor(val) {
				return arguments.length?_endPoint = val :_endPoint;
			},
			route : function routeAccessor(val) {
				return arguments.length ? _route = val : _route;
			},
			compute: function compute() {
				var deferrred = $q.defer(),
					request = {
				    origin:_startPoint.geocode.geometry.location,
				    destination:_endPoint.geocode.geometry.location,
				    travelMode: google.maps.TravelMode.DRIVING
				  };

				  _directionsDisplay.setMap(MappingService.map());
				  _directionsService.route(request, function(result, status) {
				    if (status == google.maps.DirectionsStatus.OK) {
				      _directionsDisplay.setDirections(result);
//				      result.routes[0].overview_path[0].lat()
//				      result.routes[0].overview_path[0].lng()
				      deferrred.resolve(result);
				    }
				  });

				// at this point we want to compute the route 
				return deferrred.promise;
			}
		})
	}])