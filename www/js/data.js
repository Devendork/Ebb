var data = {
  url: "http://webservices.nextbus.com/service/publicXMLFeed",
  params: {
      command: undefined,
      a: 'actransit',
      r: undefined,
      s: undefined
    },
  direction: undefined,


  init: function(){
    //set up core functionality
    console.log("init data");

    ///use this here for testing to see if it's running
  },

  setRoute: function(route){
    data.params.r = route;
  },

  setDirection: function(d){
    data.direction = d;
  },

  setStop: function(s){
     data.params.s = s;
  },

  //I don't think this is the best way to handle changing params, change will be initiated by the param that is called
  // changeParams: function(url, params){
  //   data.url = url;
  //   data.params = params;
  // },

  getStreamData: function(){
    data.params.command = 'predictions';
    //init a data stream and take a callback that is called each time the data changes
    
    $.get(data.url, data.params, function(api_data){
      console.log(api_data);
      var predictions = $(api_data).find("prediction");

      console.log(predictions.length);

      for(var i = 0; i < predictions.length; i++){
        data.values.push(parseInt($(predictions[i]).attr("minutes")));
      }

      console.log(data.values);
    ui.displayData("bus", data.values);
    });

  },

  getRoutes: function(page){
    console.log("get routes");
    data.params.command = 'routeList';

    var values = [];

    $.get(data.url, data.params, function(api_data){
      var routes = $(api_data).find("route");

      $.each(routes, function(index, value){
        values.push({tag: $(value).attr("tag"), title: $(value).attr("title")});
      });

      ui.populateList(page, values);   
    });
  },

  getDirections: function(page){
    console.log("get directions");
    data.params.command = 'routeConfig';

    var values = [];

    $.get(data.url, data.params, function(api_data){
      var directions = $(api_data).find("direction");

      $.each(directions, function(index, value){
        values.push({tag: $(value).attr("tag"), title: $(value).attr("title")});
      });

      ui.populateList(page, values);   
    });
  },

  getStops: function(page){
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
             all_stops[tag].tag = all_stops[tag].stopId;
             select_stops.push(all_stops[tag]);
           });
      }
    });

      ui.populateList(page, select_stops);   
    });
  }
};




