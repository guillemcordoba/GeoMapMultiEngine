#!/bin/bash
 
node parseCsv.js ../documentation/organitzation/GTFSs/GTFS_TRAM_BAIX/stops.txt > ../public/data/stops/tram.json
node parseCsv.js ../documentation/organitzation/GTFSs/GTFS_TRAM_BESOS/stops.txt > ../public/data/stops/tram1.json
node parseCsv.js ../documentation/organitzation/GTFSs/GTFS_TMB_actualitzats/stops.txt > ../public/data/stops/tmb.json
node parseCsv.js ../documentation/organitzation/GTFSs/GTFS_RODALIES/stops.txt > ../public/data/stops/rodalies.json
node parseCsv.js ../documentation/organitzation/GTFSs/GTFS_FGC_NOU/stops.txt > ../public/data/stops/fgc.json