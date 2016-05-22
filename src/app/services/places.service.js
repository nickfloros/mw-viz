require('angular');

var _ = require('lodash');

module.exports = angular.module('places-service-module', [])
	.service('PlacesService', [function PlacesService() {
		var _svc = this,
			_places = [],
			_placesSearch = null,
			_selectedPlace = null,
			_googlePlacesSearch = null,
			_infoWindow = new google.maps.InfoWindow(),
			googlePlacesService = function googlePlacesService(map) {
				if (_googlePlacesSearch === null) {
					_googlePlacesSearch = new google.maps.places.PlacesService(map);
				}
				return _googlePlacesSearch;
			};

		_.extend(_svc, {
			search: function searchMethod(map, latLng, radius) {
				googlePlacesService(map).nearbySearch({
					location: latLng,
					radius: radius
				}, function onNearbySearch(results, status) {
					var marker;
					// store results in the local array
					if (status === google.maps.places.PlacesServiceStatus.OK) {
						_.forEach(results, function placeResults(place) {

							// create google marker
							marker = new google.maps.Marker({
								map: map,
								position: place.geometry.location,
								animation: google.maps.Animation.DROP,
								draggable: true
							});

							// add event listener pop info window ..
							google.maps.event.addListener(marker, 'click', function (eventDetails) {
								_infoWindow.setContent(place.name);
								_infoWindow.open(map, this);
								_selectedPlace = place;
							});

							google.maps.event.addListener(marker, 'dragend', function (eventDetails) {
								place.geometry.location.lat(eventDetails.latLng.lat());
								place.geometry.location.lng(eventDetails.latLng.lng());
							});

							google.maps.events.addListener(marker, 'dragstart', function (eventDetails) {

							});
							_places.push(place);
						});
					}

				});
			},

			selectedPlace: function selectedPlaceAccessor() {
				return _selectedPlace;
			},
			movePlace: function movePlace(latLng) {
				if (_selectedPlace !== null) {
					_selectedPlace.geometry.location = latLng;
				}
			},
			reset: function () {
				_places = [];
			},
		});
	}]);