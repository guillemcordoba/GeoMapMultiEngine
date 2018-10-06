
var railmap = L.map('map').setView([41.356360, 2.103296], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.light',
    accessToken: 'pk.eyJ1Ijoia2l0dHVzIiwiYSI6ImNqbXdsMzlwMTM5MDEzcG54bXdrM281anoifQ.bm1LajQFRW9BGEe2iq8kYQ'
}).addTo(railmap);

var coords = [
    [41.377152, 2.111032],
    [41.384540, 2.112160],
    [41.388259, 2.127338],
    [41.392541, 2.144408]
    ];

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
var polyline = L.polyline(
    coords,
    {color: 'black'}).addTo(railmap);

var decorator = L.polylineDecorator(polyline, {
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


function getRoutes(){
  return
  {
    "route1" :
    {
      "stops" :
      [
        {
          "stop_id": "1.41.1",
          "trip_id" : "1.41.1",
          "arrival_time" : "00:00:00",
          "departure_time" : "00:00:35"
          "stop_lat": "41.377152",
          "stop_lon": "2.111032",
          "stop_name": "Hospital de Bellvitge"
        },
        {
          "stop_id": "1.41.1",
          "trip_id" : "1.41.1",
          "arrival_time" : "00:00:00",
          "departure_time" : "00:00:35"
          "stop_lat": "41.384540",
          "stop_lon": "2.112160",
          "stop_name": "Hospital de Bellvitge"
        },
        {
          "stop_id": "1.41.1",
          "trip_id" : "1.41.1",
          "arrival_time" : "00:00:00",
          "departure_time" : "00:00:35"
          "stop_lat": "41.388259",
          "stop_lon": "2.127338",
          "stop_name": "Hospital de Bellvitge"
        },
        {
          "stop_id": "1.41.1",
          "trip_id" : "1.41.1",
          "arrival_time" : "00:00:00",
          "departure_time" : "00:00:35"
          "stop_lat": "41.392541",
          "stop_lon": "2.144408",
          "stop_name": "Hospital de Bellvitge"
        }
      ]
    }
  };

}
