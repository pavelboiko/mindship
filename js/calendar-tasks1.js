var objTasks = {

	currentTaskPrevX : 0,
	currentTaskMove : null,

	init: function () {

		this.bind();
		return this;
	},



	pushAllData: function (times) {
		var self = this;
		var preset_task = [];

		$.ajax({
			type: "GET",
			url: "http://asd-team.com/public/mindship/server/tasks.php",
			data: { t: times.join(','), s: this.s },
			dataType: "jsonp",
			success: function(data) {
				 var items = [];

				for (var x in data){
					var tasks = data[x];
					for (var i=0; i<tasks.length; i++)  {
					  var task = tasks[i];
					  var taskBarWidth = (task.length -2 )* 53;
					  var taskBarMarginLeft = (task.dateStart ) * 53;

						var currentTask = new Date(parseInt(x));
						var currentTaskMonth = currentTask.getMonth();

						var currentDate = new Date();
						var currentMonth = currentDate.getMonth();

						var currentDay = currentDate.getDate();


						var task_div = $("<div class='current_task'></div>").css({"width": taskBarWidth,"left": taskBarMarginLeft});
						$('div#' + x + ' .new_task_bar').append(task_div);
						var currentOverToday = (task.dateEnd  - currentDay +1 ) * 53;
						console.log(currentOverToday);

						if  (currentMonth == currentTaskMonth) {
							if ((currentDay<=task.dateEnd) && (task.dateStart <= currentDay) )   {
								task_div.append("<div id='before_today' class='over_today'></div>");

								$('#before_today').css("width",currentOverToday);
							}

						}
						if ( task.dateStart >= currentDay){
							task_div.append("<div id= 'after_today' class='over_today'></div>");
							$('#after_today').css("width","100%");
						}



						$(task_div).mousedown( function(e){

						e.preventDefault();

						$(document).mousemove(function(e){


							var task_left = task_div.position().left + task_div.parent().parent().position().left + task_div.parent().parent().parent().offset().left;

							var task_width = task_div.width();

							var drag_width =  e.pageX - task_left;

							var findTaskLenght =  drag_width / 53;
							var findTaskLenght =  parseInt(findTaskLenght, 10); // новая длительность проекта

							var findTaskDateEnd = +task.dateStart + findTaskLenght;// новая дата окончания проекта

							var overTodayWidth =  findTaskDateEnd - currentDay +1 ;
							var overTodayWidth = overTodayWidth * 53;


						   if ((e.pageX > this.currentTaskPrevX) && (e.pageX > task_left + task_width)){
							   task_div.css("width", task_width + 53);
							   $('.over_today').css("width", overTodayWidth );
						   }
						   if ((e.pageX < this.currentTaskPrevX) && (e.pageX <task_left + task_width))  {
							   task_div.css("width", task_width - 53);
							   $('.over_today').css("width", overTodayWidth -53 );
						   }

							this.currentTaskPrevX = e.pageX;

						});

					});
					$(document).mouseup(function(e){

						$(document).unbind('mousemove');
					});


				}
			}

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