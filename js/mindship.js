/**
 * Created with JetBrains WebStorm.
 * User: Jazz
 * Date: 08.08.13
 * Time: 14:55
 * To change this template use File | Settings | File Templates.
 */


$(document).ready(function() {
    $(".start-toggle").click(function(){
        $("li.submenu ul").slideToggle();
        $("li.submenu1 ul").slideUp();
        $(".pointer-active-bg1").slideToggle(10);
        $(".pointer-active-bg").slideUp(10);
        $(".dark-shroud1").slideToggle();
        $(".dark-shroud").slideUp();

    });
    $(".start-toggle1").click(function(){
        $("li.submenu1 ul").slideToggle();
        $("li.submenu ul").slideUp();
        $(".pointer-active-bg").slideToggle(10);
        $(".pointer-active-bg1").slideUp(10);
        $(".dark-shroud").slideToggle();
        $(".dark-shroud1").slideUp();
    });

    $(".start-toggle").hover( function(){
            $(".pointer").css('color', '#0db2ea'); },
        function(){ 	$(".pointer").css('color', 'white'); }
    );
    $(".start-toggle1").hover( function(){
            $(".pointer1").css('color', '#0db2ea'); },
        function(){ 	$(".pointer1").css('color', 'white'); }
    );

        $("#page_settings2, .pop-up-activator2").hover( function(){
                $('.pop-up-activator2').show(); },
            function(){ 	$('.pop-up-activator2').hide(); }
        );
        $("#page-settings1,.pop-up-activator1").hover( function(){
                $('.pop-up-activator1').show(); },
            function(){ 	$('.pop-up-activator1').hide(); }
        );

        $(".gear, .pop-up-activator").hover( function(){
                $('.pop-up-activator').show(); },
            function(){ 	$('.pop-up-activator').hide(); }
        );

        $(".trash-show").hover( function(){
                $(".trash").show(); },
            function(){ 	$(".trash").hide(); }
        );

        $(".shroud-activator").hover( function(){
                $(".file-shroud-container").show(); },
            function(){ 	$(" .file-shroud-container").hide(); }
        );
        $(".shroud-activator1").hover( function(){
                $(".file-shroud-container1").show(); },
            function(){ 	$(" .file-shroud-container1").hide(); }
        );
        $(" .shroud-activator2").hover( function(){
                $(".file-shroud-container2").show(); },
            function(){ 	$(" .file-shroud-container2").hide(); }
        );
        $(" .shroud-activator3").hover( function(){
                $(".file-shroud-container3").show(); },
            function(){ 	$(" .file-shroud-container3").hide(); }
        );
        $(" .shroud-activator4").hover( function(){
                $(".file-shroud-container4").show(); },
            function(){ 	$(" .file-shroud-container4").hide(); }
        );
        $(" .shroud-activator5").hover( function(){
                $(".file-shroud-container5").show(); },
            function(){ 	$(" .file-shroud-container5").hide(); }
        );
        $(" .shroud-activator6").hover( function(){
                $(".file-shroud-container6").show(); },
            function(){ 	$(" .file-shroud-container6").hide(); }
        );
        $(" .shroud-activator7").hover( function(){
                $(".file-shroud-container7").show(); },
            function(){ 	$(" .file-shroud-container7").hide(); }
        );

        $('.checkbox-user').click( function(){
            if ( $(this).find('input[type="checkbox"]').attr('checked') == true ){
                $(this).find('input[type="checkbox"]').removeAttr('checked') .parent().css('border','');
            } else {
                $(this).find('input[type="checkbox"]').attr('checked', 'checked').parent().css('border','1px solid #0db2ea');
            }
            return false;
        });
        $('.checkbox-user1').click( function(){
            if 		( $(this).find('input[type="checkbox"]').attr('checked') == true ){
                $(this).find('input[type="checkbox"]').removeAttr('checked') .parent().css('border','');
            } else {
                $(this).find('input[type="checkbox"]').attr('checked', 'checked').parent().css('border','1px solid #0db2ea');
            }
            return false;
        });
        $('.checkbox-user2').click( function(){
            if ( $(this).find('input[type="checkbox"]').attr('checked') == true ){
                $(this).find('input[type="checkbox"]').removeAttr('checked') .parent().css('border','');
            } else {
                $(this).find('input[type="checkbox"]').attr('checked', 'checked').parent().css('border','1px solid #0db2ea');
            }
            return false;
        });

        $(".add_todo").click(function () {
            $(".add_todo_list_left").slideToggle(10);
        });
        $(".add_todo1").click(function () {
            $(".add_todo_list_left1").slideToggle(10);
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

    $("#msg_post").click(function () {
        $("#grey-shroud").fadeIn();
        $(" #discussion ").show().animate({top: '+=202px'}, 200);;
    });

    $('.check-boxes-discussion input[type=checkbox]').click(function(){
        if(this.checked) {
            $(this).parent().css('background','#dddddd');
        } else {
            $(this).parent().css('background','');
        }
    });
        $.piroBox_ext({
            piro_speed :700,
            bg_alpha : 0.5,
            piro_scroll : true,
            piro_drag :false,
            piro_nav_pos: 'bottom'
        });

    $(".search input").attr("value", "Search for files");

         var text = "Search for files";

   	$(".search input").focus(function() {

             if($(this).attr("value") == text) $(this).attr("value", "");
        	    });

    $(".search input").blur(function() {

       	        if($(this).attr("value") == "") $(this).attr("value", text);
        	    });

    $(".get_access_input input").attr("value", "Enter your email here and we’re done!");

    var landing_input = "Enter your email here and we’re done!";

    $(".get_access_input input").focus(function() {

        if($(this).attr("value") == landing_input) $(this).attr("value", "");
    });

    $(".get_access_input input").blur(function() {

        if($(this).attr("value") == "") $(this).attr("value", landing_input);
    });



    $(".add_todo_list input").attr("value", "Type a new Todo and hit 'Enter'");

    var add_to_do_input = "Type a new Todo and hit 'Enter'";

    $(".add_todo_list input").focus(function() {

        if($(this).attr("value") == add_to_do_input) $(this).attr("value", "");
    });

    $(".add_todo_list input").blur(function() {

        if($(this).attr("value") == "") $(this).attr("value", add_to_do_input);
    });
    $(".create_task input").attr("value", "Type a new Task and hit 'Enter' to create a new list");

    var create_task_input = "Type a new Task and hit 'Enter' to create a new list";

    $(".create_task input").focus(function() {

        if($(this).attr("value") == create_task_input) $(this).attr("value", "");
    });

    $(".create_task input").blur(function() {

        if($(this).attr("value") == "") $(this).attr("value", create_task_input);
    });


    var discussion_popup_textarea = "Fancy topic goes here";

    $(".diss").focus(function() {

        if($(this).attr("value") == discussion_popup_textarea) $(this).attr("value", "");
    });

    $(".diss").blur(function() {

        if($(this).attr("value") == "") $(this).attr("value", discussion_popup_textarea);
    });

    var discussion_popup_textarea1 = "Once upon a time...";

    $(".diss1").focus(function() {

        if($(this).attr("value") == discussion_popup_textarea1) $(this).attr("value", "");
    });

    $(".diss1").blur(function() {

        if($(this).attr("value") == "") $(this).attr("value", discussion_popup_textarea1);
    });
    });


