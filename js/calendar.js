(function ($) {
	$.fn.calendarLine = function (date) {
		el = this.find('.calendar');
		if (typeof date == 'undefined') {
			date = new Date();
		}

		view.init(date);

	};

	var monthsLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

		view = {
			countMonthBox: 3,
			curDate: {},
			configLine: {
				scrollSpeed: 1000,
				scrollStep: 10,
				viewPosCurrentDay: 8,
				widthDay: 53 // width + border days box
			},


			init: function (date) {
				this.curDate = date; // Current day

				this.clear()
					.renderLine()
					.bind();
			},

			renderLine: function () {
				var html = '',
					contMonthDays = 0,
					countAllDays = 0,
					leftMonthCount = ~~((this.countMonthBox) / 2),
					nextMonth = new Date(this.curDate.getFullYear(), this.curDate.getMonth() - leftMonthCount),
					startPosition = 0;

				for (var i = 0; i < this.countMonthBox; i++) {
					contMonthDays = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0).getDate();
					if (i <= leftMonthCount) {
						startPosition += countAllDays;
					}

					countAllDays += contMonthDays;

					html += this.renderMonth(nextMonth, contMonthDays);

					model[nextMonth.getTime()] = {};

					nextMonth.setMonth(nextMonth.getMonth() + 1);
				}
				startPosition += this.curDate.getDate() - this.configLine.viewPosCurrentDay;


				el.css({
					width: countAllDays * this.configLine.widthDay,
					left: -startPosition * this.configLine.widthDay
				}).html(html);

				return this;
			},

			clear: function () {
				el.html('');

				return this;
			},

			renderMonth: function (objDate, countDays) {
				var html = '<ul style="width: ' + (countDays * this.configLine.widthDay) + ';">' +
						'<li class="month_line">' + monthsLong[objDate.getMonth()] + ' ' + objDate.getFullYear() + '</li>',
					classToday = '',
					isToday = objDate.getMonth() == this.curDate.getMonth() && objDate.getFullYear() == this.curDate.getFullYear(),
					today = this.curDate.getDate();

				for (var i = 1; i <= countDays; i++) {
					if (today == i && isToday) {
						html += '<li class="today">' + i + '<span>TODAY</span></li>';
						continue;
					}
					html += '<li' + classToday + '>' + i + '</li>';
				}

				html += '</ul>';
				return html;
			},

			bind: function () {
				var self = this;
				$('a', '#CalendarSwitcher').click(function () {
					self.scrollButton($(this).hasClass('right'));

					return false;
				});

				var dragging = null;
				el.on('mousedown', 'li.month_line', function (e) {
					dragging = e.pageX;
				}).on('mousemove', 'li', function (e) {
					if (dragging) {
						var size = dragging - e.pageX;

						self.scroll(Math.abs(size), ((size < 0) ? false : true), 0);

						dragging = e.pageX;
					}
				}).on('mouseup', function (e) {
					dragging = null;
				});
			},

			scrollButton: function (direction) {
				var size = this.configLine.scrollStep * this.configLine.widthDay;
				console.log(size, direction);
				this.scroll(size, direction);
			},

			scroll: function (size, direction, speed) {
				if (typeof speed == 'undefined') {
					speed = this.configLine.scrollSpeed;
				}

				el.animate({
					left: (direction ? '-' : '+') + '=' + size + 'px'
				}, speed, function () {
					console.log('Ok');
				});
			},

			loading: function (type) {

			}


		},
		model = {},
		el;
})(jQuery);


$(document).ready(function () {
	$('#CalendarLine').calendarLine();
});