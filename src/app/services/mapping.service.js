require('angular');

var _ = require('lodash');

module.exports = angular.module('mapping-service-module', [])
	.service('MappingService', ['$http', '$interval', '$window', function MappingService($http, $interval, $window) {
		var svc = this,
			_map, _heatmap, _breakdownMarker,
			_url = 'https://api.twitter.com/1.1/search/tweets.json',
			_query = '?q=breakdown&result_type=mixed&count=100&geocode=53.711231,-3.680420,500mi',
			_pointArray = new google.maps.MVCArray([]),
			_offsetCenter = function offsetCenter(latlng, offsetx) {
				var scale = Math.pow(2, _map.getZoom()),
					nw = new google.maps.LatLng(
						_map.getBounds().getNorthEast().lat(),
						_map.getBounds().getSouthWest().lng()
					),
					worldCoordinateCenter = _map.getProjection().fromLatLngToPoint(latlng),
					pixelOffset = new google.maps.Point((offsetx / scale) || 0, (0 / scale) || 0),
					worldCoordinateNewCenter = new google.maps.Point(
						worldCoordinateCenter.x - pixelOffset.x,
						worldCoordinateCenter.y + pixelOffset.y
					);

				return _map.getProjection().fromPointToLatLng(worldCoordinateNewCenter);
			};

				/*$http.post('/obsidian/rest-api/london.php', {
				    url: _url,
				    query: _query
				}).success(function (data) {
				    _.forEach(data.statuses, function (n, i) {
				        var geo;

				        if (n.geo) {
				            geo = n.geo.coordinates;
				            _pointArray.push(new google.maps.LatLng(geo[0], geo[1]));
				        }
				    });
				});*/
	



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
			getAAPoi: function getAAPoi() {
				// remove pre-existing poi for house-keeping purposes
				_map.data.forEach(function(feature) {
					_map.data.remove(feature);

				});

				$http.post('/obsidian/rest-api/locations.php', {
					lat1: _map.getBounds().getNorthEast().lat(),
					lon1: _map.getBounds().getNorthEast().lng(),

					lat2: _map.getBounds().getSouthWest().lat(),
					lon2: _map.getBounds().getSouthWest().lng(),
				}).then(function(data) {
					var poi = data.data.data;

					// convert to geoJSON
					// TODO: move this to the server
					_.forEach(poi, function(n, i) {
						n.type = 'Feature';
						n.geometry = {
							type: 'Point',
							coordinates: [n.coordinate.longitude, n.coordinate.latitude]
						};

						n.properties = {
							poiDetails: n.poiDetails,
							address: n.address
						}

						delete n.poiDetails;
						delete n.address;
						delete n.coordinate;
					});

					_map.data.addGeoJson({
						type: "FeatureCollection",
						features: poi
					});

					_map.data.setStyle(function(feature) {
						return {
							icon: {
								path: 'M317.7,420.6l-19.8-18.4l-20.4,19l3.9-3.6v22.8h32.5V417L317.7,420.6z',
								fillColor: '#202226',
								fillOpacity: 0.8,
								scale: 1,
								strokeColor: '#202226',
								strokeWeight: 1,
								scale: 0.5,
								anchor: new google.maps.Point(10, 10)
							}
						};
					});
				});
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