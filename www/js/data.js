var data = {
  values: [],
  url: "http://webservices.nextbus.com/service/publicXMLFeed?command=predictions",
  params: {
      a: 'actransit',
      r: '1',
      s: '1006360'
    },


  init: function(){
    //set up core functionality
    console.log("init data");

    ///use this here for testing to see if it's running
  },

  changeParams: function(url, params){
    data.url = url;
    data.params = params;
  },

  getData: function(){
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

  }
};




