var csv = require("fast-csv");
var Heap = require('heap');

var trips = {};

function read_trips() {

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

    

}

function read_TMB_stop_times() {

    var heap = new Heap(function(a, b) {
        return a.peek().arrival_time - b.peek().arrival_time;
    });

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
            heap.push(next);
        }

        while(!heap.empty()) {
            console.log(heap.pop());
        }
    });

}
