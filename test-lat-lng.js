var LatLon = require('geodesy').LatLonSpherical;

var point = new LatLon(52.12121, -1.23);

var to = point.destinationPoint(500,45.0);
var to2 = point.destinationPoint(500,-45.0);
var to3 = point.destinationPoint(500,180.0-45.0);
var to4 = point.destinationPoint(500,45.0-180.0);

console.log(to.lat, to.lon);
console.log(to2.lat, to2.lon); 
console.log(to3.lat, to3.lon);
console.log(to4.lat, to4.lon);

