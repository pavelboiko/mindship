	
	$(document).ready(function () {

		$('.test_dragbar ').mousedown(function(e){

			e.preventDefault();

			$(document).mousemove(function(e){

				$('.test').css("width",e.pageX +2);


			});
			console.log("leaving mouseDown");
		});
		$(document).mouseup(function(e){

			$(document).unbind('mousemove');
		});
					});