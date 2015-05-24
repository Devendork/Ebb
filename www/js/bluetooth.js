var bt = {
	macAddress: undefined,
	
	init:function(){
		console.log("init bt");
		if(app.has_bt) bt.listPorts();
	},

    listPorts: function(){
        //app.receivedEvent('deviceready');
        var listPorts = function(){
            bluetoothSerial.list(
                function(results){
                    ui.serial(JSON.stringify(results));
                    ui.bluetoothAlert(results);
                },
                function(error){
                    ui.serial(JSON.stringify(error));
                }
            );
        }

        var notEnabled = function(){
            ui.serial("Bluetooth is not enabled");
        }

        bluetoothSerial.isEnabled(
            listPorts,
            notEnabled
        );

    },


    manageConnection: function(){
        ui.serial("manage connection");

        var connect = function(){
            ui.serial("attempting to connect. " +
                    "make sure the serial port is open on the target device");

            bluetoothSerial.connect(
                bt.macAddress,
                bt.openPort,
                bt.showError
                );
        };

        var disconnect = function(){
            ui.serial("attemtping to disconnect");
            bluetoothSerial.disconnect(
                bt.closePort,
                bt.showError
            );
        };

        bluetoothSerial.isConnected(disconnect,connect);
    },


    openPort:function(){
        ui.serial("Connected to: "+bt.macAddress);
        bluetoothSerial.subscribe('\n', bt.onData, bt.showError);
        bt.sendData("i");
    },

    onData:function(data){
    	var forward = true,
    		playing = false;

        ui.serial("-> "+ data);

        function startPlaying(){
        	playing = true;
        };

        function endPlaying(){
        	playing = false;
        };

        function nextStep(){
        	d2.nextStep();
        	bt.sendData('m');
        };

        function prevStep(){
        	d2.prevStep();
        	bt.sendData('m');
        };

        function playForward(){
        	forward = true;
        };

        function playBackward(){
        	forward = false;

        };

        //update this to reflect whatever commands that we are looking for
        switch(data){
        	case 's': startPlaying(); break;
        	case 'e': endPlaying(); break;
        	case 'n': nextStep();break;
        	case 'p': prevStep();break;
        	case 'f': playForward();break;
        	case 'b': playBackward();break;
        };

    
    },

    sendData: function(data) { // send data to Arduino


        var success = function() {
            console.log("success");
            ui.serial("<- " + data);
        };

        var failure = function() {
            bt.showError("Failed writing data to Bluetooth peripheral");
        };

        data = bt.formatData(data);
        if(data != ""){
	        if(app.has_bt) bluetoothSerial.write(data+'\n', success, failure);
	        else ui.serial("<- " + data);
	    }
    },

    closePort:function(){
        ui.serial("Disconneting from "+app.macAddress);
        connectButton.innerHTML = "Connect";
        bluetoothSerial.unsubscribe(
            function(data){
                ui.serial(data);
            },
            bt.showError
        );
    },

    showError:function(error){
        ui.serial(error);
    }


};