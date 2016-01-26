require('angular');

var _ = require('lodash');

module.exports = angular.module('mapping-service-module', [])
	.service('MappingService', ['$http', '$interval', '$window', '$q', function MappingService($http, $interval, $window, $q) {
		var svc = this,
			_geocodeList = [],
			_map, _heatmap, _breakdownMarker,
			_geocoder = new google.maps.Geocoder();
			_pointArray = new google.maps.MVCArray([]),


		_.extend(svc, {
			data: function dataAcessor() {
				return _pointArray;
			},
			map: function mapAcessor(val) {
				return arguments.length ? _map = val : _map;
			},
			breakDownMarker: function breakdownMarkerAcessor(val) {
				return arguments.length ? _breakdownMarker = val : _breakdownMarker;
			},
			heatmap: function heatmapAcessor(val) {
				if (arguments.length) {
					_heatmap = val
					_heatmap.setMap(_map);
				}

				return _heatmap;
			},
			geocodeList : function() {
				return _geocodeList;
			},
			geocode : function (latLng) {
				var deferred = $q.defer();
				_geocoder.geocode({latLng : latLng}, function (results, status) {
					if (status==='OK') {
						_.forEach(results,function(item) {
								var text=[];
								var marker , line;
							_.forEach(item.address_components,function (a) {
								 text.push(a.long_name + '('+a.types.join()+')');
								});
							text.push('locationType : '+item.geometry.location_type);
						line = new google.maps.Polyline({path:[{lat:latLng.lat(), lng:latLng.lng()},
					{lat:item.geometry.location.lat(), lng:item.geometry.location.lng()}],
					map:_map,
					geodesic : true,
					strokeColor : '#FF0000',
					strokeOpacity : 1.0,
					strockWeight: 1});

	text.push('types : '+item.types.join());
							console.log(text.join());
							marker = new google.maps.Marker({
          map: _map,
					title : text.join(),
          position: item.geometry.location,
					icon : 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld='+_geocodeList.length+'|FF0000|000000'
        });
											_geocodeList.push({text : _geocodeList.length + '-'+text.join(),
																	marker : marker,
															line : line});
						});
						deferred.resolve(_geocodeList);
					}
				});
				return deferred.promise;
			},
			removePOI: function removePOI() {
				_map.data.forEach(function(feature) {
					_map.data.remove(feature);

				});
			},
			setCenter: function setCenter(latLng) {
				_map.setCenter(_offsetCenter(latLng, 0 - $window.innerWidth / 4));
			},
			getCenter: function getCenter() {
				return _offsetCenter(_map.getCenter(), $window.innerWidth / 4);
			}
		})
	}]);
