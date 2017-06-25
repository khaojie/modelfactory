///

    document.onkeydown = function (event) {

     var e = window.event || event;

   

      if (e.altKey &&

        ((e.keyCode == 37) ||   //屏蔽 Alt+ 方向键 ← 

       (e.keyCode == 39))) {  //屏蔽 Alt+ 方向键 → 

          alert("不准你使用ALT+方向键前进或后退网页！");

         return false;

     }

      if ( (e.keyCode == 116)) {          //屏蔽 F5 刷新键
    	  alert("不准你使用 F5 刷新网页！");
          return false;

      }

};

///

////分页跳转，必须存在一个表单表单里面必须存在ID为curPage的表单域
function pageToByForm(curPage,pageFormName) {
	var _pageFormName = (''!=pageFormName && typeof pageFormName != 'undefined' && pageFormName!=null) ? pageFormName : 'pageForm';
	jQuery("form[id='"+_pageFormName+"'].active input[id='curPage']").val(curPage);
	var fms = $("form[id='"+_pageFormName+"'].active").children();
	var prm = "";
	for ( var i = 0; i < fms.length; i++) {
		var v = jQuery(fms[i]).val();
		if (v != "") {
			prm += jQuery(fms[i]).attr("name") + "=" + v + "&";
		}

	}
	prm = prm.substring(0, prm.length - 1);

	var url = jQuery("form[id='"+_pageFormName+"'].active").attr("action");
	$.ajax({
		type : "POST",
		url : url,
		data : prm,
		success : function(msg) {
			jQuery(jQuery("form[id='"+_pageFormName+"'].active").parent()[0]).html(msg);
		}
	});

}

/**
 * 切换每页显示条数
 * @param size
 */
function pageToByPageSize(pageSize,pageFormName) {
	var _pageFormName = (''!=pageFormName && typeof pageFormName != 'undefined' && pageFormName!=null) ? pageFormName : 'pageForm';
	$("form[id='"+_pageFormName+"'].active input[id='pageSize']").val(pageSize)
	pageToByForm(1,_pageFormName);
}

function asyncLoad(url,param) {
	jQuery.post("../users/islogin",function(data){
		if(data=="1"){
			jQuery.post(url, param,function(data) {
				var arr = jQuery(data);
				var top; 
				var breadcrumb;
				
				for ( var i = 0; i < arr.length; i++) {
					if (jQuery(arr[i]).hasClass("sumg")) {
						top = jQuery(arr[i]);
						break;
					}
				}
				var arr = jQuery(top).nextAll();
				
				for ( var i = 0; i < arr.length; i++) {
					breadcrumb = jQuery(arr[i]).find(".breadcrumb").parent();
					breadcrumb.remove();
					if(breadcrumb.length > 0) {
						break;
					}
				}
				
				var nrr = jQuery(jQuery(".sumg")[0]).nextAll();
				
				for ( var i = 0; i < nrr.length; i++) {
					jQuery(nrr[i]).remove();
				}
				
				for ( var i = 0; i < arr.length; i++) {
					jQuery("body").append(arr[i]);
				}
			});
		}else{
			window.location="/";
		}
	});
}
/**
 * 验证时间段
 * @author ZacTang
 * @param strDate 开始时间
 * @param endDate 结束时间
 * @param notRequired 是否为非必填项(默认为false,必填项,true,非必填)
 * @param singleton (默认为false)
 */
function valiDate(strDate,endDate,notRequired,singleton){
	
	//set default value
	if("undefined"==typeof(notRequired)||null==notRequired||""==notRequired){
		notRequired=false;
	}
	if("undefined"==typeof(singleton)||null==singleton||""==singleton){
		singleton=true;
	}
	
	if(!notRequired){
		if(!singleton){
			if("undefined"==typeof(strDate)||null==strDate||""==strDate){
				alert("请输入开始时间");
				return false;
			}
			if("undefined"==typeof(endDate)||null==endDate||""==endDate){
				alert("请输入结束时间");
				return false;
			}
		}else{
			if(("undefined"==typeof(strDate)||null==strDate||""==strDate)&&
					("undefined"==typeof(endDate)||null==endDate||""==endDate)	){
				alert("请输入正确的时间段");
				return false;
			}
			
		}
		
		
		
	}
	
	if("undefined"!=typeof(strDate)&&null!=strDate||""!=strDate
		&&"undefined"!=typeof(endDate)&&null!=endDate&&""!=endDate){
		var strTime=0;
		var endTime=0;
		if("string"==typeof(strDate)){
			strTime=new Date((strDate).replace(/-/g,"/"));
			endTime=new Date((endDate).replace(/-/g,"/"));
		}else{
			strTime=strDate;
			endTime=endDate;
		}
		
		if(strTime>endTime){
			alert("结束时间不能大于开始时间");
			return false;
		}else{
			return true;
		}
	}return true;
	
	
	
	
	
}

/**
 * 带参数返回
 * 王伟
 */
function asyncLoadReplace(url){
 	url = url.replace(/\+/g, "%2B");
	asyncLoad(url);
}

/**
 * 带参数返回
 * 王伟
 */
function backUrl(url) {
	var u = url.indexOf("?");
	var hostUrl = url.substring(0, u);
	var param = url.substring(u + 1, url.length);
	//param = param.replace(/\+/g, "%2B"); //参数带+
	asyncLoad(hostUrl, param);
}

//省市区select ID、当前需要选中的ID,上一级ID
function selectLoad(slectid, curid, parentId) {
	jQuery.getJSON("../trash/getRegionData", {
		parentId : parentId
	}, function(json) {
		jQuery("#" + slectid).empty();
		jQuery("#" + slectid).html("");
		jQuery("#" + slectid).append(
				"<option value=''>--请选择--</option>");
		var val=null;
		for ( var i = 0; i < json.length; i++) {
			var option = "<option value='" + json[i].sid + "'";
			if (curid == json[i].sid||json.length==1) {
				option += "   selected='selected'";
				val = json[i].sid;
			}
			option += " >" + json[i].sname + "</option>";
			jQuery("#" + slectid).append(option);
		}
		if(json.length==1){
			if(slectid=='invCity'){
				selectLoad("invArea",0, val);
			}else if(slectid=='city'){
				selectLoad("area",0, val);
			}
		}
	});
}

//select ID、infoName 字典类型 
function selectCode(slectid, curid, infoName) {
	jQuery.getJSON("../async/getCodeData", {
		infoName : infoName
	}, function(json) {
		jQuery("#" + slectid).empty();
		jQuery("#" + slectid).html("");
		jQuery("#" + slectid).append(
				"<option value=''>--请选择--</option>");
		for ( var i = 0; i < json.length; i++) {
			var option = "<option value='" + json[i].codeKey + "'";
			if (curid == json[i].codeKey) {
				option += "   selected='selected'";
			}
			option += " >" + json[i].codeValue + "</option>";
			jQuery("#" + slectid).append(option);

		}

	});
}

function selectCode2(slectid, curid, infoName) {
	jQuery.getJSON("../async/getCodeData", {
		infoName : infoName
	}, function(json) {
		jQuery("#" + slectid).empty();
		jQuery("#" + slectid).html("");
		for ( var i = 0; i < json.length; i++) {
			var option = "<option value='" + json[i].codeKey + "'";
			if (curid == json[i].codeKey) {
				option += "   selected='selected'";
			}
			option += " >" + json[i].codeValue + "</option>";
			jQuery("#" + slectid).append(option);

		}

	});
}
/**
 * 添加商品
 * sumg
 */
function addGoods(){
	jQuery("#orderTable tbody tr").eq(0).clone().appendTo("#orderTable tbody").css("display","");
}
/**
 * 删除商品
 * sumg
 */
function removeGoods(obj){
	jQuery(obj).parent().parent().remove();
}
/**
 * 信息提示框
 * sumg
 */
function alertInfo(info,forward,backUrl) {
	if(jQuery("#alertModal").length>0) {
		jQuery("#alertContent").find("div").eq(1).html(info);
	}else{
		jQuery("body").append("<div class='modal' id='alertModal' role='dialog'>" +
				  "<div class='modal-dialog modal-sm' id='alertModalDialog' style='margin-top: 300px;width: 350px;'>" +
				    "<div class='modal-content' id='alertContent'>" +
				      "<div class='modal-header'>" +
				        "<button type='button' class='close' data-dismiss='modal'>" +
				        	"<span aria-hidden='true'>&times;</span>" +
				        	"<span class='sr-only'>Close</span>" +
				        "</button>" +
				        "<h4 class='modal-title'><span class='glyphicon glyphicon-exclamation-sign'></span>&nbsp;提示信息</h4>" +
				      "</div>" +
				      "<div class='modal-body'>" +
				        "<p>" + info + "</p>" +
				      "</div>" +
				    "</div>" +
				  "</div>" +
				"</div>");
	}
	jQuery("#alertModal").modal("show");
	jQuery("body").css("padding-right","0px");
	//center(jQuery("#alertModalDialog"));
	
	jQuery("#alertModal").off("hidden.bs.modal");
	jQuery("#alertModal").on('hidden.bs.modal', function (e) {
		if(forward == 1){
			if(backUrl != "" && backUrl != null) {
				goBack(backUrl);//根据路径跳转
			}
		}else if(forward == 2) {
			toMainPage();//无跳转，显示主页面
		}else{
			
		}
	});
	
}
/**
 * 返回
 * sumg
 */
function goBack(backUrl){
	if(backUrl != "" && backUrl != null){
  		asyncLoad(backUrl);
  	}else{
		history.back(-1);
  	}
}
/**
 * 显示子页面
 * sumg
 */
function toSubPage() {
	jQuery("#mainPage").hide();
	jQuery("#subPage").empty();
	jQuery("#subPage").show();
}
/**
 * 回到主页面
 * sumg
 */
function toMainPage() {
	jQuery("#mainPage").show();
	jQuery("#subPage").empty();
	jQuery("#subPage").hide();
}
/**
 * 订单信息
 * sumg
 */
function showOrderInfo(orderId) {
	
	jQuery.ajax({
		type : "POST",
		url : "../orderInfo/getOrderInfoByOrderId",
		data : {"orderId" : orderId,
				"index" : 1},
		success : function(json) {
			if(jQuery("#orderModal").length>0) {
				//jQuery("#orderModal").find("div").eq(1).html(info);
				
			}else{
				jQuery("body").append("<div class='modal' id='orderModal' role='dialog' aria-hidden='true'></div>");
			}
			jQuery("#orderModal").empty().html(json);
			jQuery("#orderModal").modal("show");
			
			jQuery.ajax({
				type : "POST",
				url : "../orderInfo/getOrderInfoByOrderId",
				data : {"orderId" : orderId,
						"index" : 2},
				success : function(json) {																
					jQuery("#settlePanel").empty().html(json);
				}
			});
			jQuery.ajax({
				type : "POST",
				url : "../orderInfo/getOrderInfoByOrderId",
				data : {"orderId" : orderId,
						"index" : 3},
				success : function(json) {																
					jQuery("#complainPanel").empty().html(json);
				}
			});
			jQuery.ajax({
				type : "POST",
				url : "../orderInfo/getOrderInfoByOrderId",
				data : {"orderId" : orderId,
						"index" : 4},
				success : function(json) {																
					jQuery("#returnPanel").empty().html(json);
				}
			});
			jQuery.ajax({
				type : "POST",
				url : "../orderInfo/getOrderInfoByOrderId",
				data : {"orderId" : orderId,
						"index" : 5},
				success : function(json) {																
					jQuery("#relevancePanel").empty().html(json);
				}
			});
			jQuery.ajax({
				type : "POST",
				url : "../orderInfo/getOrderInfoByOrderId",
				data : {"orderId" : orderId,
						"index" : 6},
				success : function(json) {																
					jQuery("#invoiceApplyPanel").empty().html(json);
				}
			});
			jQuery.ajax({
				type : "POST",
				url : "../orderInfo/getOrderInfoByOrderId",
				data : {"orderId" : orderId,
						"index" : 7},
				success : function(json) {	
					jQuery("#orderEventPanel").empty().html(json);
				}
			});
		}
	});
}

/**
 * 订单详细信息
 * wangwei
 */
function showOrderDetail(sid) {
	jQuery.ajax({
		type : "POST",
		url : "../try/orderDetail",
		data : "sid=" + sid,
		success : function(json) {
			if(jQuery("#orderDetailModal").length>0) {
				//jQuery("#orderModal").find("div").eq(1).html(info);
				
			}else{
				jQuery("body").append("<div class='modal' id='orderDetailModal' role='dialog' aria-hidden='true'></div>");
			}
			jQuery("#orderDetailModal").empty().html(json);
			jQuery("#orderDetailModal").modal("show");
		}
	});
}

/**
 * 居中
 * sumg
 */
function center(obj) {
    var screenWidth = jQuery(window).width(), screenHeight = jQuery(window).height();  //当前浏览器窗口的 宽高
    var scrolltop = jQuery(document).scrollTop();//获取当前窗口距离页面顶部高度
    var objLeft = (screenWidth - obj.width())/2 ;
    var objTop = (screenHeight)/2 - jQuery("#alertModalDialog").height() + scrolltop;

    obj.css({top: objTop + 'px'});
    //浏览器窗口大小改变时
    jQuery(window).resize(function() {
        screenWidth = jQuery(window).width();
        screenHeight = jQuery(window).height();
        scrolltop = jQuery(document).scrollTop();
       
        objLeft = (screenWidth - obj.width())/2 ;
        objTop = (screenHeight)/2 - jQuery("#alertModalDialog").height() + scrolltop;
        obj.css({top: objTop + 'px'});
       
    });
    //浏览器有滚动条时的操作、
    jQuery(window).scroll(function() {
        screenWidth = jQuery(window).width();
        screenHeight = jQuery(window).height();
        scrolltop = jQuery(document).scrollTop();
       
        objLeft = (screenWidth - obj.width())/2 ;
        objTop = (screenHeight)/2 - jQuery("#alertModalDialog").height() + scrolltop;
       
        obj.css({top: objTop + 'px'});
    });
   
}
 
/*
 * 员工字典
 *  dep_id 所属部门
 * emp_type 员工类型
 * emp_state 员工状态
 * job_type 职位类型
* */
function selectEmployee(slectid,curid,dep_id,  emp_type,  emp_state,  job_type, jobTypes) {
	jQuery.getJSON("../async/getEmployee", {
		dep_id : dep_id,
		emp_type : emp_type,
		emp_state : emp_state,
		job_type : job_type,
		jobTypes : jobTypes
	}, function(json) {
		jQuery("#" + slectid).empty();
		jQuery("#" + slectid).html("");
		jQuery("#" + slectid).append(
				"<option ></option>");
		for ( var i = 0; i < json.length; i++) {
			var option = "<option value='" + json[i].sid + "'";
			if (curid == json[i].sid) {
				option += "   selected='selected'";
			}
			option += " >" + json[i].empName + "</option>";
			jQuery("#" + slectid).append(option);

		}

	});
}

/**
 * 部门下拉
 */
function selectDepartment(selectId,currId) {
	jQuery.getJSON("../async/getDepartSelect", {
	}, function(json) {
		jQuery("#" + selectId).empty();
		for ( var i = 0; i < json.length; i++) {
			var option = "<option value='" + json[i].sid + "'";
			if (currId == json[i].sid) {
				option += " selected='selected'";
			}
			option += " >" + json[i].depName + "</option>";
			jQuery("#" + selectId).append(option);

		}

	});
}

/*
 * 部门字典
 * dep_type 部门类型
* */
function selectDept(slectid,curid,dep_type) {
	jQuery.getJSON("../async/getDepartment", {
		dep_type : dep_type
	}, function(json) {
		jQuery("#" + slectid).empty();
		jQuery("#" + slectid).html("");
		jQuery("#" + slectid).append(
				"<option ></option>");
		for ( var i = 0; i < json.length; i++) {
			var option = "<option value='" + json[i].sid + "'";
			if (curid == json[i].sid) {
				option += "   selected='selected'";
			}
			option += " >" + json[i].depName + "</option>";
			jQuery("#" + slectid).append(option);

		}

	});
}


	/*
	 * 活动地址
	* */
	function getAreasRelated(slectid,curid,parentId, type, daProvince, daCity, daRegion) {
		jQuery.getJSON("../customer/areasRelated", {
			parentId : parentId,
			type : type,
			daProvince : daProvince,
			daCity : daCity,
			daRegion : daRegion
		}, function(json) {
			jQuery("#" + slectid).empty();
			jQuery("#" + slectid).html("");
			jQuery("#" + slectid).append(
					"<option >--请选择--</option>");
			for ( var i = 0; i < json.length; i++) {
				var option = "<option value='" + json[i].sid + "'";
				if (curid == json[i].sid) {
					option += "   selected='selected'";
				}
				option += " >" + json[i].sname + "</option>";
				jQuery("#" + slectid).append(option);

			}

		});
		
		/*
		 * 平台
		 * */
		function getPlatformSelected(slectid,curid) {
			jQuery.getJSON("../async/getPlatformSelected", {
			}, function(json) {
				jQuery("#" + slectid).empty();
				jQuery("#" + slectid).html("");
				jQuery("#" + slectid).append("<option ></option>");
				for ( var i = 0; i < json.length; i++) {
					var option = "<option value='" + json[i].channelCode + "'";
					if (curid == json[i].sid) {
						option += "   selected='selected'";
					}
					option += " >" + json[i].channelName + "</option>";
					jQuery("#" + slectid).append(option);

				}
			 
			});
		}
}



	function ToDecimal(x) {
		var f_x = parseFloat(x);
		if (isNaN(f_x)) {
			alert('function:ToDecimal->parameter error' + x);
			return false;
		}
		var f_x = Math.round(x * 100) / 100;

		return f_x;
	}
	
	/**
	 * 退货单信息
	 * cxx
	 */
	function showRetInfo(renId) {
		
		jQuery.ajax({
			type : "POST",
			url :  baseUrl+"b2cAfterSale/queryReturnNoteInfo1",
			data : "renId=" + renId,
			success : function(json) {
				pageController.removeCommonModal();
				jQuery("body").append("<div class='modal' id='orderModal' role='dialog' aria-hidden='true'></div>");
				jQuery("#orderModal").empty().html(json);
				jQuery("#orderModal").modal("show");
			}
		});
		
		
	}
	
	/**
	 * 批次信息
	 * cxx
	 */
	function showCarInfo(dbId) {
		
		jQuery.ajax({
			type : "POST",
			url : "../async/getDispatchCarInfo",
			data : "dbId=" + dbId,
			success : function(json) {
				if(jQuery("#orderModal").length>0) {
					//jQuery("#orderModal").find("div").eq(1).html(info);
					
				}else{
					jQuery("body").append("<div class='modal' id='orderModal' role='dialog' aria-hidden='true'></div>");
				}
				jQuery("#orderModal").empty().html(json);
				jQuery("#orderModal").modal("show");
			}
		});
		
		
	}

	/**
	 * 加载仓库信息
	 */
	function loadWhSelect(selectId, curId) {
		jQuery.getJSON("../async/queryWhList", function(json) {
			jQuery("#" + selectId).empty();
			
			if(json =="" || json == null) {
				jQuery("#" + selectId).append("<option value=''>--请选择--</option>");
			}else{
				jQuery("#" + selectId).append("<option value=''>--请选择--</option>");
				for ( var i = 0; i < json.length; i++) {
					var option = "<option value='" + json[i].sid + "'";
					if (curId == json[i].sid) {
						option += " selected='selected'";
					}
					option += " >" + json[i].whName + "</option>";
					jQuery("#" + selectId).append(option);
				}
			}
		});
	}
	/**
	 * 加载仓库的物流方式
	 */
	function loadLoTpSelect(selectId, curId, whId) {
		if(whId != null && whId != "") {
			jQuery.getJSON("../async/queryWhLoTp", {
				whId : whId
			}, function(json) {
				jQuery("#" + selectId).empty();
				
				if(json == "" || json == null) {
					jQuery("#" + selectId).append("<option value=''>--请选择--</option>");
				}else{
					jQuery("#" + selectId).append("<option value=''>--请选择--</option>");
					for ( var i = 0; i < json.length; i++) {
						var option = "<option value='" + json[i].typeId + "'";
						if (curId == json[i].typeId) {
							option += " selected='selected'";
						}
						option += " >" + json[i].loTypeName + "</option>";
						jQuery("#" + selectId).append(option);
					}
				}
			});
		}
		
	}
	/**
	 * 加载物流公司
	 */
	function loadLogiSelect(selectId, curId, whId, loTpId) {
		if(whId != null && whId != "" && loTpId != "" && loTpId != null) {
			jQuery.getJSON("../async/queryLogi", {
				whId : whId,
				loTpId : loTpId
			}, function(json) {
				jQuery("#" + selectId).empty();
				
				if(json == "" || json == null) {
					jQuery("#" + selectId).append("<option value=''>--请选择--</option>");
				}else{
					for ( var i = 0; i < json.length; i++) {
						var option = "<option value='" + json[i].sid + "'";
						if (curId == json[i].sid) {
							option += " selected='selected'";
						}
						option += " >" + json[i].logiName + "</option>";
						jQuery("#" + selectId).append(option);
					}
				}
			});
		}
		
	}
	
	/**
	 * 加载配送时间段
	 */
	function loadPeriodSelect(selectId, curId, loTpId) {
		if(loTpId != "" && loTpId != null) {
			jQuery.getJSON("../async/queryPeriod", {
				loTpId : loTpId
			}, function(json) {
				jQuery("#" + selectId).empty();
				
				if(json == "" || json == null) {
					jQuery("#" + selectId).append("<option value=''>--请选择--</option>");
				}else{
					for ( var i = 0; i < json.length; i++) {
						var option = "<option value='" + json[i].dpeID + "'";
						if (curId == json[i].dpeID) {
							option += " selected='selected'";
						}
						option += " >" + json[i].dpName + "</option>";
						jQuery("#" + selectId).append(option);
					}
				}
			});
		}
		
	}
	
	/**
	 * 清空指定的 select
	 */
	function clearSelect(slectid) {
		jQuery("#" + slectid).empty();
		jQuery("#" + slectid).html("");
		jQuery("#" + slectid).append("<option >--请选择--</option>");
	}
	
	/**
	 * 电视购物
	 */
	function queryTVshopping(selectId, curId, lgcType) {
			jQuery.getJSON("../async/queryTVshopping", {
				lgcType : lgcType
			}, function(json) {
				jQuery("#" + selectId).empty();
				
				if(json == "" || json == null) {
					jQuery("#" + selectId).append("<option value=''>--请选择--</option>");
				}else{
					jQuery("#" + selectId).append("<option value=''>--请选择--</option>");
					for ( var i = 0; i < json.length; i++) {
						var option = "<option value='" + json[i].lgcId + "'";
						if (curId == json[i].lgcId) {
							option += " selected='selected'";
						}
						option += " >" + json[i].lgcName + "</option>";
						jQuery("#" + selectId).append(option);
					}
				}
			});
	}
	
	
	/**
	 * 调拨信息
	 * cxx
	 */
	function showTransInfo(ctrId) {
		
		jQuery.ajax({
			type : "POST",
			url : "../async/getTransNoInfo",
			data : "ctrId=" + ctrId,
			success : function(json) {
				if(jQuery("#orderModal").length>0) {

				}else{
					jQuery("body").append("<div class='modal' id='orderModal' role='dialog' aria-hidden='true'></div>");
				}
				jQuery("#orderModal").empty().html(json);
				jQuery("#orderModal").modal("show");
			}
		});
		
		
	}
	
	/**
	 * 增值税信息
	 * cxx
	 */
	function showAddTaxInfo(avtId) {
		
		jQuery.ajax({
			type : "POST",
			url : "../async/getAddTaxInfo",
			data : "avtId=" + avtId,
			success : function(json) {
				if(jQuery("#orderModal").length>0) {
	
				}else{
					jQuery("body").append("<div class='modal' id='orderModal' role='dialog' aria-hidden='true'></div>");
				}
				jQuery("#orderModal").empty().html(json);
				jQuery("#orderModal").modal("show");
			}
		});
		
		
	}			

	/**
	 * 点击按钮后按钮不可用（防止重复提交）
	 * 0关
	 * 1开
	 * 王伟
	 */
	function disabledButton(butId,no) {
		if(no == "0"){
			jQuery("#"+butId).button("loading");
			jQuery("#"+butId).attr("disabled", true);
		}else{
			jQuery("#"+butId).button("reset");
			jQuery("#"+butId).attr("disabled", false);
		}
	}
	/**
	 * 团购单订单取消
	 * */
	function cancelGroupOrder(orderId, obj) {
		if (!confirm("确定要取消吗？")) {
	          return false;
	        }
		var btn = jQuery(obj);
		btn.button("loading");
		btn.attr("disabled", true);
		var page = $("#queryForm input[name=curPage]").val();
		jQuery.ajax({
			type : "POST",
			url : "../orderEdit/cancelOrder",
			data : {"orderId":orderId,
				    "orderMemo":"大客户团购单订单取消",
				    "refundBank":"",
				    "refundName":"",
				    "refundCode":"",
				    "editPayWay":"",
				    "editPayBf":""},
			success : function(json) {
				if(json.result == "1") {
					alertInfo("订单取消成功！");
				}else{
					alertInfo("订单取消失败！错误信息：" + json.msg);
				}
				btn.button("reset");
				groupOrderTable();
			}
		});
	}
	
	
	/**
	 * 退货单取消（作废）
	 * */
	function cancelReturn(sid, obj) {
		if (!confirm("确定要取消吗？")) {
	          return false;
	        }
		var btn = jQuery(obj);
		btn.button("loading");
		btn.attr("disabled", true);
		var page = $("#pageForm input[name=curPage]").val();
		jQuery.ajax({
			type : "POST",
			url : "../storeOrder/cancelReturn",
			data : "sid=" + sid,
			success : function(msg) {
				if (msg == "1") {
					alertInfo("取消成功！");
				}else{
					alertInfo("取消失败！");
				}
				btn.button("reset");
				myquery(page);
			}
		});
	}
	
/**
 * 信息提示框
 * sumg
 * confirmDialog("提示框测试","test",1,2);
 */
function confirmDialog(tipInfo,funcName) {
	var event = "";
	var clickEvent = "";

	if(funcName == "" || funcName == null || funcName == undefined) {
		clickEvent = "onclick='javascript:;'";
	}else{
		event = funcName + "(";
		if(arguments.length > 2) {
			for( var i = 2; i < arguments.length; i++ ){  
	        	event += "'" + arguments[i] + "'";  
				if(i != (arguments.length - 1)) {
					event += ",";
				}
	   		} 
		}
		event += ")";
		//console.info("onclick=\"" + event + "\"");
		clickEvent = "onclick=\"" + event + ";\"";
	}
	
	if(jQuery("#confirmModal").length>0) {
		jQuery("#confirmModal").empty();
	}else{
		jQuery("body").append(
			"<div class='modal' id='confirmModal' aria-hidden='false' role='dialog'>" +
			"</div>"
		);	
	}
	
	jQuery("#confirmModal").append(
		"<div class='modal-dialog modal-sm' style='margin-top: 300px;width: 350px;'>" +
			"<div class='modal-content' >" +
				"<div class='modal-header'>" +
					"<h4 class='modal-title'>温馨提示</h4>" +
				"</div>" +
				"<div class='panel-body'>" +
					"<div class='form-inline' align='center'>" +
						"<span id='confirmTipInfo'>" + tipInfo + "</span>" +		
					"</div>" +
					"<div align='center' style='margin-top:10px;'>" +
						"<button type='button' class='btn btn-default btn-sm' data-dismiss='modal'>" +
							"<span class='glyphicon glyphicon-remove'></span>&nbsp;否" +
						"</button>" +
						"<button class='btn btn-success btn-sm' type='button' data-dismiss='modal' " + clickEvent + " style='margin-left: 20px;'>" +
							"<span class='glyphicon glyphicon-ok'></span>&nbsp;是" +
						"</button>" +
					"</div>" +					
				"</div>" +
			"</div>" +
		"</div>"
	);
	
	jQuery("#confirmModal").modal("show");
	jQuery("body").css("padding-right","0px");
	

}


/**
 * 团单信息
 * cxx
 */
function groupOrderInfo(goId) {
	
	jQuery.ajax({
		type : "POST",
		url : "../async/getGroupOrderInfo",
		data : "goId=" + goId,
		success : function(json) {
			if(jQuery("#orderModal").length>0) {
				//jQuery("#orderModal").find("div").eq(1).html(info);				
			}else{
				jQuery("body").append("<div class='modal' id='orderModal' role='dialog' aria-hidden='true'></div>");
			}
			jQuery("#orderModal").empty().html(json);
			jQuery("#orderModal").modal("show");
		}
	});
	
	

}
/**
 * 显示投诉详情 
 */
function showComplaintInfo(comId){
	jQuery.ajax({
		type : "POST",
		url : "../complain/complainQuery1",
		data : "comId=" + comId,
		success : function(json) {
			if(jQuery("#compModal").length>0) {
				
			}else{
				jQuery("body").append("<div class='modal' id='compModal' role='dialog' aria-hidden='true'></div>");
			}
			jQuery("#compModal").empty().html(json);
			jQuery("#compModal").modal("show");
		}
	});
}

function showB2ComplaintInfo(comId){
	jQuery.ajax({
		type : "POST",
		url : "../b2cComplain/complainQuery1",
		data : "comId=" + comId,
		success : function(json) {
			if(jQuery("#compModal").length>0) {

			}else{
				jQuery("body").append("<div class='modal' id='compModal' role='dialog' aria-hidden='true'></div>");
			}
			jQuery("#compModal").empty().html(json);
			jQuery("#compModal").modal("show");
		}
	});
}

/**
 * 开票订单信息
 * cxx
 */
function showInvApplyOrders(inaId) {
	
	jQuery.ajax({
		type : "POST",
		url : "../async/showInvApplyOrders",
		data : "inaId=" + inaId,
		success : function(json) {
			if(jQuery("#orderModal").length>0) {
				//jQuery("#orderModal").find("div").eq(1).html(info);
				
			}else{
				jQuery("body").append("<div class='modal' id='orderModal' role='dialog' aria-hidden='true'></div>");
			}
			jQuery("#orderModal").empty().html(json);
			jQuery("#orderModal").modal("show");
		}
	});
	
	
}
/**
 * 订单券卡信息
 * cxx
 */
function showCoupNos(orderId,renId) {
	
	jQuery.ajax({
		type : "POST",
		url : "../card/showCoupNos",
		data : {"orderId":orderId,"renId":renId},
		success : function(json) {
			if(jQuery("#orderModal").length>0) {
				//jQuery("#orderModal").find("div").eq(1).html(info);
				
			}else{
				jQuery("body").append("<div class='modal' id='orderModal' role='dialog' aria-hidden='true'></div>");
			}
			jQuery("#orderModal").empty().html(json);
			jQuery("#orderModal").modal("show");
		}
	});
	
	
}
/**
 * 券卡订单信息
 * cxx
 */
function showCoupOrders(coupNo) {
	
	jQuery.ajax({
		type : "POST",
		url : "../card/showCoupOrders",
		data : "coupNo="+coupNo,
		success : function(json) {
			if(jQuery("#orderModal").length>0) {
				//jQuery("#orderModal").find("div").eq(1).html(info);
				
			}else{
				jQuery("body").append("<div class='modal' id='orderModal' role='dialog' aria-hidden='true'></div>");
			}
			jQuery("#orderModal").empty().html(json);
			jQuery("#orderModal").modal("show");
		}
	});
	
	
}
/**
 * 批次券卡信息
 * cxx
 */
function showCoupons(cbhId) {
	
	jQuery.ajax({
		type : "POST",
		url : "../card/showCoupons",
		data : "cbhId="+cbhId,
		success : function(json) {
			if(jQuery("#orderModal").length>0) {
				//jQuery("#orderModal").find("div").eq(1).html(info);
				
			}else{
				jQuery("body").append("<div class='modal' id='orderModal' role='dialog' aria-hidden='true'></div>");
			}
			jQuery("#orderModal").empty().html(json);
			jQuery("#orderModal").modal("show");
		}
	});
	

}



function hideMobileAndShow(id,num){
	if(num==null){
		var td = jQuery("#"+id);
		var custMobile = td.html().trim().substring(0,3)+"****"+td.html().trim().substring(7);
		var showdiv  = "<div >"+custMobile+"</div>";
		var hidediv  = "<div  style = 'display:none';>"+td.html().trim()+"</div>";
		td.attr("onmouseover","showNone(this)");
		td.attr("onmouseout","showBlock(this)");
		td.html(showdiv+hidediv);

	}else{
		jQuery("#"+id).find("tr").each(function(){			
			var td1 = jQuery(this).find("td").eq(num);
			if(td1.html()==undefined || td1.html()==null || td1.html().trim()=="")	{
				return false;
			}		
			var tds = td1.html().trim().split("&amp;");
			if(tds.length>1){
				var custMobile = tds[0].substring(0,3)+"****"+tds[0].substring(7);
				var mobile = tds[1].substring(0,3)+"****"+tds[1].substring(7);
				var showdiv  = "<div >"+custMobile+'&'+mobile+"</div>";
				var hidediv  = "<div  style = 'display:none';>"+tds[0]+'&'+tds[1]+"</div>";
			}else{
				var custMobile = tds[0].substring(0,3)+"****"+tds[0].substring(7);
				var showdiv  = "<div >"+custMobile+"</div>";
				var hidediv  = "<div  style = 'display:none';>"+tds[0]+"</div>";
			}
			td1.attr("onmouseover","showNone(this)");
			td1.attr("onmouseout","showBlock(this)");
			td1.html(showdiv+hidediv);
		});
	}
}	
function showNone(obj)
{
	$(obj).find("div").eq(0).hide();
	$(obj).find("div").eq(1).show();
}
function showBlock(obj)
{
	$(obj).find("div").eq(1).hide();
	$(obj).find("div").eq(0).show();
}
