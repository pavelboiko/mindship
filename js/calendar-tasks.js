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

	function siftTasks() {
		var new_tasks = [],
			key_array = [],
			finish_ul = root_el.find('ul:last'),

			start_time = +root_el.find('ul:first').data('time'),
			finish_time = +finish_ul.data('time') + (finish_ul.find('li').length - 1) * 24 * 3600 * 1000,

			active_line_size = getCalendarSize();

		for (var i = 0, j = tasks.length; i < j; i++) {
			if (key_array.indexOf(tasks[i].id) >= 0 || tasks[i].start > finish_time || tasks[i].finish < start_time) {
				if ($('#' + tasks[i].id).length) {
					console.log($('#' + tasks[i].id));
					$('#' + tasks[i].id).remove();
				}

				continue;
			}

			tasks[i].width = getWidthByTime(tasks[i].finish - tasks[i].start);
			tasks[i].left = -getWidthByTime(start_time - tasks[i].start);
			tasks[i].today = getWidthByTime(tasks[i].finish - today.getTime());

			var task_left = tasks[i].left + tasks[i].width;

			tasks[i].position = (tasks[i].left < active_line_size[1] && task_left > active_line_size[0]) ? 1 : 0;

			new_tasks.push(tasks[i]);
			key_array.push(tasks[i].id); // For test
		}

		tasks = new_tasks;
	}

	function interfaceTask (json_arr) {
		return {
			id: json_arr[0],
			name: json_arr[1],
			start: +json_arr[2],
			finish: +json_arr[3],
			sd: new Date(+json_arr[2]), // For Test
			fd: new Date(+json_arr[3]), // For Test
			left: 0,
			width: 0,
			today: 0,
			position: 0
		}
	}

	function pushEvents(res) {
		var start_time = root_el.find('ul:first').data('time'),
			start_date = new Date(start_time);

		for (var k in res) {
			tasks.push(interfaceTask(res[k]));
		}

		siftTasks();

		root_el.find('.new_task_bar').html();
		for (var i = tasks.length - 1; i > 0; i--) {
			if (tasks[i] === undefined) {
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
				console.log(tasks[i], (tasks[i].position) ? 'block' : 'hide');

				$('#' + id).css({
					width: tasks[i].width,
					'margin-left': tasks[i].left
				}).attr('data-array', i).find('.over_today').css({
					width: (tasks[i].today > 0) ? tasks[i].today : 0
				});

				if (tasks[i].position)
					$('#' + id).slideDown();
				else
					$('#' + id).slideUp();
			}
		}

		var height = position * 25;

		if (height < 227) {
			height = 227;
		}
		$('#CalendarLine .calendar ul li[class!=month_line]').height(height + 'px');
		$('#CalendarLine').height(height + 67 + 'px');
	}

	function scrollLine(e) {
		var active_line_size = getCalendarSize();
		for (var i = tasks.length - 1; i > 0; i--) {
			var task_left = tasks[i].left + tasks[i].width;
			var id = 't_' + tasks[i].id;

			tasks[i].position = (tasks[i].left < active_line_size[1] && task_left > active_line_size[0]) ? 1 : 0;

			$('#' + id).css({
				width: tasks[i].width,
				'margin-left': tasks[i].left
			}).attr('data-array', i).find('.over_today').css({
					width: (tasks[i].today > 0) ? tasks[i].today : 0
				});

			if (tasks[i].position)
				$('#' + id).slideDown();
			else
				$('#' + id).slideUp();
		}
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
		pushEvents({});
//		pushJson(el.data('time'), pushEvents);
	};

	this.eventScrollLine = function (e) {
//		console.log(e);
		scrollLine(e);
	}
}

var ObjTasks = new Tasks;
