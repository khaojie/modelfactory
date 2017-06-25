Date.prototype.hkjFormat = function (fmt) { //author: meizz
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds(), //毫秒
		"H+": this.getHours()
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
};
// 验证用户是否输入数字 .
function validatePureNumber(obj) {
	var pattern = /^([0-9]+)$/;
	if (!pattern.test(obj))
		return false;
	return true;
};
function delimiterConvert(val){
	return val.replace('-','/').replace('-','/')
}
function ToDecimal(x) {
	var f_x = parseFloat(x);
	if (isNaN(f_x)) {
		alert('function:ToDecimal->parameter error' + x);
		return false;
	}
	var f_x = Math.round(x * 100) / 100;

	return f_x;
};
// 验证用户是否输入正确格式的金额
function validatePrice(obj) {
	var pattern = /^([0-9.]+)$/;
	if (!pattern.test(obj))
		return false;
	return true;
};
//判断对象或值是否为空
function isNotEmpty(val) {
	if (val == null || val === '' || typeof (val) == 'undefined' || $.trim(val)==='')
		return false;
	return true;
};
//生成动态HTML代码。
function formatTemplate(dta, tmpl) {
	var format = {
		name: function(x) {
			return x
		}
	};
	return tmpl.replace(/{(\w+)}/g, function(m1, m2) {
		if (!m2)
			return "";
		return (format && format[m2]) ? format[m2](dta[m2]) : dta[m2];
	});
};
//初始化DatePicker
function initDatePicker(comps){
	var defaultDateOptions={
		language : "zh-CN",
		autoclose : true,
		format : "yyyy-mm-dd",
		startDate : new Date()
	};
	for(var i=0;i<comps.length;i++){
		var param = comps[i];
		if(isNotEmpty(param.options))
			$('#'+param.compName).datepicker(param.options);
		else
			$('#'+param.compName).datepicker(defaultDateOptions);
	}
};
function initDateTimePicker(cls){
	var dateDefaultOption = {language: "zh-CN", autoclose: true, format: "yyyy-mm-dd hh:ii"};
	$('.'+cls).each(function(i){
		$(this).datetimepicker(dateDefaultOption);
	});
};
function initDateTimePicker1(comps){
	var defaultDateOptions={
		language : "zh-CN",
		autoclose : true,
		format : "yyyy-mm-dd hh:ii",
		startDate : new Date()
	};
	for(var i=0;i<comps.length;i++){
		var param = comps[i];
		if(isNotEmpty(param.options))
			$('#'+param.compName).datetimepicker(param.options);
		else
			$('#'+param.compName).datetimepicker(defaultDateOptions);
	}
};
/**
 * 年月格式时间插件
 * @param cls
 */
function initYearMonthPicker(cls){
	var dateDefaultOption = {language: "zh-CN", autoclose: true, format: "yyyy-mm"};
	$('.'+cls).each(function(i){
		$(this).datetimepicker(dateDefaultOption);
	});
};
//初始化日期范围选择控件。
function initDateRangePicker(comps){
	for(var i=0;i<comps.length;i++){
		var startField = comps[i].startField;
		var endField = comps[i].endField;
		$('#'+startField.fieldName).datepicker(startField.options).on('changeDate', function(selected){
			var startDate = new Date(selected.date.valueOf());
			startDate.setDate(startDate.getDate(new Date(selected.date.valueOf())));
			$('#'+endField.fieldName).datepicker('setStartDate', startDate);
		});
		$('#'+endField.fieldName).datepicker(endField.options).on('changeDate', function(selected){
			var fromEndDate = new Date(selected.date.valueOf());
			fromEndDate.setDate(fromEndDate.getDate(new Date(selected.date.valueOf())));
			$('#'+startField.fieldName).datepicker('setEndDate', fromEndDate);
		});
	}
}
function initDateTimeRangePicker(comps){
	for(var i=0;i<comps.length;i++){
		var startField = comps[i].startField;
		var endField = comps[i].endField;
		$('#'+startField.fieldName).datetimepicker(startField.options);
		$('#'+endField.fieldName).datetimepicker(endField.options);
	}
}
//判断两个时间的大小
function checkTimeSlot(startDateStr,endDateStr){
	var startDate = new Date(Date.parse(startDateStr));
	var endDate = new Date(Date.parse(endDateStr));
	var between=(endDate.getTime()-startDate.getTime());
	if (between > 0){
		return 1;
	}else if(between == 0){
		return 0;
	}else{
		return -1;
	}
}

//计算两个时间的时间差
function calcTimeInterval(startDateStr,endDateStr,resultMode){
	var startDate = new Date(Date.parse(startDateStr));
	var endDate = new Date(Date.parse(endDateStr));
	var between=(endDate.getTime()-startDate.getTime())/1000;//除以1000是为了转换成秒
	if("day"==resultMode)
		return Math.abs(between/(24*3600));
	else if("hour"==resultMode)
		return Math.abs(between%(24*3600)/3600);
	else if("minute"==resultMode)
		return Math.abs(between/60);
	else if("second"==resultMode)
		return between%60/60;
	else
		return 0;
}

/**
 * 是否是整数
 * @param obj
 * @returns {Boolean}
 */
function isInteger(obj) {
	return obj%1 === 0
}

/**
 * 计算保留指定小数后的值,此方法会四舍五入
 * @param src
 * @param pos
 * @returns {Number}
 */
function fomatHKJFloat(src,pos){
	return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);
}


/**
 * 判断需要保留几位小数
 * @param num
 * @returns {Number}
 */
function checkKeepPosition(num){
	if(isInteger(num))
		return 0;
	var x = new String(num);
	return x.length-1-x.indexOf(".");
}

function calcAmountWithRatio(beiChenShu,xishu,referenceShu){
	var pos = checkKeepPosition(referenceShu);//确定保留几位小数
	var value = ToDecimal(beiChenShu*xishu);//被乘数*系数
	return fomatHKJFloat(value,pos);
}
function getDataTableConfig(){
	return {
		searching: false,
		language:{url:baseUrl+"resources/config/table_language.json"},
		pagingType:"full_numbers",
		serverSide: true,
		ordering:false,
		processing: true
	}
}

if(typeof (common) == 'undefined'){
	common={
		clearModalBug:function(){
			$(".modal-backdrop").remove();
		},
		verifyResultData:function(data){
			if(data==='login fail'){
				userController.resetLogin();
				return false;
			}
			if(data.result==0){
				if(data.data=='login fail')
					userController.resetLogin();
				else
					alert(data.data);
				return false;
			}
			return true;
		}
	}
}
