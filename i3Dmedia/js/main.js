/*
 * main.js
 * project: i3Dmedia
 * <project> = cavaradossi/i3Dmedia
 * <project>/js/main.js  (for pure js project)
 *
 * module-pattern for exporting a package of functionality
 */

// Ecmascript 5 javascript sub-language:
"use strict";


// diagnostics for lib loads
console.log("Modernizr version = " + Modernizr._version);
console.log("jQuery version = " + jQuery.fn.jquery);


// smooth scroll to navigation sections
(function($){
  
   //Bind a function to the ‘click’ event of the anchor tag  
  $('#nav a').click(function() {
     
     //The href attrubute which matches the id of the div element.
      var destination = $(this).attr('href');
     
      //compensate for the height of the navigation bar 
      var navBarHeight = $('#navbar').height();
     
     // Calculate the amount using the distance of the element from the page top,
     // and the height of the navigation bar.
      var amount = $(destination).offset().top - navBarHeight;		
    	
      $('html,body').animate({scrollTop: amount}, 'slow');
      
     // Cancel the default browser behavior by returning false.
     // which will disable the hash in the address bar from appearing.
     return false;
  });
})(jQuery);


/*
 * T is an object returned from action of function
 * T.f returns "T.f called"
 * T has access to private properties a,o and f is a closure
 */
var T = function(){    //T is an object NOT a function
  var a = [];
  var o = {};
  return {
    f: function(){     //f is closure 
      return "T.f called";
    } 
  };   //T has private properties from enclosing function scope
}();

 

