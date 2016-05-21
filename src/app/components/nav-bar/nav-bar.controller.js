require('angular');
var _ = require('lodash');

module.exports = angular.module('nav-panel-controller-module', [
	require('../../services/mapping.service.js').name
	]).controller('navBarController',['MappingService', function(MappingSerivce){

		var ctrl = this,
			_dataSet,
			_dataSets = ['Marker posts', 'SOS Boxes', 'Junctions', 'Service Stations'];

		_.extend(ctrl,{
			clearMap : function() {
				MappingSerivce.reset();
			},
			dataSet : function (val) {
				if (arguments.length) {
					_dataSet = val;
					console.log(val);
				}
				return arguments.length? _dataSet = val : _dataSet;
			},
			options : function() {
				return _dataSets;
			},
			isSelected : function (option) {
				return _dataSet === option;
			},
			modelOptions : {
				getterSetter: true
			}
		});
	}]);