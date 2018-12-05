$(window).load(function(){
  console.log("assets loaded");
  var active = false;
  var cx = Math.ceil($('body').width() / 2.0);
  var cy = Math.ceil($('body').height() / 2.0);
  var dx = 0.0;
  var dy = 0.0;
  var rx = 0.0;
  var ry = 0.0;
  var scaleX = 10.0;
  var scaleY = 100.0;
  var transform = "";
  var translate = false;


  // there also exist keydown/keyup events  
//  $(document).keypress(function(e) {
//    if(e.which === 97) { // a
//      console.log("a keypress! larger scale");
//      scaleX *= 0.5;
//      scaleY *= 0.5;
//      return;
//    }
//    if(e.which === 122) { // z 
//      console.log("z keypress! smaller scale");
//      scaleX *= 2.0;
//      scaleY *= 2.0;
//      return;
//    }
//    if(e.which === 100) { // d 
//      console.log("d keypress! default scaleX scaleY");
//      scaleX = 10.0;
//      scaleY = 100.0;
//      return;
//    }
//    if(e.which === 116) { // t 
//      console.log("t keypress! translate in XZ plane");
//      e.pageX = cx;
//      e.pageY = cy;
//      translate = !translate;
//      return;
//    }
//    console.log("NOT 'a' or 'z': keypress = " + e.which);
//  });
  

  $('body').mouseleave(function(e){
    console.log("# mouseleave");
    // save angles 
    rx = dx;  
    ry = dy;
  });

  $('body').mouseenter(function(e){
    console.log("# mouseenter");
    // set mouse-vector origin
    cx = e.pageX + 0.01; // hack for rendering bug?
    cy = e.pageY;
  });

  // cx = e.pageX + 0.01;  is hack for rendering bug?
  // cx = e.pageX causes left and sky faces to not render ?! 
  $('body').mouseup(function(e){
    console.log("# mouseup");
    // set mouse-vector origin
    cx = e.pageX + 0.01; // hack for rendering bug?
    cy = e.pageY;
  });
  
  $('body').mousedown(function(e){
    console.log("# mousedown");
    active = true;
  });
  
  $('body').mousemove(function(e){
    if(active){
      if(translate){
        dx = -2*(e.pageX - cx);
        dy = -2*(e.pageY - cy);
        if(dx < -100) dx = -100;
        if(dx > 100) dx = 100; 
        if(dy < 10) dy = 10;
        if(dy > 360) dy = 360;
        // short translation animation in XZ plane
        transform = 'translateX(' + dx + 'px) translateZ(' + dy + 'px)';
        console.log(transform);
      }else{  
        dx = e.pageX - cx;
        dy = e.pageY - cy;
        dx = rx + dx/scaleX;    // default 10.0;
        dy = ry + dy/scaleY;     // default 100.0;
        dx *= 7;
        dy *= 10;
        if(dy < -25) dy = -25;
        if(dy > 0) dy = 0;
        // short no easing camera animation
        transform = 'rotateX(' + dy + 'deg) rotateY(' + dx + 'deg)';
        //console.log(transform);
      }
      $('.cube').css('-webkit-transform', transform);
    }else{
      console.log("mousemove but NOT active");
    }

  });
});
