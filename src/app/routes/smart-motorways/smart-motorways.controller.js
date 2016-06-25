require('angular');

var _=require('lodash');

module.exports = angular.module('smart-motorway-controller.module',[
		require('../../services/mapping.service').name
	])
	.controller('smartMotorwaysController',['MappingService', function (MappingService){
		var ctrl = this;

		_.extend(ctrl, {

			modelOptions : {
				getterSetter : true
			}

		});

	}]);
