var objTasks = {
	init: function () {
		this.getData()
			.setTask()
			.setLine();
	},
	data: [],

	getData: function () {
		this.data = [
			{
				title: 'Landing page functionality 0',
				date_start: 1372626560450,
				date_end: 1372627560450,
				author: '',
				comments: 16,
				files: 2
			},
			{
				title: 'Landing page functionality 1',
				date_start: 1372626560450,
				date_end: 1372627560450,
				author: '',
				comments: 16,
				files: 2
			},
			{
				title: 'Landing page functionality 2',
				date_start: 1372626560450,
				date_end: 1372627560450,
				author: '',
				comments: 16,
				files: 2
			},
			{
				title: 'Landing page functionality 3',
				date_start: 1372626560450,
				date_end: 1372627560450,
				author: '',
				comments: 16,
				files: 2
			},
			{
				title: 'Landing page functionality 4',
				date_start: 1372626560450,
				date_end: 1372627560450,
				author: '',
				comments: 16,
				files: 2
			}
		];
	},

	setTask: function () {

		return this;
	},

	setLine: function () {
		var el = $('CalendarLine').find('.calendar'),
			models = {};

		el.find('ul').each(function () {
			models[$(this).data('time')] = $(this).find('li').
		});

//		for (var i in this.data) {
//			models[] = {};
//		}
	}

};