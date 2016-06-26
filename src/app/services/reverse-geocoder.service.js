require('angular');

var _=require('lodash');

module.exports = angular.module('reverse-geocoder-service-module',[
	])
	.service('ReverseGeocoderService',['$q', function($q) {

		var svc = this,
		 geocoder = new google.maps.Geocoder;

		_.extend(svc, {
			search: function (latlng) {
				var deferred = $q.defer();

				geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {
            	deferred.resolve(results[0]);
            } else {
            	deferred.resolve(null);
            }
          } else {
          	deferred.reject(status);
          }
        });
				return deferred.promise;
			}
		});
	}]);