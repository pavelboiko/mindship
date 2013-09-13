(function ($) {
	$.fn.calendarLine = function (model) {
		el = this.find('.calendar');

		view.init(model);
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


			init: function (model) {
				if (typeof preventSelection == 'function') {
					preventSelection(document.getElementById('CalendarLine'));
				} else {
					console.log('Sory but don`t have function `preventSelection`!');
				}

				this.setLineDate(new Date());


				this.model = model.init();
				this.model.el = el;
				this.model.parent = this;

				this.clear()
					.renderLine()
					.bind();
			},

			setLineDate: function (obj) {
				this.curDate = obj;
				return this;
			},

			renderLine: function () {
				var html = '',
					contMonthDays = 0,
					countAllDays = 0,
					leftMonthCount = ~~((this.countMonthBox) / 2),
					nextMonth = new Date(this.curDate.getFullYear(), this.curDate.getMonth() - leftMonthCount),
					startPosition = 0,
					times = [];

				for (var i = 0; i < this.countMonthBox; i++) {
					times.push(nextMonth.getTime());

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
				}).append(html);

				this.model.pushAllData(times);

				return this;
			},

			clear: function () {
				el.find('ul').remove();

				return this;
			},

			renderMonth: function (objDate, countDays) {
				var html = '<ul data-time="' + objDate.getTime() + '" style="width: ' + (countDays * this.configLine.widthDay) + 'px;">' +
						'<li class="month_line">' + monthsLong[objDate.getMonth()] + ' ' + objDate.getFullYear() + '</li>',
					classToday = '',
					defDate = new Date(),
					isToday = objDate.getMonth() == defDate.getMonth() && objDate.getFullYear() == defDate.getFullYear(),
					today = defDate.getDate();

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

				el.on('mousedown', function (e) {
					var dragging = e.pageX;
					$(document).mousemove(function (e) {
						if (($(e.target).hasClass('task') || $(e.target).parents('.task').length) && self.model.isDrag()) {
							return;
						}

						var size = dragging - e.pageX;
						dragging = e.pageX;

						self.drag(Math.abs(size), !(size < 0), 0);
					});

				});

				$(document).mouseup(function () {
					$(this).unbind('mousemove');
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
				if (this.model.eventScrollLine) {
					this.model.eventScrollLine();
				}
			},

			prependMonth: function () {
				var time = el.find('ul').first().data('time'),
					ul_last = el.find('ul').last(),
					nextMonth = new Date(time);

				nextMonth.setMonth(nextMonth.getMonth() - 1);

				var contMonthDays = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0).getDate();

				var month = $(this.renderMonth(nextMonth, contMonthDays));

				var a = el.css({
					width: '+=' + ((contMonthDays * this.configLine.widthDay) - ul_last.width()) + 'px',
					left: '-=' + (contMonthDays * this.configLine.widthDay) + 'px'
				}).prepend(month);

				ul_last.remove();

				this.model.pushData(month);
			},

			appendMonth: function () {
				var time = el.find('ul').last().data('time'),
					ul_first = el.find('ul').first(),
					nextMonth = new Date(time);

				nextMonth.setMonth(nextMonth.getMonth() + 1);

				var contMonthDays = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0).getDate(),
					s = (contMonthDays * this.configLine.widthDay) - ul_first.width();

				var month = $(this.renderMonth(nextMonth, contMonthDays));

				el.css({
					width: '+=' + s + 'px',
					left: '+=' + ul_first.width() + 'px'
				}).append(month);

				ul_first.remove();

				this.model.pushData(month);
			}


		},
		model = {},
		el;
})(jQuery);

