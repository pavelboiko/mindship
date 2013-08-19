var objTasks = {
	init: function () {
		this.bind();
		return this;
	},

	pushAllData: function (times) {
		var self = this;
		$.ajax({
			type: "GET",
			url: "server/tags.php",
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
			url: "server/tags.php",
			data: {t: el.data('time'), s: ''},
			dataType: "json",
			success: function (res) {
				self.push(res, el);
			}
		});
	},

	bind: function () {

	},

	push: function (res, el) {
		this.step = 1;
		var time = +el.data('time');

		if (typeof res[time] == 'undefined') {
			return;
		}

		var models = res[el.data('time')];

		for(var i = 0, c = models.length; i < c; i++) {
			el.append(this.templates(models[i],time));
		}
	},

	step: 1,
	templates:function (model, time) {

		var widthDay = this.parent.configLine.widthDay,
			start = (time - +model[2])/(3600*24*1000),
			end = (+model[3] - time)/(3600*24*1000),
			css = {};

		console.log(model[0], new Date(+model[2]), new Date(+model[3]), start, end, model[6], model[7]);

		css = {
			top: (this.step * 25 + 25) + 'px',
			left: (start * widthDay) + 'px',
			width: (end * widthDay)-10 + 'px'
		};



		if ($('#task_' + model[0]).length) {
			css['top'] = $('#task_' + model[0]).css('top');
			css['left'] = $('#task_' + model[0]).css('left');
			css['width'] = $('#task_' + model[0]).css('width');
		}

		$('#task_' + model[0]).remove();

		this.step++;

		return $('<li id="task_' + model[0] + '" class="task">' + model[1] + ' DS:' + this.gDate(model[2]) + ' DF:' + this.gDate(model[3]) + ' DC:' + this.gDate(time) + '</li>').css(css);
	},

	gDate: function (time) {
		var date = new Date();

		date.setTime(time);
		return date.getDay() + '-' + (date.getMonth()+1) + '-' + date.getFullYear();
	}
//	setLine: function () {
//		var el = $('CalendarLine').find('.calendar'),
//			models = {};
//
//		el.find('ul').each(function () {
//			models[$(this).data('time')] = $(this).find('li');
//		});
//
////		for (var i in this.data) {
////			models[] = {};
////		}
//	}

};