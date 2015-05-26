var ui = {

  init: function(){
    console.log("init UI");


    ui.div_bt_alert = $('#bluetooth_alert');
    ui.div_bt_menu =  $('#bt_menu');    
    ui.div_serial = $('#serialMonitor');


    var class_bt = $('.bluetooth');
    var but_connect = $('#connect');
    var but_bt_close = $('#bt_close_select');
    ui.data_title = $('#raw_data_title');
    ui.data_display = $('#raw_data_values');
    ui.data_units = $('#raw_data_units');
    ui.main_title = $('#title');
    ui.class_bt_select = $('.bt_select');

    //setup the interface
    ui.div_bt_alert.hide();
    class_bt.show();

    app.menu.setSwipeable(true);
   
  
    
    but_connect.click(function(){
        app.menu.toggle();
        if(app.has_bt) bt.listPorts();
        else{
          var temp = [];
          temp.push({name:"BTM_BT1",address: "00:00:01"});
          temp.push({name:"BTM_BT2",address: "00:00:02"});
          ui.bluetoothAlert(temp);
        } 

    });


    but_bt_close.click(function(){
          ui.serial("removing connection");
          ui.div_bt_alert.hide();
    });
  },

  displayData:function(type, values){
    console.log("display");

    if(type == "bus"){
      ui.data_title.text("next bus in");
      ui.data_display.text(values[0]);
      ui.data_units.text("minutes");
    }
  },


  bluetoothAlert:function(list){
      $('.bt_select').remove(); //clear the list
      
      for(var i in list){
         ui.div_bt_menu.prepend($('<button></button>')
              .addClass("alert-dialog-button")
              .addClass("bt_select")
              .prop("value", list[i].address)
              .text(list[i].name)
          );
          
      }

      $('.bt_select').click(function(){
          bt.macAddress = $(this).prop('value');
          ui.serial("selected: "+bt.macAddress);
          ui.div_bt_alert.hide();
          app.menu.toggle();
          if(app.has_bt) bt.manageConnection();
      });

      ui.div_bt_alert.show();

  },

  serial: function(message){
    ui.div_serial.append($('<div></div>')
      .addClass("serialLine")
      .text(message)
    );
  },

  clearSerial:function(){
    //ui.div_serial.text("");
  }


};




