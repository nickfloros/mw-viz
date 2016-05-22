require('angular');

var _ = require('lodash');

module.exports = angular.module('bounding-box-service-module', [])
	.service('BoundingBoxService', ['$rootScope', function BoundingBoxService($rootScope) {
		var svc = this,
			_rightClickEvent = null,
			_eventListener = null,
			_bounds = {
				north: 0.0,
				south: 0.0,
				east: 0.0,
				west: 0.0
			},
			_rectangle = new google.maps.Rectangle({
				bounds: _bounds,
				editable: true,
				draggable: true
			});

		_.extend(svc, {
			enable: function enableBoundingBox(map) {
				_rightClickEvent = map.addListener('rightclick', function (event) {
					_bounds = {
						north: event.latLng.lat() - ((event.latLng.lat() - map.getBounds().getNorthEast().lat()) / 10.0),
						east: event.latLng.lng() - ((event.latLng.lng() - map.getBounds().getNorthEast().lng()) / 10.0),
						south: event.latLng.lat(),
						west: event.latLng.lng()
					};
					_rectangle.setBounds(_bounds);
					_rectangle.setMap(map);
					_eventListener = _rectangle.addListener('dragend', function (eventDetails) {
						_bounds.north = _rectangle.getBounds().getNorthEast().lat();
						_bounds.east = _rectangle.getBounds().getNorthEast().lng();
						_bounds.south = _rectangle.getBounds().getSouthWest().lat();
						_bounds.west = _rectangle.getBounds().getSouthWest().lng();
						// because geocode is outside angular's control
						if (!$rootScope.$$phase) {
							$rootScope.$apply();
						}
					});
				});
			},
			dissable: function dissableBoundingBox(map) {
				_rectangle.setDraggable(false);
				google.maps.event.removeListener(_rightClickEvent);
				_rightClickEvent=null;
				if (_eventListener) {
					google.maps.event.removeListener(_eventListener);
					_eventListener = null;
				}
			},
			setPosition: function setPosition(map, latLng) {
				_rectangle.bounds.north = latLng.lat();
				_rectangle.bounds.south = latLng.lat();
				_rectangle.bounds.east = latLng.lng();
				_rectangle.bounds.west = latLng.lng();

			},
			bounds: function bounds(val) {
				return arguments.length ? _bounds = bounds : _bounds;
			},
			freeze: function () {

			}
		});
	}]);