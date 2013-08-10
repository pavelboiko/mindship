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
				renderNewMonth: 20, // Add new Month if calendar < __% or > 100-__%
				scrollSpeed: 1000,
				scrollStep: 10,
				viewPosCurrentDay: 8,
				widthDay: 53 // width + border days box
			},
			dragging: null,


			init: function (date) {
				if (typeof preventSelection == 'function') {
					preventSelection(document.getElementById('CalendarLine'));
				} else {
					console.log('Sory but don`t have function `preventSelection`!');
				}

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
				var html = '<ul data-time="' + objDate.getTime() + '" style="width: ' + (countDays * this.configLine.widthDay) + ';">' +
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

				el.on('mousedown', 'li.month_line', function (e) {
					self.dragging = e.pageX;
				}).on('mousemove', 'li', function (e) {
					if (self.dragging) {
						var size = self.dragging - e.pageX;
						self.dragging = e.pageX;

						self.drag(Math.abs(size), ((size < 0) ? false : true), 0);


					}
				}).on('mouseup', function () {
					self.dragging = null;
				});

				return this;
			},

			scrollButton: function (direction) {
				var size = this.configLine.scrollStep * this.configLine.widthDay;
				this.scroll(size, direction);
			},

			scroll: function (size, direction) {
				el.stop(true, true).animate({
					left: (direction ? '-' : '+') + '=' + size + 'px'
				}, this.configLine.scrollSpeed, this.corectPosition());
			},

			drag: function (size, direction) {
				el.css({
					left: (direction ? '-' : '+') + '=' + size + 'px'
				});
				this.corectPosition();
			},

			corectPosition: function () {
				var min = el.width() * this.configLine.renderNewMonth/100,
					max = el.width() - (el.parent().width()/2) - min,
					left = Math.abs(parseFloat(el.css('left')));

				if (min > left) {
					this.prependMonth();
				} else if (max < left)  {
					this.appendMonth();
				}
			},

			prependMonth: function () {
				console.log('prependMonth');
				var time = el.find('ul').first().data('time'),
					ul_last = el.find('ul').last(),
					nextMonth = new Date(time);

				nextMonth.setMonth(nextMonth.getMonth() - 1);

				var contMonthDays = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0).getDate();

				el.css({
					width: '+=' + ((contMonthDays * this.configLine.widthDay) - ul_last.width()),
					left: '-=' + (contMonthDays * this.configLine.widthDay)
				}).prepend(this.renderMonth(nextMonth, contMonthDays));

				ul_last.remove();
			},

			appendMonth: function () {
				console.log('appendMonth');
				var time = el.find('ul').last().data('time'),
					ul_first = el.find('ul').first(),
					nextMonth = new Date(time);

				nextMonth.setMonth(nextMonth.getMonth() + 1);

				var contMonthDays = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0).getDate(),
					s = (contMonthDays * this.configLine.widthDay) - ul_first.width();

				el.css({
					width: '+=' + s,
					left: '+=' + ul_first.width()
				}).append(this.renderMonth(nextMonth, contMonthDays));

				ul_first.remove();
			},


			loading: function (type) {

			}


		},
		model = {},
		el;
})(jQuery);

