require('angular');

var _=require('lodash');  

module.exports=angular.module('roads-service-module',[])
	.service('RoadsService',['$http', function($http) {
		var _svc = this,
			_motorways = [],
			_aroads = [],
			_roadMarkers = []	,
			_refData = {
				locationTypes : [],
				recordTypes : []
			};

		$http.get('/api/dangerousRoads')
			.then(function (dataSet) {
				_.forEach(dataSet.data, function (item){
					if (item.motorway) {
						_motorways.push(item);
					}
					else {
						_aroads.push(item);
					}
				});
			});

		$http.get('/api/refData/roads').then(function(resp) {
			_refData.locationTypes= resp.data.locationTypes;
			_refData.recordTypes = resp.data.recordTypes;
		});

		_.extend(_svc, {
			motorways : function() {
				return _motorways;
			},
			aroads : function() {
				return _aroads;
			},
			refData : function() {
				return _refData;
			},
			loadRoad : function(road) {
				console.log('searching for road ...',road.roadName);

				return $http.get('/api/road/' + road.roadName)
					.then(function (dataSet) {
						_roadMarkers = dataSet.data;
						_.forEach(_roadMarkers, function() {

						})
						return _roadMarkers;
					});
			}
		});
	}]);
