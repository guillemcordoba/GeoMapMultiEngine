
var railmap = L.map('map').setView([41.356360, 2.103296], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.light',
    accessToken: 'pk.eyJ1Ijoia2l0dHVzIiwiYSI6ImNqbXdsMzlwMTM5MDEzcG54bXdrM281anoifQ.bm1LajQFRW9BGEe2iq8kYQ'
}).addTo(railmap);


/**
 * STOPS
 */
var stopIcon = L.icon({
    iconUrl: 'img/stop.png',

     iconSize:     [12, 12], // size of the icon
/*    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
 */});

function paintStops(filePath) {
    loadJSON(filePath, function(stops) {
        Object.keys(stops).forEach(stop => {
            L.marker([stops[stop].stop_lat, stops[stop].stop_lon], {icon: stopIcon}).addTo(railmap);
        });
    });
}


paintStops('data/stops/fgc.json');
paintStops('data/stops/rodalies.json');
paintStops('data/stops/tmb.json');
paintStops('data/stops/tram.json');
paintStops('data/stops/tram1.json');

/*
TRAINRAILS
*/

function anglePoints(p1, p2){
    proj1 = railmap.project(p1);
    proj2 = railmap.project(p2);

    return - Math.atan2(proj2.y-proj1.y, proj2.x-proj1.x) * 180 / Math.PI;
}

var routes = getRoutes();
var polylines = []

for (route in routes){
    var stopsList = routes[route]['stops'];
    var coords = []

    for (stop of stopsList){
        latlong = [stop["stop_lat"], stop["stop_lon"]];
        coords.push(latlong);

        L.marker(latlong, {icon: stopIcon}).bindTooltip(stop['stop_name'],
            { permanent: true, direction: 'top', opacity: 0.6}).addTo(railmap);

    }

    polylines.push (L.polyline(coords,{color: 'black'}).addTo(railmap));
}

var decorator = L.polylineDecorator(polylines, {
    patterns: [
            {offset: 10, endOffset: 10, repeat: 10,
                symbol: L.Symbol.arrowHead({pixelSize: 6, headAngle: 160, pathOptions: {color: 'black', fillOpacity: 1, weight: 0}})}
    ]
}).addTo(railmap);

/*
TRAINS
*/


function loadJSON(filePath, success, error) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function()
	{
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				if (success)
					success(JSON.parse(xhr.responseText));
		} else {
			if (error)
				error(xhr);
			}
		}
	};
	xhr.open("GET", filePath, true);
	xhr.send();
}


/*
Return dynamic information
*/


loadRouteData('data/stops/routes.json')

wagons = []
routes = {}
function loadRouteData(filePath) {
  loadJSON(filePath, function(file) {
    for (route in file) {
      console.log("Parsing route :" + route);
    }
    routes = file
  });
}


var seconds_from_midnight = 8 * 60 * 60;
function  getTime() {
  return seconds_from_midnight
}

function addTime(time_to_add) {
  var next_time = seconds_from_midnight + time_to_add
  for (route of routes)
  {

  }
}



function getRoutes(){
  return routes
}


function getWagons() {
  return
    [{
      "start": "1.41.1",
      "end":  "1.41.1",
      "route": "route1",
      "time_to_arrive": 5,
      "total_time": 10
    }
    ]
}
