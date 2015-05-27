/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */



var module = angular.module('app', ['onsen']); 
var hasGL = undefined;

var app = {
    //global bluetooth vars
    macAddress:undefined,
    chars:"",
    has_bt: false, 

    // Application Constructor
    initialize: function() {
        console.log("init app");
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        ons.ready(function(){app.initUI();});
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('pause', this.closePort, false);
        document.addEventListener('resume', this.manageConnection, false);
    },

    initUI:function(){

        //init bluetooth and ui elements
        bt.init();        
        ui.init();
        data.init();
        app.navi.on('postpush', app.onPush);


    },


    onDeviceReady: function() {
        app.has_bt = true;

        //THIS IS CALLED BEFORE INIT UI, YOU CANNOT CALL ANYTHING FROM BT OR UI IN HERE
        //it is only called when run on an Android device, won't be called in browher
        
    },

    onPush: function(){

        //get the page on the top of the stack
        var page = app.navi.pages[app.navi.pages.length-1].name;
        console.log(page+" pushed");

        switch(page){
            case "route.html": data.getRoutes(page); break;
            case "direction.html": data.getDirections(page); break;
            case "stop.html": data.getStops(page); break;
            case "prediction.html": data.getStreamData(); break;
        }
    }

};

app.initialize();
