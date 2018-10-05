var railmap = L.map('map').setView([41.344161, 2.098366], 13);
/*
MAP BACKGROUND
*/

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoia2l0dHVzIiwiYSI6ImNqbXdsMzlwMTM5MDEzcG54bXdrM281anoifQ.bm1LajQFRW9BGEe2iq8kYQ'
}).addTo(railmap);

/*
STOPS
*/

/*
TRAINRAILS
*/
var polyline = L.polyline([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(railmap);

var decorator = L.polylineDecorator(polyline, {
    patterns: [
        // defines a pattern of 10px-wide dashes, repeated every 20px on the line
        {offset: 0, repeat: 20, symbol: L.Symbol.dash({pixelSize: 10})}
    ]
}).addTo(railmap);

/*
TRAINS
*/
