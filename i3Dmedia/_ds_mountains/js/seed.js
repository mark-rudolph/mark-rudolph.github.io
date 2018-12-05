/*
 * project: 2012_ds_mountains
 * seed.js
 * @author rudolph
 * © 2011 i3Dmedia 
 */


/*
 * Seed has the scene management interface
 * It is the only name added to the global namespace
 */
var Seed = (function($){ 
  
  // flashplayer reference - for ExternalInterface function calls
  var __flash = null;

  // state of texture-mapping
  var webcam_on = false;

  // assets references
  // urls - the assets themselves are back on the server !!!!
  // urls MUST be absolute!! - they are sent to as!
  // @@@ CHANGE THESE to match production server urls !!!!!!!!!!!!!!!!!!!!!!!!
  var material_url = [
    //"http://cavaradossi/31wpender/2012_ds_mountains/target/images/materials/bird_shorty.png",  // url must be absolute!
    "http://cavaradossi/31wpender/2012_ds_mountains/target/images/materials/bird_shorty.png",
    "http://cavaradossi/31wpender/2012_ds_mountains/target/images/materials/blue_heron_shorty.png",
    "http://cavaradossi/31wpender/2012_ds_mountains/target/images/materials/cougar.png",
    "http://cavaradossi/31wpender/2012_ds_mountains/target/images/materials/cycle_of_life.png",
    "http://cavaradossi/31wpender/2012_ds_mountains/target/images/materials/dolphion_waves__shorty.png",
    "http://cavaradossi/31wpender/2012_ds_mountains/target/images/materials/eagle_salmon_shorty.png",
    "http://cavaradossi/31wpender/2012_ds_mountains/target/images/materials/Heron_shorty.png",
    "http://cavaradossi/31wpender/2012_ds_mountains/target/images/materials/hummingbird_green_shorty.png",
    "http://cavaradossi/31wpender/2012_ds_mountains/target/images/materials/Humming-Birds.png",
    "http://cavaradossi/31wpender/2012_ds_mountains/target/images/materials/killerWhale_waves_shorty.png",
    "http://cavaradossi/31wpender/2012_ds_mountains/target/images/materials/KillerWhaleDesign.png",
    "http://cavaradossi/31wpender/2012_ds_mountains/target/images/materials/pole.png",
    "http://cavaradossi/31wpender/2012_ds_mountains/target/images/materials/rainbow_bear.png",
    "http://cavaradossi/31wpender/2012_ds_mountains/target/images/materials/raven_and_sun.png",
    "http://cavaradossi/31wpender/2012_ds_mountains/target/images/materials/raven_redblack_shorty.png",
    "http://cavaradossi/31wpender/2012_ds_mountains/target/images/materials/salmon_shorty.png",
    "http://cavaradossi/31wpender/2012_ds_mountains/target/images/materials/thunderbird.png",
    "http://cavaradossi/31wpender/2012_ds_mountains/target/images/materials/Timber_wollf_shorty.png",
    "http://cavaradossi/31wpender/2012_ds_mountains/target/images/materials/wolf_shorty.png",
  ];


  // initialize 
  window.onload = function(){
  
    setTimeout(function(){
    
      // get flashplayer reference
      // determine base for as-function calls
      if(navigator.appName.indexOf("Microsoft") !== -1){
        __flash = window.flash;
        console.log("js: Browser is IE!");
      }else{
        console.log("js: Browser is NOT IE!");
        __flash = window.document.flash;
        if(__flash == undefined){
          console.log("Browser is NOT Firefox!");
          __flash = swfobject.getObjectById("flash");
        }
      }  
      if(__flash == null){
        console.log("__flash reference not found!");
      }else{
        console.log("__flash reference is " + __flash.toString());
      }

      // Score_ds_mountains
      console.log("score_ds_mountains.js: onload");

      // spirit-world   
      setTimeout(function(){
        setInterval(function(){
          console.log("spirit-world");
          // duration between 50 and 150 secs  (8mins and 24mins -> 500000 1000000)
          var duration = 50000 + Math.random()*120000;
          Seed.special(["3"]);       // spirit-world
          setTimeout(function(){
            console.log("panorama (mountain-world) in " + duration + " seconds...");
            Seed.special(["2"]);        // mountain-world
          }, duration);  // duration of spirit-world 
        }, 200000);  // period = 200 secs  (2000 secs -> 33min  2000000)
      }, 10000); //wait 10 secs before first spirit world call (200 secs -> 200000)


      // webcam - irrelevant for cam_ds_mountains - no 'vase' video projection surface   
      /*
      setTimeout(function(){
        setInterval(function(){
          console.log("webcam ON");
          var duration = 500000 + Math.random()*300000;  // duration of webcam ON - between 8mins and 14mins 
          Seed.special(["1"]);       // webcam ON
          setTimeout(function(){
            console.log("webcam OFF in " + duration + " seconds...");
            Seed.special(["1"]);        // webcam OFF
          }, duration);  // duration of webcam ON 
        }, 1000000);  // period = 1000 secs =  17min 
      }, 100000); //wait 100 secs before first webcam  
      */

    }, 1000);  // setTimeout(f(){}, 1000ms);
  
  };



  var index_of = function(s){
    return s.match(/[0-9]+$/);
  }



  return {
    scene: function(o){
      o: typeof(o) != 'undefined' ? o : [];
      console.log("Seed.scene: o = " + o);
      //...
    },

    key_type: function(o){
      o: typeof(o) != 'undefined' ? o : {};
      console.log("Seed.key_type: o = " + o);
      //...
    },

    key: function(o){
      o: typeof(o) != 'undefined' ? o : {};
      console.log("Seed.key: o = " + o);
      //...
    },

    fill: function(o){
      o: typeof(o) != 'undefined' ? o : {};
      console.log("Seed.fill: o = " + o);
      //...
    },

    back: function(o){
      o: typeof(o) != 'undefined' ? o : {};
      console.log("Seed.back: o = " + o);
      //...
    },

    special: function(a){
      a: typeof(a) != 'undefined' ? a : [];
      console.log("Seed.special: a = " + a);
      console.log("Seed.special: a[0] = " + a[0]);
      var operation = index_of(a[0]);
      console.log("operation is index_of(a[0]) = " + operation);
      console.log("typeof operation = " + typeof operation);

      var i = parseInt(operation);
      switch(i){
        case 0:
          console.log("case = 0!");
          __flash.setSpecial(0, "vase");
          console.log("called __flash.setSpecial(0, vase) - translucent geometry surface");
          break;
        case 1:
          console.log("case = 1!");
          __flash.setSpecial(1, "vase");
          console.log("called __flash.setSpecial(1, vase) - webcam on/off");
          break;
        case 2:
          console.log("case = 2!");
          __flash.setSpecial(2);
          console.log("called __flash.setSpecial(2) panorama - mountain world");
          break;
        case 3:
          console.log("case = 3!");
          __flash.setSpecial(3);
          console.log("called __flash.setSpecial(3) - spirit world");
          break;
        default:
          console.log("no such operation! - " + i);
      }
    },

    material: function(a){
      a: typeof(a) != 'undefined' ? a : [];
      console.log("Seed.material: a = " + a);
      
      var index = index_of(a[0]);   // UI and Arrays use 0,..,K-1
      console.log("index is " + index);
      console.log("mapping vase with url " + material_url[index]);
      var uri = material_url[index];

      // for now there is a single named object - 'vase'
      var target = "vase";
      
      console.log("sending flash/as setMaterial(" + target + ", " + uri + ")");
      if(__flash){
        __flash.setMaterial(target, uri);   // see p 905-906 AS 3.0 Bible
      }else{
        console.log("__flash reference was NOT found!!!");
      }
    }

  };

})(jQuery);

