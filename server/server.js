var request = require('request');
var http = require('http');

var server = http.createServer(function(req, res) {

    request("http://tidesandcurrents.noaa.gov/api/datagetter?date=latest&station=9414750&product=one_minute_water_level&datum=MTL&units=english&time_zone=gmt&application=ports_screen&format=json", function(error, response, body) {
        res.writeHead(200, {
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": "*",
        });
        res.end(body);
    });

});

server.listen(3000);
console.log('server listening on port 3000');
