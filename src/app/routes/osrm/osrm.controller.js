require('angular');

var _ = require('lodash');

module.exports = angular.module('osrm-controller-module', [
		require('../../services/mapping.service').name
	])
	.controller('osrmController', ['MappingService', function (MappingService) {
		var ctrl = this,
			_toggleBoundingBox = 0;

		_.extend(ctrl, {
			toggleBoundingBox: function boundingBoxAccessor(val) {
				if (arguments.length) {
					if (val) {
						MappingService.boundingBox().enable(MappingService.map());
					} else {
						MappingService.boundingBox().dissable();
					}
				}
				return arguments.length ? _toggleBoundingBox = val : _toggleBoundingBox;
			},
			modelOptions: {
				getterSetter: true
			}
		});
	}]);