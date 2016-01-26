var request = require('request');

var payload = 'data=[out:json][timeout:25];\n'+
' ( \n'+
'     node["highway"](45.51918804671559,-122.68177270889282,45.52577288399817,-122.67352223396301);\n'+
'     way["highway"](45.51918804671559,-122.68177270889282,45.52577288399817,-122.67352223396301);\n'+
'     relation["highway"](45.51918804671559,-122.68177270889282,45.52577288399817,-122.67352223396301);\n'+
' );\n'+
' out body;\n'+
' >;\n'+
' out skel qt;\n';
console.log(payload);
var params = {
url:'http://overpass-api.de/api/interpreter',
method:'POST',
body : payload
};

request.post(params,function(error, response, body) {
console.log(JSON.parse(body));
});

