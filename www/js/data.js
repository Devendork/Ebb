var data = {
  url: "http://webservices.nextbus.com/service/publicXMLFeed",
  params: {
      command: undefined,
      a: undefined,
      r: undefined,
      s: undefined
    },
  param_titles:{
      agency: undefined,
      route: undefined,
      stop: undefined,
      direction: undefined
  },
  direction: undefined,
  interval: 30000, //the readings are noisy, 30s seems to be enough time to fit some noise


  init: function(){
    //set up core functionality
    console.log("init data");

    ///use this here for testing to see if it's running
  },

  setParam: function(param_id, code, title){
    switch(param_id){
      case 'agency' : data.params.a = code; data.param_titles.agency = title; break;
      case 'route'  : data.params.r = code; data.param_titles.route = title; break;
      case 'direction': data.direction = code; data.param_titles.direction = title; break;
      case 'stop': data.params.s = code; data.param_titles.stop = title; break;
    }
  },

  getStreamData: function(){
    console.log("start stream");
    data.params.command = 'predictions';
    //init a data stream and take a callback that is called each time the data changes
    function getCurrentInfo(){
      var values = [];

      $.get(data.url, data.params, function(api_data){
        var predictions = $(api_data).find("prediction");
        $.each(predictions, function(index, p){
            if($(p).attr("dirTag") == data.direction){
              values.push(parseInt($(p).attr("minutes")));
            }
        });

        console.log(values);
        var bitmap = data.createBitmapValues(values);
        ui.displayData("commute", values, bitmap);
        bt.sendDataValues(bitmap);
      });
    }

    getCurrentInfo(); //call once before setting info or else it will wait 10s to call
    data.timer = setInterval(getCurrentInfo,data.interval);

  },

  createBitmapValues:function(values){
    var range = [1, 2, 4, 8, 16];
    var bitmap = [0, 0, 0, 0, 0];
    for(var i in values){
      var v = values[i];
      for(var j = 0; j < 5; j++){
        if(v <= range[j]){
          bitmap[j] = 1;
          break;
        }
      }
    }

    return bitmap;

  },

  getAgencies: function(){
    console.log("get agencies");
    data.params.command = 'agencyList';

    var values = [];

    $.get(data.url, data.params, function(api_data){
      var routes = $(api_data).find("agency");

      $.each(routes, function(index, value){
        if($(value).attr("regionTitle") == 'California-Northern')
          values.push({tag: $(value).attr("tag"), title: $(value).attr("title")});
      });

      ui.populateList("agency", values);   
    });
  },

  getRoutes: function(){
    data.params.command = 'routeList';

    var values = [];

    $.get(data.url, data.params, function(api_data){
      var routes = $(api_data).find("route");

      $.each(routes, function(index, value){
        values.push({tag: $(value).attr("tag"), title: $(value).attr("title")});
      });

      ui.populateList("route", values);   
    });
  },

  getDirections: function(){
    console.log("get directions");
    data.params.command = 'routeConfig';

    var values = [];

    $.get(data.url, data.params, function(api_data){
      var directions = $(api_data).find("direction");

      $.each(directions, function(index, value){
        values.push({tag: $(value).attr("tag"), title: $(value).attr("title")});
      });

      ui.populateList("direction", values);   
    });
  },

  getStops: function(){
    console.log("get stops");
    data.params.command = 'routeConfig';

    var all_stops = [];
    var select_stops = [];

    $.get(data.url, data.params, function(api_data){
        var stops = $(api_data).find("stop");

      //populate list of all stops
      $.each(stops, function(index, stop){
        if($(stop).attr("title") !== undefined){
          all_stops[$(stop).attr("tag")] = {title: $(stop).attr("title"), stopId: $(stop).attr("stopId")};
        }
      });

      var directions = $(api_data).find("direction");
      $.each(directions, function(index, direction){
        var tag = $(direction).attr("tag");
        if(tag == data.direction){
            var dir_stops = $(direction).find("stop");
             $.each(dir_stops, function(index, stop){
               var tag = $(stop).attr("tag");
               //replace tag with stop id for printing
               all_stops[tag].tag = tag;
               select_stops.push(all_stops[tag]);
             });
        }
      });

    ui.populateList("stop", select_stops);   
    });
  }
};




