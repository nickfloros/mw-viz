require('angular');

var _=require('lodash');

module.exports = angular.module('home-controller-module',[
	require('../services/mapping.service').name
	])
	.controller('homeController',['$rootScope','MappingService', function ($rootScope, MappingService){

		var ctrl = this,
		_.extend(ctrl,{
			init : function () {
				MappingService.map().addListener('click', function (event) {

					MappingService.geocode(event.latLng)
						.then(function (dataSet) {
							// because geocode is outside angular's control
							if (!$rootScope.$$phase) {
								$rootScope.apply();
							}
						});
				});
			}
		})
	}]);
