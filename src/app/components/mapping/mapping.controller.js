require('angular');
var _ = require('lodash');

module.exports = angular.module('mapping-controller', [
		require('../../services/mapping.service').name
	])
	.controller('MappingController', ['MappingService', '$scope', function(MappingService, $scope) {
		var ctrl = this,
			_editableLocation = false,
			mapOptions = {
				zoom: 6,
				center: new google.maps.LatLng(53.881463, -4.196777),
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				disableDefaultUI: true
			};

		MappingService.map(new google.maps.Map(document.getElementById('gmap'), mapOptions));

		_.extend(ctrl, {});
	}]);