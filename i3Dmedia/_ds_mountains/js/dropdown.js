// Initialize.
function init_dropdown() {

	// Does element exist?
	if (!$('ul.dropdown').length) {
		// If not, exit.
		return;
	}


	// Add listener for hover.
        // first time title hover drops down list - subsequent - no
	$('ul.dropdown li.dropdown_trigger').hover(function() {

          // rudolph aug25 - disable menu drop on hover 
          // use click below to display dropdown menu
		// Show subsequent <ul>.
		//$(this).find('ul').fadeIn(1);
		$(this).find('ul').hide();
	},
	function() {
		// Hide subsequent <ul>.
		$(this).find('ul').hide();
	});


	// Add listener for click.
	$('ul.dropdown li.dropdown_trigger').click(function(event) {
          console.log("event.target = " + event.target);
          
          // ignore the title link event
          // get end of href string - index at end of the photo name
          var match = event.target.toString().match(/#.*[0-9]+$/);
         
          // rudolph aug 25 - top title menu box click - 
          // drop down menu items instead of nothing as before
          //if( match === null){ return;}
          if( match === null){
            $(this).find('ul').fadeIn(1);
            return;
          }
          // there should always be a single match
          console.log("selection is " + match[0]);
         

          // route the match to the appropriate method of Seed for as/flash
          // scene
          // NOTE: if search > 0 there was a match!
          if(match[0].search("scene") > 0){
            console.log("dropdown: Scene - calling Seed.scene(" + match[0] + ")");
            Seed.scene(match[0]);
            return;
          }

          // vase
          // NOTE: if search > 0 there was a match!
          if(match[0].search("material") > 0){
            console.log("dropdown: Material - calling Seed.material([" + match[0] + "])");
            Seed.material([match[0]]);
            return;
          }
          
          // key_type
          // NOTE: if search > 0 there was a match!
          if(match[0].search("key_type") > 0){
            console.log("dropdown: Key Light Type - calling Seed.key_type(" + match[0] + ")");
            Seed.key_type([match[0]]);
            return;
          }

          // special
          // NOTE: if search > 0 there was a match!
          if(match[0].search("special") > 0){
            console.log("dropdown: Special - calling Seed.special([" + match[0] + "])");
            Seed.special([match[0]]);
            return;
          }
          
          // back
          // NOTE: if search > 0 there was a match!
          if(match[0].search("back_color") > 0){
            console.log("dropdown: Back Light - calling Seed.back(" + match[0] + ")");
            Seed.back([match[0]]);
            return;
          }
          
          // key
          // NOTE: if search > 0 there was a match!
          if(match[0].search("key_color") > 0){
            console.log("dropdown: Key Light - calling Seed.key(" + match[0] + ")");
            Seed.key([match[0]]);
            return;
          }

          // fill
          // NOTE: if search > 0 there was a match!
          if(match[0].search("fill_color") > 0){
            console.log("dropdown: Fill Light - calling Seed.fill(" + match[0] + ")");
            Seed.fill([match[0]]);
            return;
          }

          console.log("dropdown: no match for " + match + " !?!");
	});
}

// Kick things off.
$(document).ready(function() {
	init_dropdown();
});
