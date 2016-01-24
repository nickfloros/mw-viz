
require('angular');
var _=require('lodash');

module.exports = angular.module('info-panel-controller-module', []).controller('infoPanelController',  function() {
	var ctrl = this,
		_road='',
		_roads = [{name:'M271'}, {name:'M4'}];

	_.extend(ctrl, {
		isOpen: function() {return true;},
		roads : function() {
			return _roads;
		},
		roadObj : function(val) {
			arguments.length ? _road = val : _road;
		},
		modelOptions : {
			getterSetters : true
		},
	});
});