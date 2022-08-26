
$(document).ready(function(){

	$(window).scroll(function(){
		if( $(this).scrollTop() > 0 ){
			$('header').addClass('header2');
            document.getElementById('nav').style.display = "block";
		} else {
			$('header').removeClass('header2');
            document.getElementById('nav').style.display = "none";
		}
	});

});