require('angular');

var _ = require('lodash');

module.exports = angular.module('osrm-controller-module', [
		require('../../services/mapping.service').name,
		require('../../services/osrm.service').name,
		require('../../services/highway-agency.service').name,
	])
	.controller('osrmController', ['MappingService', 'OSRMService', 'HighwayAgencyService', function (MappingService, OSMService, HighwayAgencyService) {
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
			getOSRM: function () {
				return OSMService.road('M271') // just work with m271
					.then(function (outcome) {
						if (outcome) { // we have something we need now to render 

							MappingService.clean();
							_.forEach(OSMService.ways(), function (way) {
								MappingService.osmWay(way.path);
							});

							_.forEach(OSMService.junctions(), function (junction) {
								MappingService.osmJunction(junction);
							});

							MappingService.fitBounds(OSMService.boundingBox());
							MappingService.setMapBounds();
						}
					})
			},
			getHAData: function () {
				HighwayAgencyService.box(OSMService.boundingBox())
					.then(function (data) {

					});
			},
			boundingBox: function () {
				return MappingService.boundingBox();
			},
			modelOptions: {
				getterSetter: true
			}
		});
	}]);