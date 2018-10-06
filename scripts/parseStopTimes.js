var csv = require("fast-csv");
var Heap = require('heap');
const fs = require('fs');

var stops = {};
function readStops() {

    function stops_to_obj(data) {
        var data_obj = {};
        data_obj.stop_id = data[0];
        data_obj.stop_code = data[1];
        data_obj.stop_name = data[2];
        data_obj.stop_lat = data[3];
        data_obj.stop_lon = data[4];
        data_obj.stop_url = data[5];
        data_obj.location_type = data[6];
        data_obj.parent_station = data[7];
        data_obj.wheelchair_boarding = data[8];

        return data_obj;
    }

    csv.fromPath("./../documentation/organitzation/GTFSs/GTFS_TMB_actualitzats/stops.txt")
    .on("data", function(data){
        var data_obj = stops_to_obj(data);
        stops[data_obj.stop_id] = data_obj;
    })
    .on("end", function(){
        readFrequencies();
    });
}

var freqs = {};
function readFrequencies() {

    function freq_to_obj(data) {
        var data_obj = {};
        data_obj.trip_id = data[0];
        data_obj.start_time = data[1];
        data_obj.end_time = data[2];
        data_obj.headway_secs = data[3];

        return data_obj;
    }

    csv.fromPath("./../documentation/organitzation/GTFSs/GTFS_TMB_actualitzats/frequencies.txt")
    .on("data", function(data){
        var data_obj = freq_to_obj(data);

        if(!(data_obj.trip_id in freqs)) {
            freqs[data_obj.trip_id] = [];
        }

        var to_push = {}
        to_push[data_obj.start_time] = data_obj.headway_secs;

        freqs[data_obj.trip_id].push(to_push);
    })
    .on("end", function(){
        readTrips();
    });
}

var trips = {};
function readTrips() {

    function trips_to_obj(data) {
        var data_obj = {};
        data_obj.route_id = data[0];
        data_obj.service_id = data[1];
        data_obj.trip_id = data[2];
        data_obj.direction_id = data[3];
        data_obj.shape_id = data[4];
        data_obj.wheelchair_accessible = data[5];

        return data_obj;
    }

    csv.fromPath("./../documentation/organitzation/GTFSs/GTFS_TMB_actualitzats/trips.txt")
    .on("data", function(data){
        var data_obj = trips_to_obj(data);
        trips[data_obj.trip_id] = data_obj;
    })
    .on("end", function(){
        read_TMB_stop_times();
    });
}

var routes = {};
function read_TMB_stop_times() {

    var aux = {};

    function stop_times_to_obj(data) {
        var data_obj = {};
        data_obj.trip_id = data[0];
        data_obj.arrival_time = data[1];
        data_obj.departure_time = data[2];
        data_obj.stop_id = data[3];
        data_obj.stop_sequence = data[4];

        return data_obj;
    }

    csv.fromPath("./../documentation/organitzation/GTFSs/GTFS_TMB_actualitzats/stop_times.txt")
    .on("data", function(data){

        var data_obj = stop_times_to_obj(data);
        data_obj.route_id = trips[data_obj.trip_id].route_id;

        //if it's not a metro ignore it
        if(data_obj.route_id.charAt(0) != '1' || data_obj.route_id == "undefined") {
            return;
        }

        // add coords
        data_obj = {...data_obj, ...stops[data_obj.stop_id]};
        
        if(!(data_obj.trip_id in aux)) {

            var internalHeap = new Heap(function(a, b) {
                return a.stop_sequence - b.stop_sequence;
            });

            aux[data_obj.trip_id] = internalHeap;
        }

        aux[data_obj.trip_id].push(data_obj);
    })
    .on("end", function(){
        for(var i in aux) {
            var next = aux[i];
            var route_id = next.peek().route_id;
            if(!(route_id in routes)) {
                routes[route_id] = {};
                routes[route_id].stops = next.toArray();
                routes[route_id].freq = freqs[next.peek().trip_id];
            }

        }

        const content = JSON.stringify(routes);

        fs.writeFile("./../public/data/stops/routes.json", content, 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
        }); 
        
    });

}

readStops();