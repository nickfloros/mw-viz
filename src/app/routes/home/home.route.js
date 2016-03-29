var _ = require('lodash');

require('angular');

module.exports = angular.module('home-route-module', [])
	.config(['$stateProvider', '$urlRouterProvider', function HomeCondif($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/home');

		$stateProvider.state('home', {
			url: '/home',
			views: {
				panel: {
					templateUrl: "partials/home.template.html"
				}
			}
		});

	}]);