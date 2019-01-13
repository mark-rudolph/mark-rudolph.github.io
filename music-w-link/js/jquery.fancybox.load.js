$(document).ready(function() {
	
	$("a.fancybox").fancybox({
			'transitionIn': 'elastic',
			'transitionOut': 'elastic',
			'speedIn': 1000, 
			'speedOut': 200,
			'overlayShow': false
	});
	
	$("a[rel=gallery]").fancybox({
			'transitionIn': 'elastic',
			'transitionOut': 'elastic',
			'speedIn': 1200, 
			'speedOut': 1200,
			'titlePosition': 'over',
			'overlayOpacity': '.8',
			'overlayColor': '#111',
			'titleFormat': function(title, currentArray, currentIndex, currentOpts) {
			    return '<span id="fancybox-title-over"> ' +  (currentIndex + 1) + ' / ' + currentArray.length + ' &mdash; ' + title + '</span>';
			}
	});
		
});