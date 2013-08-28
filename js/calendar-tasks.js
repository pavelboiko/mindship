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

		for (var i = 0, c = models.length; i < c; i++) {
			el.append(this.templates(models[i], time));
		}
	},

	step: 1,
	templates: function (model, time) {

		var widthDay = this.parent.configLine.widthDay,
			start = (time - +model[2]) / (3600 * 24 * 1000),
			end = (+model[3] - time) / (3600 * 24 * 1000),
			css = {};

		console.log(model[0], new Date(+model[2]), new Date(+model[3]), start, end, model[6], model[7]);

		css = {
			top: (this.step * 25 + 25) + 'px',
			left: (start * widthDay) + 'px',
			width: (end * widthDay) - 10 + 'px'
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
		return date.getDay() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
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

var ObjTasks = new (function () {

	var root_el = {},
		s_val = '',
		tasks = {},
		position = 0;

	$(document).ready(function () {

	});

	function pushJson(data, func) {
		data = {
			s: s_val,
			t: data
		};

		$.ajax({
			type: "GET",
			url: "server/tags.php",
			data: data,
			dataType: "json",
			success: func
		});
	}

	function pushEvents(res) {
		var start_time = root_el.find('ul:first').data('time'),
			start_date = new Date(start_time);

		console.log(start_time, start_date);

		for (var i in res) {
			tasks[i] = {
				name: res[i][1],
				start: +res[i][2],
				finish: +res[i][3],
				left: 53 * (start_time - res[i][2]) / (3600 * 24 * 1000),
				width: 53 * (res[i][3] - start_time) / (3600 * 24 * 1000),
				position: position++,
				today: null
			};
		}

//		var task_bar = root_el.find('new_task_bar');
//		console.log(task_bar, root_el);
		for (var i in tasks) {
			root_el.find('.new_task_bar').append('<div id="t_' + i + '" class="current_task" style="width:' + tasks[i].width +'px;left:' + tasks[i].left +'px;"><div class="before_today"></div></div>');
		}

		console.log(tasks);
	}

	function template() {

	}


	this.init = function () {
		console.log('---====_Start_====---');

		$('.calendar', '#CalendarLine').append('<div class="new_task_bar"></div>');

		root_el =  $('.calendar', '#CalendarLine');

		return this;
	};

	this.changeSearch = function (s) {
		s_val = s;
	};

	this.pushAllData = function (times) {
		pushJson(times.join(','), pushEvents);
	};

	this.pushData = function (el) {
		pushJson(el.data('time'), pushEvents);
	};

	return this;
})();
