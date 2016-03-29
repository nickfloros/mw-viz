var _ = require('lodash');
require('angular');

module.exports = angular.module('link-route-module', [])
	.config(['$stateProvider', function HomeCondif($stateProvider) {

		$stateProvider.state('link', {
			url: '/link',
			views: {
				panel: {
					templateUrl: "partials/link.template.html"
				}
			}
		});

	}]);