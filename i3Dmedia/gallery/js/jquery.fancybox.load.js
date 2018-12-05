$(document).ready(function() {
	
	$("a.fancybox").fancybox({
			'transitionIn': 'elastic',
			'transitionOut': 'elastic',
			'speedIn': 1200, 
			'speedOut': 1200, 
			'overlayShow': false
	});
	
	$("a[rel=gallery]").fancybox({
			'transitionIn': 'elastic',
			'transitionOut': 'elastic',
			'speedIn': 2000, 
			'speedOut': 2000, 
			'titlePosition': 'over',
			'overlayOpacity': '.6',
			'overlayColor': '#000',
			'titleFormat': function(title, currentArray, currentIndex, currentOpts) {
			    return '<span id="fancybox-title-over">Image ' +  (currentIndex + 1) + ' / ' + currentArray.length + ' &mdash; ' + title + '</span>';
			}
	});
		
});