require('angular');

var _ = require('lodash');

module.exports = angular.module('osrm-controller-module', [
		require('../../services/mapping.service').name,
		require('../../services/osrm.service').name,
	])
	.controller('osrmController', ['MappingService', 'OSRMService', function (MappingService, OSRNService) {
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
			boundingBox : function() {
				return MappingService.boundingBox().bounds();
			},
			modelOptions: {
				getterSetter: true
			}
		});
	}]);