var objFiles = {
	models: [],
	s: '',

	format: ['Ps', 'Ai', 'Jpg', 'Xls', 'Doc', 'Txt', 'Pdf', '...'],

	init: function () {
		this.bind();
		return this;
	},

	pushAllData: function (times) {
		var self = this;
		$.ajax({
			type: "GET",
			url: "server/files.php",
			data: { t: times.join(','), s: this.s },
			dataType: "json",
			success: function (res) {
				self.el.find('ul').each(function () {
					var ul = $(this);
					self.push(res, ul);
				});
			}
		});

		return this;
	},

	pushData: function (el) {
		var self = this;

		$.ajax({
			type: "GET",
			url: "server/files.php",
			data: {t: el.data('time'), s: ''},
			dataType: "json",
			success: function (res) {
				self.push(res, el);
			}
		});
	},

	push: function (res, el) {
		var time = el.data('time');

		if (typeof res[time] == 'undefined') {
			return;
		}

		el.find('li div').remove();
		var models = res[el.data('time')];


		for(var i = 0, c = models.length; i < c; i++) {
			var li = el.find('li').eq(models[i].day);

			li.append(this.templates(models[i], li.hasClass('today')));
		}
	},

	templates: function (model, today) {
		var class_id = this.format.indexOf(model.type);
		if (today) {
			if (model.type == '...') {
				class_id--;
			} else if (model.type == 'Pdf') {
				return '';
			}
		}

		return '<div class="f' + class_id + '">' + model.count + 'x<a href="#">' + model.type + '</a></div>';
	},


	/* FILES Functions */
	bind:  function () {
		var self = this;
		$(document).ready(function () {
			$('.datepicker div.date_box').datepicker({
				dateFormat: 'd MM, yy',
				changeMonth: true,
				changeYear: true,
				onSelect: function (text, obj) {
					var datepicker = $(this).parents('.datepicker'),
						time = new Date(obj.selectedYear, obj.selectedMonth, obj.selectedDay).getTime();
					datepicker.find('.date_view').html(text);
					datepicker.find('input').val(time);

					self.changeDate(time);
				}
			})
				.hide()
				.parents('.datepicker').click(function (el) {
					var e = $(el.target).parents('.date_box');
					if (e.length || $(el.target).hasClass('date_box')) {
						return;
					}

					var date_box =  $(this).find('.date_box');
					if (date_box.is(':visible'))
						date_box.hide();
					else
						date_box.show();
				});

			$('#CalendarSearch').keyup(function () { self.changeFilter($(this).val()) });


		}).on('click', function(el) {
				var e = $(el.target).parents('.datepicker');
				if (!e.length && !$(el.target).hasClass('datepicker')) {
					$('.datepicker div.date_box').hide();
				}
			});
	},

	changeDate: function (time) {
		time = parseInt($('#CalendarDateStart').val());

		this.parent
			.setLineDate(new Date(time))
			.clear()
			.renderLine();

	},

	changeFilter: function (filter) {
		if (filter.length < 3 && filter.length != 0) {
			return;
		}

		this.s = filter;

		var times = [];
		this.el.find('ul').each(function () {
			times.push($(this).data('time'));
		});

		this.pushAllData(times);

	}


};