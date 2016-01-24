require('angular');
var _ = require('lodash');

module.exports = angular.module('info-panel-controller-module', [
	require('../../services/roads.service').name,
]).controller('infoPanelController', ['RoadsService', function(RoadsService) {
	var ctrl = this,
		_motorwayObj = null,
		_road = '',
		_recordTypeObj = '',
		_locationTypeObj = '';

	_.extend(ctrl, {
		isOpen: function() {
			return true;
		},
		motorways: function() {
			return RoadsService.motorways();
		},
		aroads: function() {
			return RoadsService.aroads();
		},
		motorwayObj: function(val) {
			if (arguments.length) {
				RoadsService.loadRoad(val).then(function(dataSet) {
					console.log(dataSet.length);
				});
			}
			return arguments.length ? _motorwayObj = val : _motorwayObj;
		},
		refData: function() {
			return RoadsService.refData();
		},
		roadObj: function(val) {
			if (arguments.length) {
				RoadsService.loadRoad(val).then(function(dataSet) {
					console.log(dataSet.length);
				});
			}
			return arguments.length ? _road = val : _road;
		},
		locationType : function(val) {
			return arguments.length ? _locationTypeObj = val : _locationTypeObj;
		},
		recordTypeObj : function(val) {
			return arguments.length ? _recordTypeObj = val : _recordTypeObj;
		},
		modelOptions: {
			getterSetter: true
		},
	});
}]);