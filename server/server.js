var request = require('request');
var http = require('http');

var server = http.createServer(function(req, res) {

    request("http://tidesandcurrents.noaa.gov/api/datagetter?begin_date=20130808%2015:00&end_date=20130808%2015:06&station=8454000&product=water_temperature&units=english&time_zone=gmt&application=ports_screen&format=json", function(error, response, body) {
        res.writeHead(200, {
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": "*",
        });
        res.end(body);
    });

});

server.listen(3000);
console.log('server listening on port 3000');
