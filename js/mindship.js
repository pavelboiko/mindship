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


	$("#grey-shroud").click(function () {
		$("#grey-shroud, #discussion, .are-you-sure ").hide();
	});
	$("#grey-shroud ").click(function () {
		$("#discussion ").hide().animate({top: '-=202px'}, 200);
		$("#grey-shroud").hide();
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
	});

	$("#msg_post, #post_msg").click(function () {
		$("#grey-shroud").fadeIn();
		$(" #discussion ").show().animate({top: '+=202px'}, 200);
	});


	$('.check-boxes-discussion input[type=checkbox]').click(function () {
		if (this.checked) {
			$(this).parent().css('background', '#dddddd');
		} else {
			$(this).parent().css('background', '');
		}
	});

	$('.save_task').click(function () {
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
	$('.edit_task').click(function () {
		$(this).parent().find('.task_slider_container').hide();
		$(this).parent().find('.choose_period_tasks').show();
		$(this).parent().find('.edit_task').hide();
		$(this).parent().find('.save_task').show();
		$('#invisible_shroud').show();
	});

	$('input[type="checkbox"]').removeAttr('checked');
	$('.tasks_checkbox').click(function () {
		if ($(this).find('input[type="checkbox"]').prop('checked') == true) {
			$(this).find('input[type="checkbox"]').prop({"checked": false}).parent().parent().find('.tasks_title').css('color', '');

		} else {
			$(this).find('input[type="checkbox"]').prop('checked', 'checked').parent().parent().find('.tasks_title').css('color', '#d1d1d1');
		}
		$(this).find('input[type="checkbox"]').parent().parent().find('.task_completed').toggle();
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
	$("#users").Watermark("Choose Users");

	$(".group1").colorbox({rel: 'group1'});


	$("#create_task_trigger").keypress(function (e) {
		if (e.which == 13) {
			var new_task_name = $('.create_task1 input').val();
			$('#new_tasks_checkbox_container_trigger  span.tasks_title').text(new_task_name);
			$('input:text').val('');
			$($('#new_tasks_checkbox_container_trigger')).clone(true, true).removeAttr('id').prependTo($('.tasks_checkboxes_container'));
		}
	});

	$('.info_close').click(function () {
		$(this).parent().hide(500,
			function () {
				$(this).remove();
				if (!$('.info_message_container').length) {
					$('.info_container').slideUp();
				}
			});

	});


});