var csv = require("fast-csv");
var Heap = require('heap');
const fs = require('fs');

function generate(typeName, isTmb = false) {
    console.log("Generating " + typeName);

    var read_routes = {};
    function readRoutes() {

        function routes_to_obj(data) {
            var data_obj = {};
            data_obj.route_id = data[0];
            data_obj.route_short_name = data[1];
            data_obj.route_long_name = data[2];
            data_obj.route_type = data[3];
            data_obj.route_url = data[4];
            data_obj.route_color = data[5];
            data_obj.route_text_color = data[6];

            return data_obj;
        }

        csv.fromPath("./../documentation/organitzation/GTFSs/GTFS_"+ typeName +"/routes.txt", {headers: true})
        .on("data", function(data){
            var data_obj = routes_to_obj(data);
            read_routes[data_obj.route_id] = data_obj;
        })
        .on("end", function(){
            readStops();
        });
    }

    var stops = {};
    function readStops() {

        function stops_to_obj(data) {

            if(!Array.isArray(data)) return data;

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

        csv.fromPath("./../documentation/organitzation/GTFSs/GTFS_"+ typeName +"/stops.txt", {headers: true})
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

        if(!isTmb) {
            readTrips();
            return;
        }

        function freq_to_obj(data) {

            if(!Array.isArray(data)) return data;

            var data_obj = {};
            data_obj.trip_id = data[0];
            data_obj.start_time = data[1];
            data_obj.end_time = data[2];
            data_obj.headway_secs = data[3];

            return data_obj;
        }

        csv.fromPath("./../documentation/organitzation/GTFSs/GTFS_"+ typeName +"/frequencies.txt", {headers: true})
        .on("data", function(data){
            var data_obj = freq_to_obj(data);

            if(!(data_obj.trip_id in freqs)) {
                freqs[data_obj.trip_id] = {};
            }

            freqs[data_obj.trip_id][data_obj.start_time] = data_obj.headway_secs;
        })
        .on("end", function(){
            readTrips();
        });
    }

    var trips = {};
    function readTrips() {

        function trips_to_obj(data) {

            if(!Array.isArray(data)) return data;

            var data_obj = {};
            data_obj.route_id = data[0];
            data_obj.service_id = data[1];
            data_obj.trip_id = data[2];

            if(data.length > 4) {
                data_obj.direction_id = data[3];
                data_obj.shape_id = data[4];
                data_obj.wheelchair_accessible = data[5];
            }

            return data_obj;
        }

        csv.fromPath("./../documentation/organitzation/GTFSs/GTFS_"+ typeName +"/trips.txt", {headers: true})
        .on("data", function(data){

            var data_obj = trips_to_obj(data);
            trips[data_obj.trip_id] = data_obj;
        })
        .on("end", function(){
            read_stop_times();
        });
    }

    var routes = {};
    function read_stop_times() {

        var aux = {};

        function stop_times_to_obj(data) {

            if(!Array.isArray(data)) return data;

            var data_obj = {};
            data_obj.trip_id = data[0];
            data_obj.arrival_time = data[1];
            data_obj.departure_time = data[2];
            data_obj.stop_id = data[3];
            data_obj.stop_sequence = data[4];

            return data_obj;
        }

        csv.fromPath("./../documentation/organitzation/GTFSs/GTFS_"+ typeName +"/stop_times.txt", {headers: true})
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
                if(isTmb) {
                    if(!(route_id in routes)) {
                        routes[route_id] = {...read_routes[route_id]};
                        routes[route_id].stops = next.toArray();
                        routes[route_id].freq = freqs[next.peek().trip_id];
                    }
                }
                else {
                    if(!(route_id in routes)) {
                        routes[route_id] = {...read_routes[route_id]};
                        routes[route_id].stops = new Heap(function(a, b) {
                            return a[0].departure_time - b[0].departure_time;
                        });
                    }

                    routes[route_id].stops.push(next.toArray());
                }

            }

            if(!isTmb) {
                if(route_id) routes[route_id].stops = routes[route_id].stops.toArray();
            }

            const content = JSON.stringify(routes);

            fs.writeFile("./../public/data/stops/routes"+ typeName +".json", 
                    content, 'utf8', function (err) {
                if (err) {
                    return console.log(err);
                }

                console.log("Finished " + typeName);
            }); 
            
        });

    }

    readRoutes();
}

generate(process.argv[2], process.argv.length > 3);