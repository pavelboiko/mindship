(function ($) {

	$.fn.calendarLine = function (date) {
		el = this;

		view.init();

	};

	var view = {
		month_box: 3,

		init: function () {
//			this.clear();
//			this.render();
		},

		render: function () {
			var html = '';

			for (var i = 0; i < this.month_box; i++) {
				html += this.render_month();
			}

			el.find('.calendar').html(html);
		},

		render_month: function (count_days) {
			var html = '';

			for(var i = 1; i <= count_days; i++) {
				html += '<li>' + i + '</li>';
			}

			return html;
		},

		clear: function () {
			el.find('.calendar').html('');
		}
	}, el;


})(jQuery);


$(document).ready(function () {
	$('#CalendarLine').calendarLine();
});