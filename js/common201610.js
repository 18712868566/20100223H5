/*wlo:Cflower*/
var dialog; if(!dialog) dialog={};
dialog={
	//关闭
	closeDiv:function(){
		$("#alertInfo").stop(true,true).animate({
			"top":"-100%",
			"opacity":"0"
		},"fast",function(){
			$("#maskLayer,#alertInfo").remove().hide();
		});
	},
	//
	maskLayer:function(){
		$("#maskLayer,#alertInfo").remove();
		var maskLayer="<div id='maskLayer'></div>";
		var alertInfo="<div id='alertInfo'><span class='close'>关闭</span></div>";
		$("body").append(maskLayer,alertInfo);
		$("#maskLayer").height($(document).height()).show();
	},
	//显示提示信息框
	showInfo:function(alertHtml){
		dialog.maskLayer();
		var _winH=$(window).height();             //﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣┐
		var _scrollTop=$(document).scrollTop();   //　　　　　　　　　　　├→
		$("#alertInfo").append(alertHtml).show(); //﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣┘
		var _thisDomWidth=$("#alertInfo").outerWidth();
		var _thisDomHeight=$("#alertInfo").outerHeight();
		var topD=parseInt(_scrollTop+(_winH-_thisDomHeight)/2);
		var mL=parseInt(_thisDomWidth/2);
		if(_thisDomHeight>=_winH){
			topD=_scrollTop;
			if(_scrollTop+_thisDomHeight>=$(document).height()){
				topD=$(document).height()-_thisDomHeight;
			}
		};
		$("#alertInfo").css({
			"margin-left":"-"+mL+"px"
		}).stop(true,true).animate({
			"top":topD+"px",
			"margin-left":"-"+mL+"px",
			"opacity":"1"
		},"fast");
		//console.log("点击弹层时窗口的高度："+_winH);
	},
	//改变窗口大小时改变弹出层的位置
	alertInfoPo:function(){
		var _winHResize=$(window).height();
		var _scrollTopResize=$(document).scrollTop();
		var _thisDomWidthResize=$("#alertInfo").outerWidth();
		var _thisDomHeightResize=$("#alertInfo").outerHeight();
		var topResize=parseInt(_scrollTopResize+(_winHResize-_thisDomHeightResize)/2);
		if(_thisDomHeightResize>=_winHResize){
			topResize=_scrollTopResize;
			if(_scrollTopResize+_thisDomHeightResize>=$(document).height()){
				topResize=$(document).height()-_thisDomHeightResize;
			}
		};
		if(topResize>=$("body").height()-_thisDomHeightResize){
			_scrollTopResize=$("body").height()-_thisDomHeightResize;
			topResize=_scrollTopResize-(_winHResize-_thisDomHeightResize)/2;
		}
		$("html,body").stop(true,true).animate({scrollTop:_scrollTopResize});
		$("#alertInfo").stop(true,true).animate({
			"top":topResize+"px",
			"margin-left":"-"+(_thisDomWidthResize/2)+"px"
		})
		//console.log("改变大小时窗口的高度："+_winHResize);
		$("#maskLayer").height($("body").height());
	},
	//提示弹层
	alertMsg:function(msgTitle,msg,func,flag){//msgTitle：提示标题,msg：提示内容,func：为“确定”按钮动作处理函数,flag：双按钮标识，”d“为双按钮（”确定“和”取消“,“取消”时的按钮动作是关闭窗口），”s“为单按钮（只有”确定“）
		var btn="<div class='infoBtn'><a class='click-btn' href='javascript:"+func+";'>确 定</a></div>";
		if(flag=="d") btn="<div class='infoBtn dd'><a class='click-btn' href='javascript:"+func+";'>确 定</a><a class='click-btn c' href='javascript:dialog.closeDiv();'>取 消</a></div>";
		dialog.showInfo("<div class='tsInfo'>"
			+" <h4><span>"+msgTitle+"</span></h4>"
			+" <div class='p'>"+msg+"</div>"
			+btn+"</div>");
	},
	//登录弹层
	alertLog:function(logTitle,func){//func：为“登录”按钮动作处理函数
		dialog.showInfo("<div class='logInfo'>"
			+" <h4><span>"+logTitle+"</span></h4>"
			+" <ul class='logUl clearfloat'>"
			+"  <li><label for='zH'>账　号：</label><input type='text' name='zH' id='zH' value=''></li>"
			+"  <li><label for='mM'>密　码：</label><input type='password' name='mM' id='mM' value=''></li>"
			+"  <li><label for=''>大　区：</label><div class='selBox'>"
			+"   <i>请选择大区</i><em><b></b></em>"
			+"   <div class='selC'>"
			+"    <a href='javascript:;' value=''>请选择大区</a>"
			+"    <a href='javascript:;' value='150000'>电信南方区</a>"
			+"    <a href='javascript:;' value='150001'>联通北方区</a>"
			+"   </div><input type='hidden' class='sel-ed' id='zone' value=''>"
			+"  </div></li>"
			+"  <li class='yzM'><label for='yzM'>验证码：</label><input type='text' name='yzM' id='yzM' maxlength='4' value=''><img src='' id='verifyImg'></li>"
			+"  <li class='tsli' id='logTs' style='display:none'><label for=''></label><span></span></li>"
			+" </ul>"
			+" <div class='infoBtn'><a class='click-btn' href='javascript:"+func+";'>登 录</a></div>"
			+"</div>");
		$.divselect(".selBox",".sel-ed");
	}		
};





jQuery.divselect = function(divselectid,inputselectid){
	var inputselect = $(inputselectid);
	$(divselectid+" i").click(function(){
		 var selC=$(this).siblings(".selC");
		 if(selC.css("display")=="none"){
			selC.show();
		 }else{
			selC.hide();  
		 }
	});
	$(divselectid+" .selC a").click(function(){
		 var ZoneId=$(this).attr("value");
		 var ZoneTex=$(this).html();
		 $(this).addClass("selectedV").siblings().removeClass("selectedV");
		 $(this).parent().siblings(".sel-ed").val(ZoneId);
		 $(this).parent().siblings("i").html(ZoneTex);
		 $(this).parent().hide();
	});
};