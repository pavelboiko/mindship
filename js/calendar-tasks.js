function Tasks() {

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

	function interfaceTask(json_arr) {
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
			view: false,

			calculatePosition: function (start_time) {
				this.width = getWidthByTime(this.finish - this.start);
				this.left = -getWidthByTime(start_time - this.start);
				this.today = getWidthByTime(this.finish - today.getTime());

				return this;
			},

			calculateVisible: function (left_width, active_line_size) {
				var left = left_width + this.left;

				this.view = (left < active_line_size.right && (left + this.width) > active_line_size.left);

				return this;
			},

			getTemplate: function (i) {
				var id = 't_' + this.id;
				var before_stile = '',
					info = this.id + ' [ ' + this.sd.getDate() + '/' + (this.sd.getMonth() + 1) + '/' + this.sd.getFullYear() + ' , ' + this.fd.getDate() + '/' + (this.fd.getMonth() + 1) + '/' + this.fd.getFullYear() + ' ]',
					task_style = 'style="width:' + this.width + 'px;margin-left:' + this.left + 'px;',
					y = '';

				task_style += this.view ? 'display: block;"' : '"';

				if (this.today > 0) {
					before_stile = ' style="width: ' + this.today + 'px"';
				} else {
					y = ' y';
				}

				return '<div id="' + id + '" data-array="' + i + '" class="task' + y + '"' + task_style + '><b>' + info + '</b><span' + before_stile + ' class="over_today"></span></div>';
			},

			emptyTimeLine: function (start_time, finish_time) {
				return (this.start > finish_time || this.finish < start_time);
			}
		};
	}

	function getWidthByTime(time) {
		return 53 * Math.round((time) / (3600 * 24 * 1000));
	}

	function getCalendarSize() {
		var left = Math.abs(parseFloat(root_el.css('left'))),
			root_width = root_el.parent().width();

		return {left: left, right: left + +root_width};
	}

	function createTask(task) {
		task = interfaceTask(task);

		for (var tasks_key = 0, count_tasks = tasks.length; count_tasks > tasks_key; tasks_key++) {
			if (task.id == tasks[tasks_key].id) {
				return false;
			}

			var position = -1;

			if (task.sd > tasks[tasks_key].sd) {
				position = tasks_key;
				break;
			}
		}

		tasks.splice(tasks_key, 0, task);
		return tasks_key;
	}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	function viewTasks(template) {
		root_el.find('.new_task_bar').remove();
		root_el.find('ul:eq(1)').append('<li class="new_task_bar">' + template + '</li>');
	}

	function resizeHeightLine(count_view_tasks) {
		var height_line = count_view_tasks * 25 + 49;
		if (height_line < 227) {
			height_line = 227;
		}

		$('#CalendarLine').height(height_line + 67 + 'px')
			.find('.calendar ul li[class!=month_line]').height(height_line + 'px');
	}

	function pushAllEvents(tasks_array) {
		var start_visible = +root_el.find('ul:eq(1)').data('time'),

			active_line_size = getCalendarSize(),
			left_width = +root_el.find('ul:first').width(),

			count_view_tasks = 0,
			template = '';

		for (var k in tasks_array) {
			createTask(tasks_array[k]);
		}

		for (var key = 0, count_tasks = tasks.length; key < count_tasks; key++) {
			template += tasks[key]
				.calculatePosition(start_visible)
				.calculateVisible(left_width, active_line_size)
				.getTemplate(key);

			if (tasks[key].view) {
				count_view_tasks++;
			}
		}

		viewTasks(template);
		resizeHeightLine(count_view_tasks);
	}

	function pushEvents(tasks_array) {
		var start_time = +root_el.find('ul:first').data('time'),
			finish_time = +root_el.find('ul:last').data('time') + 31 * 24 * 3600 * 1000,

			start_visible = +root_el.find('ul:eq(1)').data('time'),

			active_line_size = getCalendarSize(),
			left_width = +root_el.find('ul:first').width(),

			count_view_tasks = 0,
			temp_tasks = [],
			template = '';

		for (var k in tasks_array) {
			createTask(tasks_array[k]);
		}

		for (var key = 0, count_tasks = tasks.length; key < count_tasks; key++) {
			tasks[key].calculatePosition(start_visible);

			if (tasks[key].emptyTimeLine(start_time, finish_time)) {
				continue;
			}

			template += tasks[key]
				.calculateVisible(left_width, active_line_size)
				.getTemplate(key);

			if (tasks[key].view) {
				count_view_tasks++;
			}

			temp_tasks.push(tasks[key]);
		}

		tasks = temp_tasks;

		viewTasks(template);
		resizeHeightLine(count_view_tasks);
	}

	function scrollLine() {
		var count_view_tasks = 0,

			active_line_size = getCalendarSize(),
			left_width = +root_el.find('ul:first').width();

		for (var key = 0, count_tasks = tasks.length; key < count_tasks; key++) {
			tasks[key].calculateVisible(left_width, active_line_size);

			if (tasks[key].view) {
				$('#t_' + tasks[key].id).slideDown();
				count_view_tasks++
			} else {
				$('#t_' + tasks[key].id).slideUp();
			}
		}

		resizeHeightLine(count_view_tasks);
	}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	var task_drag = 0,
		root_el = {},
		s_val = '',
		tasks = [],
		today = new Date();

	today.setHours(0);
	today.setSeconds(0);
	today.setMilliseconds(0);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	this.init = function () {
		root_el = $('.calendar', '#CalendarLine');

		root_el.on('mousedown', '.task', function (e) {
			task_drag = 1;

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

		$(document).mouseup(function () {
			task_drag = 0;
		});

		return this;
	};

	this.changeSearch = function (s) {
		s_val = s;
	};

	this.pushAllData = function (times) {
		pushJson(times.join(','), pushAllEvents);
	};

	this.pushData = function (el) {
		pushJson(el.data('time'), pushEvents);
	};

	this.eventScrollLine = function (e) {
		scrollLine();
	};

	this.isDrag = function () {
		return task_drag;
	};

//TODO: For test
	this.allTask = function () {
		console.log(tasks);
	};
	this.arrayT = function (view) {
		for (var i = 0; i < tasks.length; i++) {
			var s = [];
			switch (view) {
				case 1:
					if (tasks[i].view)
						s = [ tasks[i].id, tasks[i].start, tasks[i].sd, tasks[i].view ];
					break;
				default :
					s = [ tasks[i].id, tasks[i].start, tasks[i].sd, tasks[i].view ];

			}
			console.log(s);
		}
	}
	this.countT = function () {
		console.log(tasks.length);
	}
}

var ObjTasks = new Tasks;