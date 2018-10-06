var csv = require('fast-csv');
var fs = require('fs');

const MIN_LAT = 41.25;
const MAX_LAT = 41.42;
const MIN_LON = 1.89;
const MAX_LON = 2.14;

var file = process.argv[2];
var firstLine = true;
fs.readFile(file, 'utf8', function(err, data) {
  if (err) throw err;
  var properties = data.split('\n')[0].split(',');
  var json = {};
  csv
    .fromPath(file)
    .on('data', function(line) {
      if (firstLine) {
        firstLine = false;
        return;
      }
      //if (!(line[0].startsWith('E') || line[0].startsWith('P'))) return;
      //if (line[6] !== 0) return;
      var processedLine = {};
      for (let i = 0; i < properties.length; i++) {
        processedLine[properties[i]] = line[i];
      }
      var lat_property = properties.filter(property => property.includes('lat'));
      var lon_property = properties.filter(property => property.includes('lon'));
      if (lat_property.length > 0 || lon_property.length > 0) {
        if (!(processedLine[lat_property[0]] > MIN_LAT && processedLine[lat_property[0]] < MAX_LAT
          && processedLine[lon_property[0]] > MIN_LON && processedLine[lon_property[0]] < MAX_LON)) return; 
      }
      var id_property = properties.filter(property => property.includes('id'))[0];
      json[processedLine[id_property]] = processedLine;
    })
    .on('end', function() {
      console.log(JSON.stringify(json, null, 2));
    });
});


function filterStop(line, tmb) {
  if (!(line[3] > MIN_LAT && line[3] < MAX_LAT
    && line[4] > MIN_LON && line[4] < MAX_LON)) return false;
  if (tmb) {
    if (!(line[0].startsWith('E') || line[0].startsWith('P'))) return false;
    if (line[6] !== 0) return false;
  }

  return true;
}