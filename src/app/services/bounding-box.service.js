require('angular');

var _ = require('lodash');

module.exports = angular.module('bounding-box-service-module', [])
	.service('BoundingBoxService', [function BoundingBoxService() {
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
				});
			},
			dissable: function dissableBoundingBox(map) {
				google.maps.event.removeListener(_rightClickEvent);
			},
			setPosition: function setPosition(map, latLng) {
				_rectangle.bounds.north = latLng.lat();
				_rectangle.bounds.south = latLng.lat();
				_rectangle.bounds.east = latLng.lng();
				_rectangle.bounds.west = latLng.lng();
				_eventListener = _rectangle.addListener('bounds_chnaged', function (eventDetails) {

				});
			},
			bounds: function bounds(val) {
				return arguments.length ? _bounds = bounds : _bounds;
			},
			freeze: function () {

			}
		});
	}]);