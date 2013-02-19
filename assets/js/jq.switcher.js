/************************  
	switch plugin 
************************/
/*
 * jQuery toggle Switch Plugin
 * Author: visioncan
 * date 2011-08-31
 * Copyright:
 * 
 * @example: $.toggleSwitcher();
 * @html: <input name="" type="switch" value="1" />
 * @param Object  callback - callback function on switchs
 * @return jQuery
*/
(function($){
	var defaults = {
		callback  : function(val, switcher){},
		statclass : ["off", "on"],
		label     : ["OFF", "ON"]
	};
	$.toggleSwitcher = function(opt){
		var options = $.extend({}, defaults, opt);
		$("input[type='switch']").each(function(i, n){
			creatElement(n, options);
		});
	};
	
	$.fn.toggleSwitcher = function(opt){
		var options = $.extend({}, defaults, opt);
		return this.each(function(){
			creatElement(this, options);
		});
	};
	
	function switchHandler(e){
		var options  = $(this).data("opt");
		var Switcher = $(this),
			BG       = $(this).children(".bg"),
			Input    = $(this).children("input[type='hidden']");
		if( Switcher.hasClass("on") ){
			BG.stop().animate({ left: -42} , 180 , function(){
				Input.val(0);
				Switcher.removeClass("on").addClass("off");
				options.callback(0, Switcher);
				Switcher = BG = Input = null;
			});
		}else{
			BG.stop().animate({ left: 0} , 180 , function(){
				Input.val(1);
				Switcher.removeClass("off").addClass("on");
				options.callback(1, Switcher);
				Switcher = BG = Input = null;
			});
		}
	}
	
	function creatElement(target, options){
		var wrapClass = options.statclass[target.value];
		var wrap = $("<div/>",{
			"class"  : "switches " + wrapClass
		}).data("opt", options).click(switchHandler);
		$(target).wrap(wrap);	
		
		var bg = $("<div/>",{
			"class"  : "bg",
			"html"   : '<span class="on">'+ options.label[1] +'</span><span class="off">'+ options.label[0] +'</span>'
		}).insertAfter(target);
		
		var outter = $('<span class="lf"></span><span class="rt"></span>').insertAfter(bg);
		
		var input = $("<input/>",{
			type  : "hidden",
			name  : target.getAttribute("name"),
			value : target.value
		}).insertAfter(target);
		$(target).remove();
	}
})(jQuery);