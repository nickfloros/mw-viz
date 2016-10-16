require('angular');

var _ = require('lodash');

module.exports = angular.module('highway-agency-service-module', [])
	.service('HighwayAgencyService', ['$http', function HighwayAgencyService($http) {
		var svc = this,
			data = null;

		_.extend(svc, {
			box: function box(boundingBox) {
				return $http.post('/api/ha/box',
						boundingBox)
					.then(function (resp) {
						return resp.data;
					});
			}
		})
	}]);