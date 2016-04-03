require('angular');
var _ = require('lodash');

module.exports = angular.module('nav-panel-controller-module', [
	require('../../services/mapping.service.js').name
	], function (['MappingService', function(MappingSerivce){

		var ctrl = this;

		_.extend(ctrl,{
			clearMap : function() {
				MappingSerivce.reset();
			}
		});
	}]));