require('angular');

var _ = require('lodash');

module.exports = angular.module('geocoder-service-module', [])
	.service('GeocoderService', ['$q', function GeocoderService($q) {
		var svc = this,
			_geocoder = new google.maps.Geocoder(),
			_geocodeList = [];

		_.extend(svc, {
			data: function () {
				return _geocodeList;
			},
			reset: function () {
				_geocodeList = [];
			},
			search: function searchMethod(map, latLng) {
				var deferred = $q.defer();

				_geocoder.geocode({
					latLng: latLng
				}, function (results, status) {
					var text = [],
						marker,
						line;

					if (status === 'OK') {
						_.forEach(results, function (item) {
							text = []; // reset text ..
							// build text ..							
							_.forEach(item.address_components, function (a) {
								text.push(a.long_name + '(' + a.types.join() + ')');
							});
							text.push('locationType : ' + item.geometry.location_type);
							text.push('types : ' + item.types.join());

							// draw line between marker and gocode result .. 
							line = new google.maps.Polyline({
								path: [{
									lat: latLng.lat(),
									lng: latLng.lng()
								}, {
									lat: item.geometry.location.lat(),
									lng: item.geometry.location.lng()
								}],
								map: map,
								geodesic: true,
								strokeColor: '#FF0000',
								strokeOpacity: 1.0,
								strockWeight: 1
							});
							// draw marker
							marker = new google.maps.Marker({
								map: map,
								title: text.join(),
								position: item.geometry.location,
								icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + _geocodeList.length + '|FF0000|000000'
							});
							// add it to the list ..
							_geocodeList.push({
								text: _geocodeList.length + '-' + text.join(),
								marker: marker,
								line: line
							});
						});
						deferred.resolve(_geocodeList);
					}
				});

				return deferred.promise;
			}
		});
	}]);