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
			$(this).find('input[type="checkbox"]').removeProp('checked') .parent().css('border','');
		} else {
			$(this).find('input[type="checkbox"]').prop('checked', 'checked').parent().css('border','1px solid #0db2ea');
		}
		return false;
	});
	$('.checkbox-user1').click( function(){
		if ( $(this).find('input[type="checkbox"]').prop('checked') == true ){
			$(this).find('input[type="checkbox"]').removeProp('checked') .parent().css('border','');
		} else {
			$(this).find('input[type="checkbox"]').prop('checked', 'checked').parent().css('border','1px solid #0db2ea');
		}
		return false;
	});
	$('.checkbox-user2').click( function(){
		if ( $(this).find('input[type="checkbox"]').prop("checked") == true ){
			$(this).find('input[type="checkbox"]').removeProp('checked') .parent().css('border','');
		} else {
			$(this).find('input[type="checkbox"]').prop('checked', 'checked').parent().css('border','1px solid #0db2ea');
		}
		return false;
	});


	$(".send-msg-input").click(function () {
		$(".input-dropbox-list").slideToggle(10);
	});

	$("#grey-shroud").click(function () {
		$("#grey-shroud, #pop-up-corner, #pop-up-corner1, #pop-up-select, #pop-up-select1, #pop-up-project, #pop-up-corner2, #discussion, .are-you-sure ").hide();
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
		$(".get_access_login_container").show().animate({top: '+=297px'}, 200);
		$(".get_access_container").hide().animate({top: '-=297px'}, 200);
		$("#log-in").hide();
		$("#register").show();
	});
	$("#register").click(function () {
		$(".get_access_container").show().animate({top: '+=297px'}, 200);
		$(".get_access_login_container").hide().animate({top: '-=297px'}, 200);
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
		  $('.save_task').replaceWith('<div class="edit_task"><a href="#">Edit</a></div>');
	  });

	$('.tasks_checkbox').click( function(){
		if ( $(this).find('input[type="checkbox"]').prop('checked') == true ){
			$(this).find('input[type="checkbox"]').removeProp('checked') .parent().parent().find('.tasks_title').css('color','');

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
	$(".group1").colorbox({rel:'group1'});
});