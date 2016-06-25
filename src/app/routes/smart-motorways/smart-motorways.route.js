var _ = require('lodash');
require('angular');

module.exports = angular.module('smart-motorway-route-module', [
		require('./smart-motorways.controller').name,
		require('../../services/mapping.service').name,
	])
	.config(['$stateProvider', function HomeCondif($stateProvider) {
		$stateProvider.state('smart-motorways', {
			url: '/smart-motorways',
			views: {
				panel: {
					templateUrl: "partials/smart-motorways.template.html",
					controller: 'smartMotorwaysController',
					controllerAs: 'ctrl'
				}
			},
			onEntry: ['MappingService', function (MappingService) {
				MappingService.removeAllEvents();
			}],
			onExit: ['MappingService', function (MappingService) {
				MappingService.removeAllEvents();
			}]
		});

	}]);