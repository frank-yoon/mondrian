/* Settings */
var totalPanes = 50,
	percent_slidDown = 25,
	pane_Color = ['red', 'yellow', 'blue'];

function insertPanes() {
	var pane,
		paneClass,
		ratio_slidDown = percent_slidDown/100;

	for(i=0; i<totalPanes; i++) {
		pane = $('<div><div></div></div>');
		paneClass = pane_Color[Math.floor(Math.random()*pane_Color.length)];
		if(Math.random()<ratio_slidDown) paneClass += ' slidDown';
		pane.attr('class', paneClass);
		$('.window').append(pane);
	}
}

function initIsotope(){
	$('.window').isotope({
		layoutMode : 'masonry'
	});
}

function getSortData(){
	$('.window').isotope({
		getSortData : {
			color : function($elem){
			 	return $elem.attr('class');
			}
		}
	});
}

function initSort(){
	$('.sorting li').click(function(){
		$('.window').isotope({ sortBy : $(this).text() });
	});
}

function initSlide(){
	$('.window>*>*').click(function(){
		$(this).parent().toggleClass('slidDown');
		$('.window').isotope('reLayout');
	});
}

function initLayout(){
	$('.layout li').click(function(){
		$('.window').css('height', 'auto');
		$('.window').css('width', '800px');
		$('.window').isotope({
			layoutMode : $(this).text()
		});
	});
}

/* Bind click events to control li's */
function initControlCheckboxes(){	
	$(':checkbox').parent('li').click(function(){
		var i = $(this).children('input');
		i.prop('checked', !i.is(':checked'));
		i.change();
	});
}

/* Stop parent li click event */
function initControlCheckboxesStop(){	
	$('li :checkbox').click(function(event){
		event.stopPropagation();
		$(this).change();
	});
}

/* Filter by color */
function initFiltering(){	
	$('.filtering :checkbox').change(function(){
		var p = [];
		$('.controls :checked').each(function(){ p.push('.'+$(this).val()) });
		$('.window').isotope({ filter: p.join(',') });
	});
}

function initSlideAll(){
	$('.slide li').click(function(){
		$('.window>*:not(.slidDown) .content').css('overflow', 'hidden');
		if($(this).text()=='expand all')
			$('.window>*:not(.slidDown)').toggleClass('slidDown');
		else
			$('.slidDown').toggleClass('slidDown');
		$('.window').isotope('reLayout');
	});
}

function initSlidDown(){	
	$('.window>*>*').on('otransitionend oTransitionEnd webkitTransitionEnd transitionend', function(){ 
		$(this).children('.content').removeAttr('style');
	});
}

$(function(){
	insertPanes();
	getSortData();
	initIsotope();
	initSlide();
	initSlidDown();
	initLayout();
	initControlCheckboxes();
	initControlCheckboxesStop();
	initFiltering();
	initSort();
	initSlideAll();
    $('.sorting li:first-child').click();
});