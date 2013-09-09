function Tasks() {
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
			isLine: false,
			del: false,

			calculatePosition: function (start_time) {
//				var start_time = +root_el.find('ul:first').data('time');
				this.width = getWidthByTime(this.finish - this.start);
				this.left = -getWidthByTime(start_time - this.start);
				this.today = getWidthByTime(this.finish - today.getTime());



				return this;
			},

			calculateVisible: function () {
				var active_line_size = getCalendarSize();

				this.view = (this.left < active_line_size[1] && (this.left + this.width) > active_line_size[0]);

				return this;
			},

			getTemplate: function (i) {
				var id = 't_' + this.id;
				var before_stile = '',
					info = this.name + ' s=' + this.sd + ' f=' + this.fd,
					task_style = 'style="width:' + this.width + 'px;margin-left:' + this.left + 'px;';

				task_style += this.view ? 'display: block;"' : '"';

				if (this.today > 0) {
					before_stile = ' style="width: ' + this.today + 'px"';
				}

				return '<div id="' + id + '" data-array="' + i + '" class="current_task"' + task_style + '><span>' + info + '</span><div' + before_stile + ' class="over_today"></div></div>';
			},

			changeView: function () {

			},

			setLine: function () {
				this.isLine = true;

				return this;
			},

			isTimeLine: function (start_time, finish_time) {
				return (this.start > finish_time || this.finish < start_time);
			}
		};
	}

	var root_el = {},
		s_val = '',
		tasks = [],
		position = 0,
		today = new Date();

	today.setHours(0);
	today.setSeconds(0);
	today.setMilliseconds(0);

	function pushJson(data, func) {
		scrollLine();
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
			finish_ul = root_el.find('ul:last'),

			start_time = +root_el.find('ul:first').data('time'),
			finish_time = +finish_ul.data('time') + (finish_ul.find('li').length - 1) * 24 * 3600 * 1000,

			active_line_size = getCalendarSize();

		for (var i = 0, j = tasks.length; i < j; i++) {
			var exist_task = 0,
				position = -1;

			if (tasks[i].start > finish_time || tasks[i].finish < start_time) {
				$('#t_' + tasks[i].id).remove();
				continue;
			}

			for (var key_nt = 0, count_nt = new_tasks.length; count_nt > key_nt; key_nt++) {
				if (tasks[i].id == new_tasks[key_nt].id) {
					exist_task = 1;
					break;
				}

				if (tasks[i].sd < new_tasks[key_nt].sd) {
					position = key_nt;
					break;
				}
			}

			if (exist_task) {
				continue;
			}

			tasks[i].width = getWidthByTime(tasks[i].finish - tasks[i].start);
			tasks[i].left = -getWidthByTime(start_time - tasks[i].start);
			tasks[i].today = getWidthByTime(tasks[i].finish - today.getTime());
			tasks[i].view = (tasks[i].left < active_line_size[1] && (tasks[i].left + tasks[i].width) > active_line_size[0]);

			new_tasks.splice(position, 0, tasks[i]);
		}

		tasks = new_tasks;
	}


	function addTask(task) {
		task = interfaceTask(task);

		for (var tasks_key = 0, count_tasks = tasks.length; count_tasks > tasks_key; tasks_key++) {
			if (task.id == tasks[tasks_key].id) {
				return false;
			}

			var position = -1;

			if (task.sd >= tasks[tasks_key].sd) {
				position = tasks_key;
				break;
			}
		}

		tasks.splice(tasks_key, 0, task);
		return tasks_key;
	}

	function pushAllEvents(res) {
		var start_time = +root_el.find('ul:first').data('time');

		for (var k in res) {
			var akey = addTask(res[k]);
			if (akey === false) {
				console.log('Error Duble Task', res[k]);

			} else {
				console.log('Add new Task', res[k], akey, tasks[akey]);
			}
		}

		var count_view_tasks = 0;
		for (var key = 0, count_tasks = tasks.length; key < count_tasks; key++) {
			if (!tasks.isLine) {
				var template = tasks[key].calculatePosition(start_time).calculateVisible().setLine().getTemplate(key);
				root_el.find('.new_task_bar').append(template);

				if (tasks[key].view) {
					count_view_tasks++;
				}
			}
		}

		resizeHeightLine(count_view_tasks);
	}

	function pushEvents(res) {
		var start_time = +root_el.find('ul:first').data('time'),
			finish_time = +root_el.find('ul:last').data('time') + 31 * 24 * 3600 * 1000;

		for (var k in res) {
			var akey = addTask(res[k]);
			if (akey === false) {
//				console.log('Error Duble Task', res[k]);
			} else {
//				console.log('Add new Task', res[k], akey, tasks[akey]);
			}
		}

		var count_view_tasks = 0,
			new_tasks = [],
			template = '';

		root_el.find('.new_task_bar').html('');

		for (var key = 0, count_tasks = tasks.length; key < count_tasks; key++) {

			tasks[key].calculatePosition(start_time);

			if (tasks[key].isTimeLine(start_time, finish_time)) {
				continue;
			}

			template += tasks[key].calculateVisible().setLine().getTemplate(key);

			if (tasks[key].view) {
				count_view_tasks++;
			}

			new_tasks.push(tasks[key]);
		}

		root_el.find('.new_task_bar').append(template);

		tasks = new_tasks;

		resizeHeightLine(count_view_tasks);
	}

	function scrollLine(e) {
		var count_view_tasks = 0, start_time = +root_el.find('ul:first').data('time');
		for (var key = 0, count_tasks = tasks.length; key < count_tasks; key++) {
			tasks[key].calculatePosition(start_time).calculateVisible();

			if (tasks[key].view) {
				$('#t_' + tasks[key].id).slideDown();
				count_view_tasks++
			} else
				$('#t_' + tasks[key].id).slideUp();
		}

		resizeHeightLine(count_view_tasks);
	}

	function resizeHeightLine(count_view_tasks) {
		var height_line = count_view_tasks * 25 + 49;
		if (height_line < 227) {
			height_line = 227;
		}

		$('#CalendarLine').height(height_line + 67 + 'px')
			.find('.calendar ul li[class!=month_line]').height(height_line + 'px');
	}


// Public Function
	this.init = function () {
		console.log('---====_Start_====---');

		root_el = $('.calendar', '#CalendarLine');
		root_el.append('<div class="wrapper_task_bar"><div class="new_task_bar"></div></div>');

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
		pushJson(times.join(','), pushAllEvents);
	};

	this.pushData = function (el) {
//		pushEvents({});
		pushJson(el.data('time'), pushEvents);
	};

	this.eventScrollLine = function (e) {
		scrollLine(e);
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


//	function pushEvents1(res) {
//		var start_time = root_el.find('ul:first').data('time'),
//			start_date = new Date(start_time);
//
//		for (var k in res) {
//			tasks.push(interfaceTask(res[k]));
//		}
//
//		siftTasks();
//
//		root_el.find('.new_task_bar').html();
//		for (var i = tasks.length - 1; i > 0; i--) {
//			var id = 't_' + tasks[i].id;
//
//			if (!$('#' + id).length) {
//				var before_stile = '',
//					info = tasks[i].name + ' s=' + tasks[i].sd + ' f=' + tasks[i].fd,
//					task_style = 'style="width:' + tasks[i].width + 'px;margin-left:' + tasks[i].left + 'px;';
//
//				if (tasks[i].today > 0) {
//					before_stile = ' style="width: ' + tasks[i].today + 'px"';
//				}
//
//				if (tasks[i].view) {
////					console.log(tasks[i]);
//					task_style += 'display: block;';
//				}
//
//				task_style += '"';
//
//				root_el.find('.new_task_bar').append('<div id="' + id + '" data-array=" ' + i + '" class="current_task"' + task_style + '><span>' + info + '</span><div' + before_stile + ' class="over_today"></div></div>');
//			} else {
////				console.log(tasks[i], (tasks[i].position) ? 'block' : 'hide');
//
//				$('#' + id).css({
//					width: tasks[i].width,
//					'margin-left': tasks[i].left
//				}).attr('data-array', i).find('.over_today').css({
//						width: (tasks[i].today > 0) ? tasks[i].today : 0
//					});
//
//				if (!tasks[i].view)
//					$('#' + id).slideUp('slow');
//				else if ($('#' + id + ':hidden').length) {
//					console.log(id, tasks[i].view, tasks[i], $('#' + id + ':hidden').length);
//					$('#' + id).slideDown('slow');
//				}
//			}
//		}
//
//		var height = position * 25;
//
//		if (height < 227) {
//			height = 227;
//		}
//		$('#CalendarLine .calendar ul li[class!=month_line]').height(height + 'px');
//		$('#CalendarLine').height(height + 67 + 'px');
//	}