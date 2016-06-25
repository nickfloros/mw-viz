module.exports = function RoutePoint(lat, lng) {
	this.raw = {
		lat: null,
		lng: null
	};
	this.geocode = {
		lat: null,
		lng: null,
		desc: null
	};
};