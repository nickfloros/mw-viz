require('angular');

var _=require('loadash');

module.exports = angular.module('route-service-module',[
		require('../mapping.service').name
	])
	.service('RouteService',['$q','MappingService', function ($q, MappingSerivce){
		var svc = this,
			_directionsService = new google.maps.DirectionsService(),
			_startPoint, 


			_endPoint,
			_route = [];

		_.extend(svc, {
			init:function() {

			},
			startPoint : function startPointAccessor(val) {
				return arguments.length?_startPoint = val : _startPoint;
			},
			endPoint : function endPointAccesor(val) {
				return arguments.length?_endPoint = val :_endPoint;
			},
			route : function routeAccessor(val) {
				return arguments.length ? _route = val : _route;
			};
			compute: function compute() {
				var deferrred = $q.defer();

				// at this point we want to compute the route 
				return deferrred.promise;
			};
		})
	}])