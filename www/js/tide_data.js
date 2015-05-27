(function() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/',
        success: function(data) {
            console.log('success got data', data);
        },
        error: function() {
            console.log('got error', arguments);
        },
    });
}());

/*
(function() {
    function jsonp(url, callback) {
        var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
        //window[callbackName] = function(data) {
        //    delete window[callbackName];
        //    document.body.removeChild(script);
        //    callback(data);
        //};

        var script = document.createElement('script');
        //script.src = url + '&callback=' + callbackName;
        script.src = url;
        document.body.appendChild(script);
    }

    jsonp('http://tidesandcurrents.noaa.gov/api/datagetter?begin_date=20130808%2015:00&end_date=20130808%2015:06&station=8454000&product=water_temperature&units=english&time_zone=gmt&application=ports_screen&format=json', function(data) {
        console.log('jsonp data', data);
    });
}());
*/

/*
var tide_data = function() {
    var url = 'http://tidesandcurrents.noaa.gov/api/datagetter';
    var params = {
        begin_date: '20130808 15:00',
        end_date: '20130808 15:06',
        station: '8454000',
        product: 'water_temperature',
        units: 'english',
        time_zone: 'gmt',
        application: 'ports_screen',
        format: 'json',
    };
    var pollID;
    var init = function() {};
    var changeParams = function(o) {

    };
    var getData = function(callback, context) {
        var cb = function(data) {
            console.log('my jsonp callback');
        };
        $.ajax({
            url: url,
            data: params,
            type: 'GET',
            dataType: 'jsonp',
            success: function(data) {
                callback.apply(context, [data]);
            },
            error: function() {
                console.log('tide_data got error', arguments);
            },
        });
    };

    return {
        init: init,
        changeParams: changeParams,
        getData: getData,
    };
};

(function(){
    var my_callback = function(data) {
        console.log('my_callback got data', data);
    };
    $.ajax({
        type: 'GET',
        url: 'http://tidesandcurrents.noaa.gov/api/datagetter',
        jsonpCallback: 'my_callback',
        contentType: 'application/json',
        dataType: 'jsonp',
        dataFilter: function() {
            console.log('dataFilter has args', arguments);
        },
        data: {
            begin_date: '20130808 15:00',
            end_date: '20130808 15:06',
            station: '8454000',
            product: 'water_temperature',
            units: 'english',
            time_zone: 'gmt',
            application: 'ports_screen',
            format: 'json',
        },
        success: function(data) {
            console.log('success got data', data);
        },
        error: function() {
            console.log('got error', arguments);
        },
    });
}());
*/
