/**
 * Created with JetBrains WebStorm.
 * User: Jazz
 * Date: 08.08.13
 * Time: 14:55
 * To change this template use File | Settings | File Templates.
 */
(function ($) {
	$.fn.Watermark = function (text) {
		return this.each(function () {
				var input = $(this);

				function clearMessage() {
					if (input.val() == text)
						input.val("");
				}

				function insertMessage() {
					if (input.val().length == 0 || input.val() == text) {
						input.val(text);
					}
				}

				input.focus(clearMessage);
				input.blur(insertMessage);
				input.change(insertMessage);

				insertMessage();
			}
		);
	};
})(jQuery);


$(document).ready(function () {
	$(".start-toggle").click(function () {
		$("li.submenu ul").slideToggle();
		$("li.submenu1 ul").slideUp();
		$(".pointer-active-bg1").slideToggle(10);
		$(".pointer-active-bg").slideUp(10);
		$(".dark-shroud1").slideToggle();
		$(".dark-shroud").slideUp();

	});
	$(".start-toggle1").click(function () {
		$("li.submenu1 ul").slideToggle();
		$("li.submenu ul").slideUp();
		$(".pointer-active-bg").slideToggle(10);
		$(".pointer-active-bg1").slideUp(10);
		$(".dark-shroud").slideToggle();
		$(".dark-shroud1").slideUp();
	});
	$('.checkbox-user').click( function(){
		if ( $(this).find('input[type="checkbox"]').prop('checked') == true ){
			$(this).find('input[type="checkbox"]').prop({"checked":false}) .parent().css('border','');
		} else {
			$(this).find('input[type="checkbox"]').prop('checked', 'checked').parent().css('border','1px solid #0db2ea');
		}
		return false;
	});

//	$(".send-msg-input").click(function () {
//		$(".input-dropbox-list").slideToggle(10);
//	});

	$("#grey-shroud").click(function () {
		$("#grey-shroud, #discussion, .are-you-sure ").hide();
	});
	$("#grey-shroud ").click(function () {
		$("#discussion ").hide().animate({top: '-=202px'}, 200);
		$("#grey-shroud").hide();
		$(".input-dropbox-list").hide();
	});
	$("#grey-shroud1, .yes-button, .no-button").click(function () {
		$("#delete-persone ").hide().animate({top: '-=275px'}, 200);
		$("#grey-shroud1").hide();
	});

	$("#grey-shroud2, .yes-button, .no-button").click(function () {
		$(".are-you-sure ").hide().animate({top: '-=275px'}, 200);
		$("#grey-shroud2").hide();
	});

	$(".trash").click(function () {
		$("#grey-shroud2").fadeIn();
		$(" .are-you-sure ").show().animate({top: '+=275px'}, 200);
	});
	$(".delete").click(function () {
		$("#grey-shroud2").fadeIn();
		$(" .are-you-sure ").show().animate({top: '+=275px'}, 200);
	});
	$("#remove-ppl").click(function () {
		$("#grey-shroud1").fadeIn();
		$(" #delete-persone").show().animate({top: '+=275px'}, 200);
	});
	$("#send-msg").click(function () {
		$("#grey-shroud").fadeIn();
		$(" #discussion ").show().animate({top: '+=202px'}, 200);
	});
	$("#shut-down").click(function () {
		$("#grey-shroud").hide();
		$(" #discussion ").hide().animate({top: '-=202px'}, 200);
	});
	$("#shut-down1").click(function () {
		$("#grey-shroud").hide();
		$(" #discussion ").hide().animate({top: '-=202px'}, 200);
		$(".input-dropbox-list").hide();
	});

	$("#msg_post, #post_msg").click(function () {
		$("#grey-shroud").fadeIn();
		$(" #discussion ").show().animate({top: '+=202px'}, 200);
	});
	$("#log-in").click(function () {
		$(".get_access_type_your_e-mail").show();
		$(".get_access_text_log-in").show();
		$(".get_access_password").animate({top: '+=65px'}, 400);
		$(".get_access_buttons_container").animate({top: '+=65px'}, 400);
		$(".get_access_text").hide();
		$(".get_access_input").hide();
		$(".get_access_container").animate({paddingBottom: +60}, 400);

		$("#log-in").hide();
		$("#register").show();
	});
	$("#register").click(function () {
		$(".get_access_type_your_e-mail").hide();
		$(".get_access_password").animate({top: '-=65px'}, 400);
		$(".get_access_text").show();
		$(".get_access_input").show();
		$(".get_access_text_log-in").hide();
		$(".get_access_container").animate({paddingBottom: -60}, 400);
		$(".get_access_buttons_container").animate({top: '-=65px'}, 400);
		$("#register").hide();
		$("#log-in").show();
	});

	$('.check-boxes-discussion input[type=checkbox]').click(function () {
		if (this.checked) {
			$(this).parent().css('background', '#dddddd');
		} else {
			$(this).parent().css('background', '');
		}
	});

	$('.save_task').click(function (){
		$(this).parent().find('.task_slider_container').show();
		$(this).parent().find('.choose_period_tasks').hide();
		$(this).parent().find('.edit_task').show();
		$(this).parent().find('.save_task').hide();
		$('#invisible_shroud').hide();
	});

	$('#invisible_shroud').click(function () {
		$('#invisible_shroud').hide();
		$(this).parent().find('.task_slider_container').show();
		$(this).parent().find('.choose_period_tasks').hide();
		$(this).parent().find('.edit_task').show();
		$(this).parent().find('.save_task').hide();

	});
	$('.edit_task').click(function (){
		$(this).parent().find('.task_slider_container').hide();
		$(this).parent().find('.choose_period_tasks').show();
		$(this).parent().find('.edit_task').hide();
		$(this).parent().find('.save_task').show();
		$('#invisible_shroud').show();
	});

	$('input[type="checkbox"]').removeAttr('checked');
	$('.tasks_checkbox').click( function(){
		if ( $(this).find('input[type="checkbox"]').prop('checked') == true ){
			$(this).find('input[type="checkbox"]').prop({"checked":false}) .parent().parent().find('.tasks_title').css('color','');

		} else {
			$(this).find('input[type="checkbox"]').prop('checked', 'checked').parent().parent().find('.tasks_title').css('color','#d1d1d1');
		}  	$(this).find('input[type="checkbox"]').parent().parent().find('.task_completed').toggle();
		return false;
	});

	$('#CalendarSearch').Watermark('Search for files');
	$('input', '.get_access_input').Watermark('Enter your email here and we’re done!');
	$('input', ".add_todo_list").Watermark("Type a new Todo and hit 'Enter'");
	$('input', ".create_task").Watermark("Type Task name and hit 'Enter'");
	$('input', ".create_task1").Watermark("Type Task name and hit 'Enter'");
	$('input', ".diss").Watermark("Fancy topic goes here");
	$('input', ".diss1").Watermark("Once upon a time...");
	$('input', ".get_access_type_your_e-mail").Watermark("Your e-mail");
	$('input', ".get_access_password").Watermark("Password");
	$('input', ".autocomplete-input").Watermark("");
	$(".group1").colorbox({rel:'group1'});


	$("#create_task_trigger").keypress(function(e) {
		if ( e.which == 13 ) {
			var new_task_name = $('.create_task1 input').val();
			$('#new_tasks_checkbox_container_trigger > a > span.tasks_title').text(new_task_name);
			$('input:text').val('');
			$( $('#new_tasks_checkbox_container_trigger')).clone(true, true).removeAttr('id').prependTo($('.tasks_checkboxes_container'));
		}
	});

	var init = function() {
//--- start example code ---

		var users = ['Andrey Grigorjev','Andy Warhole','Andrew Catcher','Andrey Grigorjev','Andy Warhole','Andrew Catcher','Andrey Grigorjev','Andy Warhole','Andrew Catcher'];

		var config = {
			placeholderHTML: 'Choose Users',
			lists: {
				cities: {
					ajaxOpts: {
						url: 'api/cities.php?state=TX&q={input}&includeCommon=false'
					},
					options: users
				}
			}
		};
		var widget = new AutoComplete('search_bar', config);
		$('#shut-down1').on('click', widget.clear);
		$('#grey-shroud').on('click', widget.clear);
		$('#send_message').on('click', widget.clear);


//--- end example code ---
	}; // end init()
	$(document).ready(init);
	$('.send-msg-top-input').click(function(){
		$('ul.dropdown').hide();
	});
	$('.send-msg-top-input').click(function(){
		$('ul.dropdown').hide();
	});
});