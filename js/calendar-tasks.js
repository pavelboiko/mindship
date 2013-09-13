function Tasks() {
	var day_width = 53;
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

			getLeftDays: function () {
				var left = this.today / day_width;

				if (left <= 0) {
					left = 'overdue';
				} else if (left == 1) {
					left = 'today';
				} else if (left == 2) {
					left = 'tomorrow';
				} else {
					left = 'in ' + left + ' days';
				}

				return left;
			},

			getTemplate: function (i) {
				var id = 't_' + this.id;
				var before_stile = '',
					info = this.id + ' [ ' + this.sd.getDate() + '/' + (this.sd.getMonth() + 1) + '/' + this.sd.getFullYear()
						+ ' , '
						+ this.fd.getDate() + '/' + (this.fd.getMonth() + 1) + '/' + this.fd.getFullYear() + ' ]',
					task_style = 'style="width:' + this.width + 'px;margin-left:' + this.left + 'px;',
					y = '';

				task_style += this.view ? 'display: block;"' : '"';

				if (this.today > 0) {
					before_stile = ' style="width: ' + this.today + 'px"';
				} else {
					y = ' y';
				}

				return '<div id="' + id + '" data-array="' + i + '" class="task' + y + '"' + task_style + '><span>' + info + '</span><span class="left_days">' + this.getLeftDays() + '</span><div' + before_stile + ' class="over_today"></div></div>';
			},

			emptyTimeLine: function (start_time, finish_time) {
				return (this.start > finish_time || this.finish < start_time);
			},

			setNewFinish: function (date) {
				this.finish = +date;
				this.fd = new Date(this.start);

				$.ajax({
					type: "GET",
					url: "server/edit_task.php",
					data: {finish: this.finish},
					dataType: "json",
					success: function () {

					}
				});

				var start_visible = +root_el.find('ul:eq(1)').data('time'),
					active_line_size = getCalendarSize(),
					left_width = +root_el.find('ul:first').width();

				this.calculatePosition(start_visible)
					.calculateVisible(left_width, active_line_size);

				return this;
			},

			updateVisible: function () {
				var Task = $('#t_' + this.id);
				Task.css({
					width: this.width + 'px',
					'margin-left': this.left + 'px'
				}).find('.over_today').css({ width: this.today + 'px' })
					.end().find('.left_days').html(this.getLeftDays());
				if (this.today > 0) {
					Task.removeClass('y');
				} else {
					Task.addClass('y');
				}
			}
		};
	}

	function getWidthByTime(time) {
		return day_width * Math.round((time) / (3600 * 24 * 1000));
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
		root_el.find('.task_bar').remove();
		root_el.find('ul:eq(1)').append('<li class="task_bar">' + template + '</li>');
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

			temp_tasks.push(tasks[key]);

			template += tasks[key]
				.calculateVisible(left_width, active_line_size)
				.getTemplate(temp_tasks.length - 1);

			if (tasks[key].view) {
				count_view_tasks++;
			}

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
				var size = parseInt((drag.move - e.pageX) / day_width);


				if (size != 0) {
					var finish = tasks[array_id].finish - (size * 3600 * 24 * 1000);

					if (finish > tasks[array_id].start) {
						tasks[array_id].setNewFinish(finish).updateVisible();
					}

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

	this.eventScrollLine = function () {
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