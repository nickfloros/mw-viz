require('angular');

var _=require('lodash');

module.exports = angular.module('places-service-module',[])
	.service('PlacesService',[function PlacesService() {
		var _svc = this,
			_places = [],
			_selectedPlace = null;
			_infoWindow = new google.maps.InfoWindow();

		_.extend(_svc, {
				search : function searchMethod(map, latLng, radius) {
					_placesSearch.nearbySearch( {
						location: latLng,
						radius : radius
					}, function onNearbySearch(results, status) {
						var marker;
						// store results in the local array
						if (status === google.maps.places.PlacesServiceStatus.OK) {
							_.forEach( results, function placeResults(place) {

								// create google marker
								marker = new google.maps.Marker({
									map: map, 
									position : place.geometry.location,
									animation: google.maps.Animation.DROP,
									draggable: true
								});

								// add event listener pop info window ..
								google.maps.event.addListener(marker, 'click', function (eventDetails) {
									_infoWindow.setContent(place.name) ;
									_infoWindow.open(map, this);
									_selectedPlace = place;
								});

								google.maps.event.addListener(marker,'dragend', function (eventDetails) {
									console.log('moving marker ..');

								});

								_places.push(place);
							});
						}

					});
				},

				selectedPlace : function selectedPlaceAccessor() {
					return _selectedPlace;
				},
				movePlace: function movePlace(latLng) {
					if (_selectedPlace!==null) {
						_selectedPlace.geometry.location = latLng;
					}
				},
				reset : function () {
					_places = [];
				},
			});
	}]);