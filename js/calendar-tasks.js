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

function Tasks() {

	var root_el = {},
		s_val = '',
		tasks = [],
		position = 0,
		today = new Date();

	today.setHours(0);
	today.setSeconds(0);
	today.setMilliseconds(0);

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

	function getWidthByTime(time) {
		return (53 * (time - 1) / (3600 * 24 * 1000)).toFixed(2);
	}


	function pushEvents(res) {
		var start_time = root_el.find('ul:first').data('time'),
			start_date = new Date(start_time);

		for (var i in res) {
			tasks.push({
				id: res[i][0],
				name: res[i][1],
				start: +res[i][2],
				finish: +res[i][3],
				sd: new Date(+res[i][2]),
				fd: new Date(+res[i][3]),
				left: getWidthByTime(start_time - res[i][2]), //53 * (start_time - res[i][2]) / (3600 * 24 * 1000),
				width: getWidthByTime(res[i][3] - res[i][2] + (25 * 3600)), //53 * (res[i][3] - start_time) / (3600 * 24 * 1000),
				position: position++,
				today: getWidthByTime(+res[i][3] - today.getTime())
			});
		}

		for (var i = tasks.length - 1; i > 0; i--) {
			if (tasks[i] === undefined) {
				console.log(i);
				continue;
			}

			var id = 't_' + tasks[i].id;

			if (!$('#' + id).length) {

				var before = '',
					info = '';
				console.log(tasks[i].today);
				if (tasks[i].today > 0) {
					before = ' style="width: ' + tasks[i].today + 'px"';
				}
				info = tasks[i].name + ' s=' + tasks[i].sd + ' f=' + tasks[i].fd;


				root_el.find('.new_task_bar').append('<div id="' + id + '" data-array=" ' + i + '" class="current_task" style="width:' + tasks[i].width + 'px;margin-left:' + -tasks[i].left + 'px;"><span>' + info + '</span><div' + before + ' class="over_today"></div></div>');
			}
		}

		var height = position * 25;

		if (height < 227) {
			height = 227;
		}
		$('#CalendarLine .calendar ul li[class!=month_line]').height(height + 'px');
		$('#CalendarLine').height(height + 67 + 'px');


	}



	this.init = function () {
		console.log('---====_Start_====---');

		root_el = $('.calendar', '#CalendarLine');
		root_el.append('<div class="new_task_bar"></div>');

		root_el.on('mousedown', '.current_task', function (e) {
			var drag = {
				el: $(this),
				move: e.pageX
			},
				array_id = +drag.el.data('array');

			if (tasks[array_id] === undefined) {
				console.log('Error', 'Don`t have task #' + array_id + ' in tasks array');
				return;
			}

			$(document).mousemove(function (e) {
				var size = parseInt((drag.move - e.pageX)/53);


				if (size != 0) {
					var w = drag.el.width() - size * 53,
						w_today = tasks[array_id].today - size * 53;

					console.log(tasks[array_id].today);

					drag.el.width(w + 'px');
					if (w_today > 0 || tasks[array_id].today > 0) {
						drag.el.find('.over_today').width(w_today + 'px');
					}

					tasks[array_id].width = w;
					tasks[array_id].today = w_today;

					drag.move = e.pageX;
				}

			});
		});




		return this;
	};

	this.dragTask = function (size) {

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
}

var ObjTasks = new Tasks;
