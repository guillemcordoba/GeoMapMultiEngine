var railmap = L.map('map').setView([41.356360, 2.103296], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.light',
    accessToken: 'pk.eyJ1Ijoia2l0dHVzIiwiYSI6ImNqbXdsMzlwMTM5MDEzcG54bXdrM281anoifQ.bm1LajQFRW9BGEe2iq8kYQ'
}).addTo(railmap);

var lastZoom;
var tooltipThreshold = 15;

railmap.on('zoomend', function() {
    var zoom = railmap.getZoom();
    if (zoom < tooltipThreshold && (!lastZoom || lastZoom >= tooltipThreshold)) {
        railmap.eachLayer(function(l) {
            if (l.getTooltip()) {
                var tooltip = l.getTooltip();
                l.unbindTooltip().bindTooltip(tooltip, {
                    permanent: false
                })
            }
        })
    } else if (zoom >= tooltipThreshold && (!lastZoom || lastZoom < tooltipThreshold)) {
        railmap.eachLayer(function(l) {
            if (l.getTooltip()) {
                var tooltip = l.getTooltip();
                l.unbindTooltip().bindTooltip(tooltip, {
                    permanent: true
                })
            }
        });
    }
    lastZoom = zoom;
})

/**
 * STOPS
 */
var stopIcon = L.icon({
    iconUrl: 'img/stop.png',
    iconSize:     [12, 12]
});


window.wagons = []
routes = {}

loadRouteData('data/stops/routesTMB.json')

function loadRouteData(filePath) {
  loadJSON(filePath, function(file) {
    for (route in file) {
      console.log("Parsing route :" + route);
    }
    routes = file
    drawElements();
     setInterval(function(){
       addTime(2)
       reDrawTrains()
     }, 100);

  });
}

/*
TRAINRAILS
*/

function drawElements(){
    polylines = {}
    decorators = {}

    for (route in routes){
        var stopsList = routes[route]['stops'];
        var coords = []

        for (stop of stopsList){
            latlong = [stop["stop_lat"], stop["stop_lon"]];
            coords.push(latlong);

            marker = L.marker(latlong, {icon: stopIcon}).addTo(railmap);
            (railmap.getZoom() >= tooltipThreshold
                ? marker.bindTooltip(stop["stop_name"], {permanent:true, direction: "top"})
                : marker.bindTooltip(stop["stop_name"], {permanent:false, direction: "top"})
            );
        }

        polylines[route] = L.polyline(coords,{color: 'black'}).addTo(railmap);
        decorators[route] = L.polylineDecorator(polylines[route], {
        patterns: [
                {offset: 10, endOffset: 10, repeat: 10,
                    symbol: L.Symbol.arrowHead({pixelSize: 6, headAngle: 160, pathOptions: {color: 'black', fillOpacity: 1, weight: 0}})}
        ],
        }).addTo(railmap);
    }
}

function changeColor(route, color){
    for (var r in routes) {
      var c = "000000"

      if (r == route){
        c = color;
      }

      // console.log(c, r);

      polylines[r].setStyle({
          color: '#' + c
      });
      decorators[r].setPatterns([
              {offset: 10, endOffset: 10, repeat: 10,
                  symbol: L.Symbol.arrowHead({pixelSize: 6, headAngle: 160, pathOptions: {color: '#' + c, fillOpacity: 1, weight: 0}})}
      ]);
    }
}

function anglePoints(p1, p2){
    proj1 = railmap.project(p1);
    proj2 = railmap.project(p2);

    return - Math.atan2(proj2.y-proj1.y, proj2.x-proj1.x) * 180 / Math.PI;
}

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


function weightedMean(pos1, pos2, weight) {
  if (weight>1) weight = 1
  if (weight<0) weight = 0
  return [pos1[0] * (weight) + pos2[0] * (1-weight),
          pos1[1] * (weight) + pos2[1] * (1-weight)];

}

function reDrawTrains() {
  getWagons()
  for(var wagon of window.wagons){
    if (wagon.marker){
      var start = wagon.route.stops[wagon.current_station]
      var end = wagon.route.stops[wagon.current_station+1]
      wagon.marker.setLatLng(
        weightedMean([start.stop_lat,start.stop_lon],
         [end.stop_lat,end.stop_lon],wagon.time_to_arrive/wagon.total_time))
         wagon.marker.setRotationAngle(anglePoints([start.stop_lon, start.stop_lat], [end.stop_lon, end.stop_lat])- 90);

      wagon.marker.wagon = wagon;


    } else
    {
      var greenIcon = L.icon({
      iconUrl: 'img/trains/'+wagon.route.route_short_name +'.png',
      iconSize:     [40, 20], // size of the icon
      iconAnchor:   [20, 10], // point of the icon which will correspond to marker's location
      popupAnchor:  [0, 15] // point from which the popup should open relative to the iconAnchor
      });

      var start = wagon.route.stops[wagon.current_station]
      var end = wagon.route.stops[wagon.current_station+1]

      wagon.marker = L.marker(weightedMean([start.stop_lat,start.stop_lon],
       [end.stop_lat,end.stop_lon],wagon.time_to_arrive/wagon.total_time)
       , {icon: greenIcon}).addTo(railmap);

      wagon.marker.on('click', function(){
        console.log(this.wagon.route.route_color)
        changeColor(this.wagon.route.route_id, this.wagon.route.route_color);
      })

       wagon.marker.setRotationAngle(anglePoints([start.stop_lon, start.stop_lat], [end.stop_lon, end.stop_lat])- 90);
  //     wagon.marker._icon.style.transform="rotate(45deg);"
    }
  }

}
/*
Return dynamic information
*/


var seconds_from_midnight = 6 * 60 * 60;
function  getTime() {
  return seconds_from_midnight
}


function hour_to_seconds(hour) {
  var hours = parseInt(hour[0])*10+ parseInt(hour[1]);
  var minutes = parseInt(hour[3])*10+ parseInt(hour[4]);
  var seconds = parseInt(hour[6])*10+ parseInt(hour[7]);
  return seconds + 60 * minutes + hours * 3600;
}

function addTime(time_to_add) {
  var next_time = seconds_from_midnight + time_to_add
  for (routeKey in routes)
  {
    var route = routes[routeKey]
    var freq = 0
    for (var time in route.freq) {
      if (hour_to_seconds(time) < seconds_from_midnight){
        freq = route.freq[time]
      }
    }
    for(var now=seconds_from_midnight; now<=next_time; ++now)
    {
      if (now%freq == 0 )
      {
        window.wagons.push({
          "route": route,
          "spawned_time" : now,
          "current_station": 0
        })
      }
    }
  }
  seconds_from_midnight = seconds_from_midnight + time_to_add
}



function getRoutes(){
  return routes
}


function getWagons() {
  for(var wagonKey in window.wagons){
    var wagon = window.wagons[wagonKey];
    var arrival_time = hour_to_seconds(wagon.route.stops[wagon.current_station+1].arrival_time)
      + wagon.spawned_time;

    while(wagon.current_station + 2 < wagon.route.stops.length && arrival_time < seconds_from_midnight){
        wagon.current_station = wagon.current_station+1
        arrival_time = hour_to_seconds(wagon.route.stops[wagon.current_station+1].arrival_time)
          + wagon.spawned_time;
       }
   if (wagon.current_station + 2 >= wagon.route.stops.length){
     wagon.marker.remove()
     window.wagons.splice(wagonKey,1)
   } else {
     wagon.time_to_arrive = arrival_time - seconds_from_midnight;
     var departure_time = hour_to_seconds(wagon.route.stops[wagon.current_station].departure_time)
       + wagon.spawned_time;
     wagon.total_time = arrival_time - departure_time;
   }
  }

  return window.wagons
}
