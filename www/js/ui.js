var ui = {

  init: function(){
    console.log("init UI");
    ui.serial_content = [];
  },


  displayBluetoothOptions:function(){

    if(app.has_bt) bt.listPorts();
    else{
      var temp = [];
      temp.push({name:"BTM_BT1",address: "00:00:01"});
      temp.push({name:"BTM_BT2",address: "00:00:02"});
      ui.bluetoothAlert(temp);
    } 

  },


  bluetoothAlert:function(list){
    $('.bt_select').remove(); //clear the list
    
    for(var i in list){
      $("#connection_options")
      .append("<li id='"+list[i].address+"' class='list__item bt_select'><span class='list__item__line-height'>"+list[i].name+"</span></li>")     
    }

    $('.bt_select').click(function(){
        bt.macAddress = $(this).attr("id");
        if(app.has_bt) bt.toggleConnection();
        else{
          $("#disconnected").hide();
          $("#connected").show();
          ui.serial("selected: "+bt.macAddress);
        }

    });
  },

  serial: function(message){
    ui.serial_content.push(message)
    $("#serialMonitor").prepend("<li class='list__item'>"+message+"</li>")
  },

  clearSerial:function(){
    //ui.div_serial.text("");
  },

  populateSerial: function(){
    $.each(ui.serial_content, function(index, message){
        $("#serialMonitor").prepend("<li class='list__item'>"+message+"</li>")
    });
  },


  populateList: function(page, values){
    console.log(page);

    // clear the existing list
    $('#'+page+' li').remove();

    $.each(values, function(index, value) {
      $('#'+page).append("<li id='"+value.tag+"' class='list__item list--inset__item list__item--chevron'>"+value.title+"</li>")
    });

  
    $('#'+page+' li').click(function(){
      var page = $(this).parent().attr("id");
      console.log("clicked");
      console.log($(this).attr("id"));
      console.log($(this).text());
      data.setParam(page, $(this).attr("id"), $(this).text());
      switch(page){
        case "agency": app.navi.pushPage('route.html'); break;
        case "route": app.navi.pushPage('direction.html'); break;
        case "direction": app.navi.pushPage('stop.html'); break;
        case "stop": app.navi.pushPage('prediction.html'); break;
      }

    });
  },


  displayData:function(type, values, bitmap){
    if(type == "commute"){
      //change all to 0

      if(values.length > 0){
        $("#raw_data_values").text(values[0]);
        $("#raw_data_units").text("minutes");

        ui.updateVis(bitmap);


      }else{
        $("#raw_data_values").text("none");
      }
      
      $("#raw_data_info").empty();
      for(var i in data.param_titles){
         $("#raw_data_info").append($('<div></div>').text(data.param_titles[i]));
      }
    }
  },

  updateVis:function(bitmap){
    $(".ion-record").css("color", "#666");
   
    for(var i in bitmap){
      if(bitmap[i] == 1 ) $("#icn_"+i).css("color", "#fff");
    }

  }


};




