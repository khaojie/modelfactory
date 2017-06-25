/**
 * 查询配送相关信息(仓库、物流公司、物流方式、配送时间段)
 */
function queryDispatchInfo(daProvince, daCity, daRegion,whId,logiId,loTpId,dispatchPeriod) {
	jQuery.ajax({
		type : "POST",
		url : "../trash/queryDispatchInfo2",
		data: "daProvince=" + daProvince + "&daCity=" + daCity + "&daRegion=" + daRegion,
		success : function(json) {
			if(whId == "" || whId == null) {
				//仓库
				var whName = json.whName;
				jQuery("#whName").html("").append("<span>" + whName + "</span>");
				jQuery("#whName").next().val(json.whId);
			}
			if(logiId == "" || logiId == null) {
				//物流公司
				var logiName = json.logiName;
				jQuery("#logiName").html("").append("&nbsp;<span>" + logiName + "</span>");
				jQuery("#logiName").next().val(json.logiId);
			}
			if(loTpId == "" || loTpId == null) {
				//物流方式
				var loTypeName = json.loTypeName;
				jQuery("#logType").html("").append("&nbsp;<span>" + loTypeName + "</span>");
				jQuery("#logType").next().val(json.loTpId);
			}
			if(dispatchPeriod == "" || dispatchPeriod == null) {
				//配送时间段
				jQuery("#dispatchPeriod").empty();
				if(json.periods != null && json.periods != "") {
					for(var i=0;i<json.periods.length;i++) {
						jQuery("#dispatchPeriod").append("<option value='" + json.periods[i].dpeID + "'>" + json.periods[i].dpName + "</option>");
					}
				}
			}

		}
	});
}
/**
 * 根据省、市、区计算仓库信息
 */
function calculateWh(daProvince,daCity,daRegion,logiId,loTpId) {
	jQuery.ajax({
		type : "POST",
		url : "../async/queryWareHouse",
		data : "daProvince=" + daProvince + "&daCity=" + daCity + "&daRegion=" + daRegion,
		success : function(json) {
			var whName = json.whName;
			jQuery("#whName").html("").append("<span>" + whName + "</span>");
			jQuery("#whName").next().val(json.sid);

			if(logiId == "" || logiId == null) {
				//计算物流公司
				if(loTpId != null && loTpId != "") {
					if(loTpId == "1" || loTpId == "2") {
						queryLogiCompany(json.sid, loTpId,daProvince,daCity,daRegion);
					}
					if(loTpId == "3" || loTpId == "4") {
						queryLogiCompany2(json.sid, loTpId);
					}
				}
			}else{
				//不计算物流公司
			}
		}
	});
}
/**
 * 根据仓库、物流方式查询物流公司信息
 * 1/2自动计算
 */
function queryLogiCompany(whId,loTpId,daProvince,daCity,daRegion) {
	jQuery.ajax({
		type : "POST",
		url : "../async/queryLogiCompany",
		data : "whId=" + whId + "&loTpId=" + loTpId + "&daProvince=" + daProvince + "&daCity=" + daCity + "&daRegion=" + daRegion,
		success : function(json) {
			jQuery("#logiId").hide();
			jQuery("#logiId").attr("disabled","disabled");

			var logiName = json.logiName;
			if(logiName == null || logiName == ""){
				jQuery("#logiName").html("").append("<span style='color:red;'>未获取到物流公司信息！</span>");
				jQuery("#logiName").next().val("");
				jQuery("#dispatchPeriod").html("").append("<option value=''>--配送时间段--</option>");
			}else{
				jQuery("#logiName").empty().append("<span>" + logiName + "</span>");
				jQuery("#logiName").next().val(json.logiId);
				jQuery("#dispatchPeriod").empty();
				if(json.periods != null && json.periods != "") {
					for(var i=0;i<json.periods.length;i++) {
						jQuery("#dispatchPeriod").append("<option value='" + json.periods[i].dpeID + "'>" + json.periods[i].dpName + "</option>");
					}
				}
			}
			jQuery("#logiName").show();
			jQuery("#logiName").next().removeAttr("disabled");
		}
	});
}
/**
 * 根据仓库、物流方式查询物流公司信息
 * 3/4下拉
 */
function queryLogiCompany2(whId,loTpId) {
	jQuery.ajax({
		type : "POST",
		url : "../async/queryLogiCompany2",
		data : "whId=" + whId + "&loTpId=" + loTpId,
		success : function(json) {
			jQuery("#logiName").hide();
			jQuery("#logiName").next().attr("disabled","disabled");
			jQuery("#logiId").empty();

			if(json != null && json != "") {
				for(var i = 0; i<json.length; i++) {
					var logiName = json[i].logiName;
					var logiId = json[i].logiId;
					var check = "";

					if(jQuery("#pickBySelf")) {
						if (jQuery("#pickBySelf").prop("checked")) {
							if(logiName == "自提") {
								check = "selected='selected'";
							}
						}
					}

					if(logiName == null || logiName == ""){
						jQuery("#logiId").append("<option value=''>--请选择--</option>");
					}else{
						jQuery("#logiId").append("<option value='" + logiId + "' " + check + ">" + logiName + "</option>");
						jQuery("#dispatchPeriod").empty();
					}
				}
				if(loTpId == "3") {
					jQuery("#dispatchPeriod").empty().append("<option value='31'>0900-1800</option>");
					jQuery("#dispatchPeriod").append("<option value='32'>1800-2200</option>");
				}
				if(loTpId == "4") {
					jQuery("#dispatchPeriod").empty().append("<option value='41'>0900-1800</option>");
					jQuery("#dispatchPeriod").append("<option value='42'>1800-2200</option>");
				}
				jQuery("#logiId").show();
				jQuery("#logiId").removeAttr("disabled");
			}

		}
	});
}
function initPeriod(loTpId) {
	if(loTpId == "1") {
		jQuery("#dispatchPeriod").empty().append("<option value='11'>0900-1800</option>");
		jQuery("#dispatchPeriod").append("<option value='12'>1800-2200</option>");
	}
	if(loTpId == "2") {
		jQuery("#dispatchPeriod").empty().append("<option value='21'>0900-1800</option>");
	}
	if(loTpId == "3") {
		jQuery("#dispatchPeriod").empty().append("<option value='31'>0900-1800</option>");
		jQuery("#dispatchPeriod").append("<option value='32'>1800-2200</option>");
	}
	if(loTpId == "4") {
		jQuery("#dispatchPeriod").empty().append("<option value='41'>0900-1800</option>");
		jQuery("#dispatchPeriod").append("<option value='42'>1800-2200</option>");
	}
}
/**
 * 加载支付方式下拉
 */
function getPayWay(selectId,curId,payType,isSettle,refType) {
	var param = "";
	for (var i=0;i<payType.length;i++) {
		param += "payType=" + payType[i];
		if (i < payType.length - 1) {
			param += "&";
		}
	}
	param += "&isSettle=" + isSettle + "&refType=" + refType;

	jQuery.ajax({
		type : "POST",
		url : "../trash/getPayWay",
		data : param,
		success : function(json) {
			jQuery("#" + selectId).empty();
			jQuery("#" + selectId).html("");
			jQuery("#" + selectId).append("<option value='0'>--请选择--</option>");

			for ( var i = 0; i < json.length; i++) {
				var option = "<option value='" + json[i].payWay + "'";

				if (curId == json[i].payWay) {
					option += "   selected='selected'";
				}
				option += " >" + json[i].pwTypeName + "</option>";
				jQuery("#" + selectId).append(option);
			}
		}
	});
}
/**
 * 加载结算平台下拉
 */
function getPayPlatForm(selectId,curId,payWay) {
	jQuery.ajax({
		type : "POST",
		url : "../trash/getPayPlatForm",
		data : "payWay=" + payWay,
		success : function(json) {
			jQuery("#" + selectId).empty().append("<option value='0'>--请选择--</option>");

			if(json != null && json != "") {
				jQuery("#" + selectId).show();
				for ( var i = 0; i < json.length; i++) {
					var option = "<option value='" + json[i].ppfId + "'";
					if (curId == json[i].ppfId) {
						option += "   selected='selected'";
					}
					option += " >" + json[i].ppfName + "</option>";
					jQuery("#" + selectId).append(option);
				}
			}else{
				jQuery("#" + selectId).val(0);
				jQuery("#" + selectId).hide();
			}

		}
	});
}
/**
 * 支付类型
 * sumg
 */
function changePay(selectId,curId) {
	if(jQuery("#payTpId").val() == 3) {
		getUnpayment(selectId,curId);
		jQuery("#unPayment").show();
		jQuery("#unPayment").removeAttr("disabled");
	}else{
		jQuery("#unPayment").hide();
		jQuery("#unPayment").attr("disabled","disabled");
	}
}
/**
 * 加载未付款时的付款方式
 * sumg
 */
function getUnpayment(selectId,curId) {
	jQuery.ajax({
		type : "POST",
		url : "../trash/getCodeData",
		data : {"infoName":"unPayment"},
		success : function(json) {
			jQuery("#" + selectId).empty();
			for ( var i = 0; i < json.length; i++) {
				if (json[i].codeKey != 12 && json[i].codeKey != 3) {
					var option = "<option value='" + json[i].codeKey + "'";
					if (curId == json[i].codeKey) {
						option += " selected='selected'";
					}
					option += " >" + json[i].codeValue + "</option>";
					jQuery("#" + selectId).append(option);
				}
			}
		}
	});
}
/**
 * 设置仓库、物流显示内容
 */
function setDispatchInfo(type,whId,whName,logiId,logiName,loTpId,loTypeName,periods) {
	if(type == 1) {
		//仓库
		if(whName == "" || whName == null) {
			jQuery("#whName").html("").append("<span style='color:red;'>未获取到仓库信息！</span>");
			jQuery("#whName").next().val("");
		}else{
			jQuery("#whName").html("").append("<span>" + whName + "</span>");
			jQuery("#whName").next().val(whId);
		}
		//物流公司
		if(logiName == "" || logiName == null) {
			jQuery("#logiName").html("").append("<span style='color:red;'>未获取到物流公司信息！</span>");
			jQuery("#logiName").next().val("");
		}else{
			jQuery("#logiName").html("").append("<span>" + logiName + "</span>");
			jQuery("#logiName").next().val(logiId);
		}
		//物流方式
		if(loTypeName == null || loTypeName == "") {
			jQuery("#logType").html("").append("&nbsp;<span style='color:red;'>未获取到物流方式！</span>");
			jQuery("#logType").next().val("");
		}else{
			jQuery("#logType").html("").append("&nbsp;<span>" + loTypeName + "</span>");
			jQuery("#logType").next().val(loTpId);
		}

		//配送时间段
		jQuery("#dispatchPeriod").empty();
		if(periods != null && periods != "") {
			for(var i=0;i<periods.length;i++) {
				jQuery("#dispatchPeriod").append("<option value='" + periods[i].dpeID + "'>" + periods[i].dpName + "</option>");
			}
		}
	}

}
/**
 * 保存订单
 * sumg
 */
function saveOrder(url,forward,backUrl,saveCallBack,buttonId){
	if (!empty(buttonId)) {
		jQuery("#" + buttonId).button("loading");
	}
	$("#orderForm").find("select[name=orProdType]").removeAttr("disabled");
	var param = jQuery("#orderForm").serialize();
	$("#orderForm").find("select[name=orProdType]").attr("disabled", "disabled");
	var phoneInfo = window.parent.jobController.getPhoneInfo();
	var mobile = '', baseOn = '', baseType = '', callType = '', beginTime = '';
	if (phoneInfo && phoneInfo.sessionId) {
		mobile = phoneInfo.phone;
		baseOn = phoneInfo.sessionId;
		baseType = phoneInfo.baseType;
		callType = phoneInfo.callType;
		beginTime = phoneInfo.btime;
	}
	param = param + "&mobile=" + mobile + "&baseOn=" + baseOn + "&baseType=" + baseType + "&callType=" + callType + "&beginTime=" + beginTime;
	console.log(param);
	jQuery.ajax({
		type : "POST",
		url : url,
		data : param,
		success : function(respObj) {
			alertInfo(respObj.data, forward, backUrl);
			if (respObj.result == 1){
				queryNotExpiredGift();	//重新查询未过期且未领取赠品
				window.parent.jobController.clearPhoneInfo();
				window.parent.phoneBehavior.caseOutWork();
			}
			if (!empty(buttonId)) {
				jQuery("#" + buttonId).button("reset");
			}
			if(!empty(saveCallBack)) {
				saveCallBack();
			}
			jQuery("#prodChangeConfirmButton").removeAttr("disabled");
			//jQuery("#editGoBackButton").removeAttr("disabled");
		}
	});
}
function getRfs() {
	$.ajax({
	    url:baseUrl+"/trash/getRfs",
	    type:'POST',
	    data:jQuery("#orderForm").serialize(),
	    success:function(msg){
			$("#opRfs").html('');
			if (!msg)
				return;
			if (msg.error){
				$("#opRfs").html(msg.error);
			}else{
				console.info(msg);
				var ul = '<ul>'
				for (var i in msg){
					ul += '<li>' + msg[i].refundwayStr + ' ' + msg[i].displayDTWay +' '+ msg[i].refundFeeAmt +'元</li>';
				}
				ul += '</ul>';
				$("#opRfs").html(ul);
			}
	    },
	    error:function(e){
	        console.info(e)
	    }
	});
}
/**
 * 保存订单
 * sumg
 */
function saveOrder2(url,forward,backUrl,saveCallBack,buttonId){
	if (!empty(buttonId)) {
		jQuery("#" + buttonId).attr("disabled","disabled");
		jQuery("#" + buttonId).button("loading");
		jQuery("#smgGoBackButton").attr("disabled","disabled");
	}
	var custName = jQuery("#custName").val();
	var contName = jQuery("#contName").val();
	var whId = jQuery("#whId").val();
	var loTpId = jQuery("#loTpId").val();
	var totalAmount = jQuery("#totalAmount").val();
	var logiId = "";

	var dispatchDate = jQuery("#dispatchDate").val();
	var dispatchPeriod = jQuery("#dispatchPeriod").val();

	if(jQuery("#logiId").is(":enabled")) {
		logiId = jQuery("#logiId").val();
	}else{
		logiId = jQuery("#orderForm input[name='logiId']").val();
	}

	if(empty(custName) || empty(contName)){
		alertInfo("请确认是否已选择订购人及收货人！");
		if (!empty(buttonId)) {
			jQuery("#" + buttonId).button("reset");
			jQuery("#" + buttonId).removeAttr("disabled");
			jQuery("#smgGoBackButton").removeAttr("disabled");
		}
		return false;
	}
	if(jQuery("#orderTable").is(":visible")) {
		if(jQuery("#orderTable tbody tr").length <= 1){
			alertInfo("请确认购物车中是否已添加商品！");
			if (!empty(buttonId)) {
				jQuery("#" + buttonId).button("reset");
				jQuery("#" + buttonId).removeAttr("disabled");
				jQuery("#smgGoBackButton").removeAttr("disabled");
			}
			return false;
		}
	}
	if(jQuery("#orderTable2").is(":visible")) {
		if(jQuery("#orderTable2 tbody tr").length <= 1){
			alertInfo("请确认购物车中是否已添加商品！");
			if (!empty(buttonId)) {
				jQuery("#" + buttonId).button("reset");
				jQuery("#" + buttonId).removeAttr("disabled");
				jQuery("#smgGoBackButton").removeAttr("disabled");
			}
			return false;
		}
	}
	if(empty(dispatchDate)) {
		alertInfo("请填写配送日期！");
		if (!empty(buttonId)) {
			jQuery("#" + buttonId).button("reset");
			jQuery("#" + buttonId).removeAttr("disabled");
			jQuery("#smgGoBackButton").removeAttr("disabled");
		}
		return false;
	}
	if(empty(whId)) {
		alertInfo("未获取到仓库！");
		if (!empty(buttonId)) {
			jQuery("#" + buttonId).button("reset");
			jQuery("#" + buttonId).removeAttr("disabled");
			jQuery("#smgGoBackButton").removeAttr("disabled");
		}
		return false;
	}
	if(empty(logiId)) {
		alertInfo("未获取到物流公司！");
		if (!empty(buttonId)) {
			jQuery("#" + buttonId).button("reset");
			jQuery("#" + buttonId).removeAttr("disabled");
			jQuery("#smgGoBackButton").removeAttr("disabled");
		}
		return false;
	}

	if(parseFloat(totalAmount) < 0.00) {
		alertInfo("订单金额不能小于0！");
		if (!empty(buttonId)) {
			jQuery("#" + buttonId).button("reset");
			jQuery("#" + buttonId).removeAttr("disabled");
			jQuery("#smgGoBackButton").removeAttr("disabled");
		}
		return false;
	}

	var daProvince = jQuery("#daProvince").val();
	var daCity = jQuery("#daCity").val();
	var daRegion = jQuery("#daRegion").val();

	jQuery.ajax({
		type : "POST",
		url : "../trash/getDispatchDate2",
		data : {"daProvince":daProvince, "daCity":daCity, "daRegion":daRegion, "loTpId":loTpId},
		success : function(json) {
			var bestDispatchDate = json.dispatchDate;
			var bestDispatchPeriod = json.period;

			if(!empty(bestDispatchDate)) {
				var validResult = validtorTime(dispatchDate,bestDispatchDate);
				if(validResult == 1) {

				}else if(validResult == 0){
					if(parseInt(dispatchPeriod) < parseInt(bestDispatchPeriod)) {
						alertInfo("配送时间段选择不正确！");
						if (!empty(buttonId)) {
							jQuery("#" + buttonId).button("reset");
							jQuery("#" + buttonId).removeAttr("disabled");
							jQuery("#smgGoBackButton").removeAttr("disabled");
						}
						return false;
					}
				}else{
					alertInfo("配送时间有误，最早可配送时间为：" + bestDispatchDate);
					if (!empty(buttonId)) {
						jQuery("#" + buttonId).button("reset");
						jQuery("#" + buttonId).removeAttr("disabled");
						jQuery("#smgGoBackButton").removeAttr("disabled");
					}
					return false;
				}
				saveOrderToDB(url,forward,backUrl,saveCallBack,buttonId);
			}else{
				alertInfo(json.errorMsg);
				if (!empty(buttonId)) {
					jQuery("#" + buttonId).button("reset");
					jQuery("#" + buttonId).removeAttr("disabled");
					jQuery("#smgGoBackButton").removeAttr("disabled");
				}
				return false;
			}
		}
	});
}
function saveOrderToDB(url,forward,backUrl,saveCallBack,buttonId) {
	if (!empty(buttonId)) {
		jQuery("#" + buttonId).attr("disabled","disabled");
		jQuery("#" + buttonId).button("loading");
	}
	$("#orderForm").find("select[name=orProdType]").removeAttr("disabled");
	var param = jQuery("#orderForm").serialize();
	$("#orderForm").find("select[name=orProdType]").attr("disabled","disabled");
	jQuery.ajax({
		type : "POST",
		url : url,
		data : param,
		success : function(json) {
			json = jQuery.parseJSON(json);

			if(json.result == "1") {
				//保存成功
				if(forward == 1){
					if(!empty(backUrl)) {
						var path = backUrl + "?orderId=" + json.orderId + "&orderNo=" + json.orderNo;
						if(!empty(json.renId) && !empty(json.renNo)) {
							path += "&renId=" + json.renId + "&renNo=" + json.renNo;
						}
						asyncLoad(path);//根据路径跳转
					}
				}else if(forward == 2) {
					toMainPage();//无跳转，显示主页面
					jQuery("#saveResultInfo").empty().html("<span class='glyphicon glyphicon-info-sign'></span>&nbsp;" +
						"新增订单成功!内部订单号：<a href='#' onclick='showOrderInfo(\"" + json.orderId + "\");'>" + json.orderNo + "</a>");
					jQuery("#saveResultInfo").show();
				}

				if(!empty(saveCallBack)) {
					eval(saveCallBack);
				}
			}else{
				//保存失败
				alertInfo("订单保存失败，错误原因：" + json.msg);
				if (!empty(buttonId)) {
					jQuery("#" + buttonId).button("reset");
					jQuery("#" + buttonId).removeAttr("disabled");
					jQuery("#smgGoBackButton").removeAttr("disabled");
				}
			}
		}
	});
}
/**
 * 保存订单
 * sumg
 */
function beforeSubmitValid(){
	var custName = jQuery("#custName").val();
	var contName = jQuery("#contName").val();
	var whId = jQuery("#whId").val();
	var loTpId = jQuery("#loTpId").val();
	var totalAmount = jQuery("#totalAmount").val();
	var logiId = "";

	var dispatchDate = jQuery("#dispatchDate").val();
	var dispatchPeriod = jQuery("#dispatchPeriod").val();

	if(jQuery("#logiId").is(":enabled")) {
		logiId = jQuery("#logiId").val();
	}else{
		logiId = jQuery("#orderForm input[name='logiId']").val();
	}

	if(empty(custName) || empty(contName)){
		alertInfo("请确认是否已选择订购人及收货人！");
		return false;
	}
	if(jQuery("#orderTable tbody tr").length <= 1){
		alertInfo("请确认购物车中是否已添加商品！");
		return false;
	}
	if(empty(dispatchDate)) {
		alertInfo("请填写配送日期！");
		return false;
	}
	if(empty(whId)) {
		alertInfo("未获取到仓库！");
		return false;
	}
	if(empty(logiId)) {
		alertInfo("未获取到物流公司！");
		return false;
	}
	if(parseFloat(totalAmount) < 0.00) {
		alertInfo("订单金额不能小于0！");
		return false;
	}
	return true;
}
/**
 * 编辑订单
 * sumg
 */
function editOrder(type,orderId,source,buttonId) {
	if(!empty(buttonId)) {
		jQuery("#" + buttonId).button("loading");
	}

	jQuery.ajax({
		type : "POST",
		url : "../trash/edit",
		data : "type=" + type + "&orderId=" + orderId,
		success : function(msg) {
			toSubPage();
			jQuery("#subPage").append(msg);
			if(!empty(source)) {
				jQuery("#editSource").val(source);
			}
			if(!empty(buttonId)) {
				jQuery("#" + buttonId).button("reset");
			}
			//if(type == "300005") {
			//	jQuery("#editGoBackButton").attr("onclick","queryOrder();toMainPage();");
			//}
		}
	});
}
/**
 * 拆分订单
 * sumg
 */
function splitOrder(type,orderId) {
	jQuery.ajax({
		type : "POST",
		url : "../orderEdit/splitOrder",
		data : "type=" + type + "&orderId=" + orderId,
		success : function(msg) {
			toThirdPage();
			jQuery("#thirdPage").append(msg);
		}
	});
}
function toThirdPage() {
	jQuery("#subPage").hide();
	jQuery("#thirdPage").empty();
	jQuery("#thirdPage").show();
}
/**
 * 计算最后优惠
 */
function caluDiscount() {
	var array = new Array();
	var daProvinceName = jQuery("#daProvinceName").val();

	if(jQuery("#orderTable tbody tr").length <= 1){
		alertInfo("请确认购物车中是否已添加商品！");
		return false;
	}else if(daProvinceName == null || daProvinceName == "") {
		alertInfo("请确认是否已选择收货地址！");
		return false;
	}else{
		jQuery("#orderTable tbody tr:not(:first)").each(function() {
			var prdCode = jQuery(this).find("td:eq(0)").find("input[name='psCode']").val();
			var count = jQuery(this).find("td:eq(4)").find("input[name='prodNum']").val();
			var prod = new Object();
			prod.prdCode = prdCode;
			prod.count = count;
			array.push(prod);
		});
	}
	var postObj = new Object();
	postObj.province = daProvinceName;
	postObj.products = array;

	jQuery("#finalDiscount").button("loading");

	jQuery.ajax({
		type : "POST",
		url : "../soa/caluDiscount",
		data : "json="+ JSON.stringify(postObj),
		success : function(json) {
			jQuery("#alertDiv").empty();

			if(json != null && json != "") {
				var disAmount = json.disAmount;
				var totalAmount = json.totalAmount;
				var result = json.result;
				var prodVos = json.prodVos;
			}

			for(var i=0;i<prodVos.length;i++) {
				if(prodVos[i].errMsg != null && prodVos[i].errMsg != "") {
					jQuery("#alertDiv").append(prodVos[i].prodName + prodVos[i].errMsg + "<br>");
				}else{
					var prodCode = prodVos[i].prodCode;
					var prodType = prodVos[i].prodType;

					jQuery("#orderTable tr").each(function() {
						if(jQuery(this).prop("id") == prodCode && prodType == 1) {
							jQuery(this).remove();
						}
					});
					addNewRow("",prodVos[i].psId,prodVos[i].prodId,prodVos[i].prodCode,prodVos[i].prodName,prodVos[i].prodSpec,prodVos[i].prodUnit,prodVos[i].salePrice,prodVos[i].prodNum,prodVos[i].rebateAmt,prodVos[i].prodType,prodVos[i].prodDisType,prodVos[i].prodDisAmt,"","","","","");
				}
			}
			if(!empty(disAmount)) {
				jQuery("#disAmount").val(disAmount.toFixed(2));
				jQuery("#disAmount").prev("span").html("¥" + disAmount.toFixed(2));
			}
			//change总金额
			changeTotalAmount();

			if(prodVos.length == 0) {
				jQuery("#alertDiv").append("请求官网超时！<br>");
			}

			var msg = jQuery("#alertDiv").html();
			if(msg != null && msg != "") {
				jQuery("#alertDiv").show();
			}
			jQuery("#finalDiscount").button("reset");
		}
	});
}
function changePrint() {
	if(jQuery("#printCheck").prop("checked")) {
		jQuery("#printCheck").next().val(1);
	}else{
		jQuery("#printCheck").next().val(2);
	}
}
/********************************************************************************************/
/**
 * 隐藏折扣栏
 */
function hideDiscount() {
	jQuery("#orderTable thead tr").find("th:eq(2)").hide();
	jQuery("#orderTable tbody tr").each(function() {
		jQuery(this).find("td:eq(2)").hide();

	});
}
/**
 * 显示折扣栏
 */
function showDiscount() {
	jQuery("#orderTable thead tr").find("th:eq(2)").show();
	jQuery("#orderTable tbody tr").each(function() {
		jQuery(this).find("td:eq(2)").show();
	});
}
/**
 * 检查输入数量是否正确
 */
function checkNum(obj) {
	var num = jQuery(obj).val();
	if(!isNumber(num)){
		jQuery(obj).val("1");
	}else{
		changeTotalAmount();
	}
}
function checkNum1(obj) {
	var num = jQuery(obj).val();
	if(!isNumber(num)){
		jQuery(obj).val("1");
	}
}
/**
 * 检查折扣率 0.01-1.00
 */
function checkDiscountRate(obj) {
	var flag = true;
	var num = jQuery(obj).val();
	if(!num){
		flag = false;
	}
	var reg = /^[0-1]+(.[0-9]{1,2})?$/;
	if(!reg.test(num)){
		jQuery(obj).val();
		flag = false;
	}else{
		if(parseFloat(num) < 0.01 || parseFloat(num) > 1) {
			flag = false;
		}
	}
	if(flag) {
		calculate(obj);
	}else{
		jQuery(obj).val("1.00");
		calculate(obj);
	}
}
/**
 * 检查折扣金额
 * 0<=折扣<单价
 */
function checkDiscountMoney(obj) {
	var disCount = jQuery(obj).val();
	var price = jQuery(obj).parent().next().find("input[name='prodPrice']").val();
	var flag = true;
	var reg = /^[0-9]+(.[0-9]{1,2})?$/;

	if(!disCount){
		flag = false;
	}else{
		if(!reg.test(disCount)){
			flag = false;
		}else{
			if(parseFloat(disCount) < parseFloat(0) || parseFloat(disCount) >= parseFloat(price)) {
				flag = false;
			}
		}
	}

	if(flag) {
		calculate(obj);
	}else{
		jQuery(obj).val("0.00");
		calculate(obj);
	}
}
/**
 * 判断是否为数字
 * sumg
 */
function isNumber(oNum){
	if(!oNum){
		return false;
	}

	var strP=/^\d+$/; //正整数

	if(!strP.test(oNum)){
		return false;
	}

	return true;

}
/**
 * 是否为空
 * sumg
 */
function empty(v){
	switch (typeof v){
		case 'undefined' : return true;
		case 'string' : if(jQuery.trim(v).length == 0 || jQuery.trim(v) == "null") return true; break;
		case 'boolean' : if(!v) return true; break;
		case 'number' : if(0 === v) return true; break;
		case 'object' :
			if(null === v) return true;
			if(undefined !== v.length && v.length==0) return true;
			for(var k in v){return false;} return true;
			break;
	}
	return false;
}
/**
 * 配送时间校验
 */
function validtorTime(startTime,endTime){
	var d1 = new Date(startTime.replace(/\-/g, "\/"));
	var d2 = new Date(endTime.replace(/\-/g, "\/"));

	if(d1<d2) {
		return -1;
	}else if(d1 > d2) {
		return 1;
	}else{
		return 0;
	}
}
/********************************************************************************************/
