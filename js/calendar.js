(function ($) {


	$.fn.calendarLine = function (method, id) {
		if (methods[method])
			return methods[method].apply(this, [id]);
		else
			return methods.start.apply(this, [method]);
	};


})(jQuery);


$(document).ready(function () {
	$('CalendarLine').calendarLine();
});