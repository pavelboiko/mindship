var objFiles = {
	models: [],
	s: '',

	format: ['Ps', 'Ai', 'Jpg', 'Xls', 'Doc', 'Txt', 'Pdf', '...'],

	init: function () {
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
//				console.log(res);
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

		console.log(res, el,time, typeof res[time]);

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

		return '<div class="f' + class_id + '">' + model.count + 'x <a href="#">' + model.type + '</a></div>';
	}
};