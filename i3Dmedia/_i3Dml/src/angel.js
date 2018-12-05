/*
 * angel.js
 * project: project
 * <project> = ~/nodejs/i3Dmedia/project
 * <project>/target/src/angel.js 
 * NOTE: <project>/target is symbolic link to /var/www/<project>
 *
 * mediator for websocket communications from server
 * mediator for ExternalInterface communications from stage3D
 *
 * receives 'report' on ExternalInterface
 * sends 'report' on wsocket
 */



// Ecmascript 5 javascript sub-language:
"use strict";


var angel = function(topology){

  // local vars
  var __flash;  // reference to flashplayer for ExternalInterface calls
  var wsocket;  // websocket - SocketIO
  var angel_player_interface_is_ready = false;
  var angel_server_ws_is_ready = false;


  // sanity - topology
  console.log("JS-angel: topology = " + topology);
  for(var p in topology){
    console.log("JS-angel: topology[" + p + "] = " + topology[p]);
  }


  // singleton
  if(angel) return angel;


  // obtain reference to i3D-player when PLAYER_is_ready() returns true
  var player_itv = setInterval(function(){
    console.log("JS-angel trying PLAYER_is_ready"); 
    if(PLAYER_is_ready){
      console.log("JS-angel PLAYER_is_ready!"); 
      clearInterval(player_itv);  // turn off interval

      // get __flash player reference
      if(navigator.appName.indexOf("Microsoft") !== -1){
        //console.log("angel.js: Browser is IE!");
        __flash = window.flash;
      }else{
        //console.log("JS-angel: Browser is NOT IE!");
        __flash = window.document.flash;
        if(__flash === undefined){
          __flash = window.document.getElementById("flash");
        }
      }
      if(__flash){
        console.log("JS-angel: flashplayer reference found");
        console.log("JS-angel: __flash = " + __flash);

        // set flag to allow application to begin - next call returns true
        angel_player_interface_is_ready = true;
      }else{
        console.log("angel.js: FAILED to find flashplayer reference!");
      }
    }  
  }, 100); //setInterval for player


  // build websocket 
  // Rausch: var socket = io.connect('http://domain.com');
  var uri = "http://" + topology.DOMAIN + ":" + topology.WS_PORT;
  console.log("JS-angel trying to connect to websocket at " + uri); 
  var ws_itv = setInterval(function(){
    console.log("JS-angel trying wsocket");
    // returns promise? - even no server => not null !?
    wsocket = io.connect(uri); 
    console.log("JS-angel: wsocket = " + wsocket);
    if(wsocket !== null){
      //for(var p in wsocket){  // there exist properties wo server !?
      //  if(wsocket.hasOwnProperty(p)){
      //    console.log("wsocket[" + p + "] = " + wsocket[p]);
      //  }
      //}  
      clearInterval(ws_itv);  // turn off interval
      console.log("JS-angel connected to websocket at " + uri);

      // set handler for server channel 'sentence'
      console.log("JS-angel listening on server wsocket 'action' channel");
      wsocket.on('action', function(msg){
        console.log("JS-angel received server action: " + msg);
        angel.action(msg);
      });
      angel_server_ws_is_ready = true;
    }else{
      console.log("angel.js: FAILED to obtain websocket connection!");
    }
  }, 100); //setInterval for wsocket


  // define and return angel and its communication channels
  // block return until __flash and wsocket are obtained and ready
  var angel_itv = setInterval(function(){
    console.log("JS-angel trying to create and return angel");
    if(angel_player_interface_is_ready && angel_server_ws_is_ready){
      clearInterval(angel_itv);

      // set flag in html script to allow application to start
      console.log("JS-angel: a&&b true @@@@@@@@@@@@@@@");
      angel = {
        action: function(msg){
          console.log("JS-angel.action() received action: " + msg);
          console.log("JS-angel.action() __flash: " + __flash);
          if(__flash){
            console.log("JS-angel sending action to i3D Angel.queue: " + msg);
            try{
              __flash.queue(msg);
              console.log("JS-angel completed __flash.queue: " + msg);
            }catch(e){
              console.log("JS-angel error sending to stage3D: " + e);
              console.log("RECALL: Chrome as of v22.X cannot use JS->AS " +
                  "ExternalInterface such as 'queue' !!!!! ");
            }
          }
        },
    
        state: function(msg){
          console.log("JS-angel.state() sending to server stage3D state =  " + msg);
          try{
            wsocket.emit('state', msg);
          }catch(e){
            console.log("error on wsocket.emit('state', msg): " + e);
          }
        },
    
        report: function(msg){
          console.log("JS-angel.report() stage3D report = " + msg);
          if(topology.AS_REPORT_TO_NODE){
            console.log("JS-angel.report() sending Nodejs-server stage3D report");
            try{
              wsocket.emit('report', msg);
            }catch(e){
              console.log("error on wsocket.emit('report', msg): " + e);
            }
          }
        }
      }
      console.log("JS-angel returning angel = " + angel);
      return angel;
    }//if(a && b)
  }, 100);
}(TOPOLOGY);
