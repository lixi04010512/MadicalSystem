//$(function() {
//	$('nav#mmenu').mmenu({
//		extensions	: [ 'effect-slide-menu', 'pageshadow' ],
//		counters	: false,
//		navbar 		: {
//			title		: '菜单',
//		},
//		navbars		: [
//			 {
//				position	: 'top',
//				content		: [
//					'prev',
//					'title',
//					'close'
//				]
//			}, {
//				position	: 'bottom',
//				content		: [
//					''
//				]
//			} 
//		]
//	});
//});

  ;(function($){

	$.extend({

		'dropdpwn_Menu' : function(nName){

			$(nName).css('display','none');
			$(nName).parent('li').hover(function() {
				$(this).children(nName).stop(true, true).slideDown(200);
			}, function() {
				$(this).children(nName).stop(true, true).slideUp(200);
			});

			return this;
		},
		
	})
	
})(jQuery);


$(document).ready(function() {
		
	/*Jquery Mmenu*/
	$("#mmenu").mmenu({
		"extensions": [
        	"effect-menu-slide",
        	"effect-listitems-slide",
            "pagedim-black"
        ],
		"offCanvas": {
			position: "right"
		}
	}).css("opacity","1");
	
	$.dropdpwn_Menu(".nav > ul > li > ul");

});




/*头部搜索*/
$(function(){
	$(".container .search img").click(function(){
		$(".top_search").toggle(400);
		$(".top_sub").toggle(400);
	});
//	$(".container .search img").click(function(){
//		$(".top_sub").toggle(400);
//	});
})


//友情链接
$(function(){
	$(".friend").click(function(){
		$(".dropdown").toggle(500);
	})
})


//详细页分页
$(function(){
	$(".page .prev").hover(function(){
		$("img[src='images/pre-bg.png']").attr('src','images/pre-bghover.png');
	},function(){
		$("img[src='images/pre-bghover.png']").attr('src','images/pre-bg.png');
	});
	$(".page .next").hover(function(){
		$("img[src='images/next-bg.png']").attr('src','images/next-bghover.png');
	},function(){
		$("img[src='images/next-bghover.png']").attr('src','images/next-bg.png');
	})
})



//在线询价
$(function(){
	$(".name").focus(function(){
		$(this).val("");
	});
	$(".name").blur(function(){
		$(this).val("联系人");
	});
	$(".tel").focus(function(){
		$(this).val("");
	});
	$(".tel").blur(function(){
		$(this).val("联系电话");
	});
	$(".email").focus(function(){
		$(this).val("");
	});
	$(".email").blur(function(){
		$(this).val("电子邮箱");
	});
	$(".content").focus(function(){
		$(this).val("");
	});
	$(".content").blur(function(){
		$(this).val("咨询内容");
	});
	$(".code").focus(function(){
		$(this).val("");
	});
	$(".code").blur(function(){
		$(this).val("验证码");
	});
})

//人才招聘
$(function(){
	$(".job-con ul li").toggle(function(){
		$(this).toggleClass('active');
		$(this).css('border-bottom','none')
		$(this).find(".click").text('收起');
		$(this).find(".job-conwrap").fadeIn();
	},function(){
		$(this).removeClass('active');
		$(this).css('border-bottom','1px solid #cdcdcd')
		$(this).find(".click").text('点击查看');
		$(this).find(".job-conwrap").hide();
	})
})

//清除冒泡事件
$(".job-conwrap").click(function(event){
	$(this).show();
	event.stopPropagation();
})




/*
		----------------------------------------------------------------------------------------
		娴忚鍣ㄧ増鏈帴鍙�
		浣跨敤锛� 
		if (getIEVersion() == "IE8") alert("yes!");
		----------------------------------------------------------------------------------------
	*/

	function getIEVersion(){

		if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE6.0") { 
			return "IE6";
		} 

		else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE7.0") { 
			return "IE7";
		} 

		else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0") { 
			return "IE8";
		} 

		else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE9.0") { 
			return "IE9";
		} 

	}









