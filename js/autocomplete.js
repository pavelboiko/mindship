$(function () {
	function log(message) {

		$('<div></div>').addClass('token-group').append($('<span></span>').addClass('token').text(message)).append($('<span></span>').addClass('remove-token-group')).prependTo('.tokens');


	}

	var users = [];
	users[0] = {label: 'Eduard V.', 'icon': 'img/usr-photo.png'};
	users[1] = {label: 'Theodosius D. ', 'icon': 'img/usr-photo1.png'};
	users[2] = {label: 'Paul J.', 'icon': 'img/usr-photo2.png'};
	users[3] = {label: 'Ewan S.', 'icon': 'img/usr-photo.png'};
	users[4] = {label: 'Bertram A.', 'icon': 'img/usr-photo1.png'};
	users[5] = {label: 'Augustus H.', 'icon': 'img/usr-photo2.png'};
	users[6] = {label: 'William E.', 'icon': 'img/usr-photo.png'};


	function split(val) {
		return val.split(/,\s*/);
	}

	function extractLast(term) {
		return split(term).pop();
	}

	$("#users").autocomplete({
		minLength: 0,
		source: users,
		focus: function (event, ui) {
			$("#users").val('');
			return false;
		},


		select: function (event, ui) {

			log(ui.item.label);
			$(ui.item.label).remove();

			return false;
		}
	}).data("ui-autocomplete")._renderItem = function (ul, item) {

		return $("<li/>")
			.append('<img class="user_photo" src="'+ item.icon +'" /><a>'+ item.label +'</a>')
			.appendTo(ul);



	}


});
