var _ = require('lodash');
require('angular');

module.exports = angular.module('link-route-module', [
		require('./osrm.controller').name
	])
	.config(['$stateProvider', function HomeCondif($stateProvider) {
		$stateProvider.state('link', {
			url: '/link',
			views: {
				panel: {
					templateUrl: "partials/osrm.template.html",
					controller: 'osrmController',
					controllerAs: 'ctrl'
				}
			}
		});

	}]);