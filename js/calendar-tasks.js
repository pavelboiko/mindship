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
		return 53 * Math.round((time - 1) / (3600 * 24 * 1000));
	}

	function getCalendarSize() {
		var left = Math.abs(parseFloat(root_el.css('left'))),
			root_width = root_el.parent().width(),
			calendar_width = root_el.width();

		return [left, +left + +root_width];
	}

	function siftTasks(tasks) {
		var new_tasks = [],
			last_line = root_el.find('ul:last'),
			all_line_size = [+root_el.find('ul:first').data('time'), +last_line.data('time') + (last_line.find('li').length - 1) * 24 * 3600 * 1000],
			active_line_size = getCalendarSize();

		position = 0;

		for (var i = 0, j = tasks.length; i < j; i++) {

			var task_left = tasks[i].left + tasks[i].width;

			if (tasks[i].start > all_line_size[1] || tasks[i].finish < all_line_size[0]) {
				console.log(tasks[i].id, all_line_size, tasks[i].start, tasks[i].finish, tasks[i].start > all_line_size[1], tasks[i].finish < all_line_size[0]);
				continue;
			}

			if (tasks[i].left < active_line_size[1] && task_left > active_line_size[0]) {
				tasks[i].position = position;

				position++;
			} else {
				tasks[i].position = 0;
			}

			new_tasks.push(tasks[i]);
		}

		return new_tasks;
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
				left: -getWidthByTime(start_time - res[i][2]), //53 * (start_time - res[i][2]) / (3600 * 24 * 1000),
				width: getWidthByTime(res[i][3] - res[i][2] + (25 * 3600)), //53 * (res[i][3] - start_time) / (3600 * 24 * 1000),
				position: position++,
				today: getWidthByTime(+res[i][3] - today.getTime())
			});
		}
		tasks = siftTasks(tasks);
		console.log(tasks);

		for (var i = tasks.length - 1; i > 0; i--) {
			if (tasks[i] === undefined) {
				console.log(i);
				continue;
			}

			var id = 't_' + tasks[i].id;

			if (!$('#' + id).length) {

				var before_stile = '',
					info = tasks[i].name + ' s=' + tasks[i].sd + ' f=' + tasks[i].fd,
					task_style = 'style="width:' + tasks[i].width + 'px;margin-left:' + tasks[i].left + 'px;';

				if (tasks[i].today > 0) {
					before_stile = ' style="width: ' + tasks[i].today + 'px"';
				}

				if (tasks[i].position) {
					console.log(tasks[i]);
					task_style += 'display: block;';
				}

				task_style += '"';

				root_el.find('.new_task_bar').append('<div id="' + id + '" data-array=" ' + i + '" class="current_task"' + task_style + '><span>' + info + '</span><div' + before_stile + ' class="over_today"></div></div>');
			} else {
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
				var size = parseInt((drag.move - e.pageX) / 53);


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
