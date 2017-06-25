/**
 * Created by cxx on 2015/7/29.
 */
jQuery(function () {
    $.fn.serializeJson = function () {
        var serializeObj = {};
        var array = this.serializeArray();
        if (arguments.length > 0) {
            for (var i in arguments) {
                serializeObj[arguments[i]] = new Array();
            }
        }
        $(array).each(function () {
            if (serializeObj[this.name]) {
                if ($.isArray(serializeObj[this.name])) {
                    serializeObj[this.name].push(this.value);
                } else {
                    serializeObj[this.name] = [serializeObj[this.name], this.value];
                }
            } else {
                serializeObj[this.name] = this.value;
            }
        });
        return serializeObj;
    };
    Date.prototype.myFormat = function (format) {
        var o = {
            "M+": this.getMonth() + 1, //month
            "d+": this.getDate(), //day
            "h+": this.getHours(), //hour
            "m+": this.getMinutes(), //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
            "S": this.getMilliseconds() //millisecond
        }

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }
    String.prototype.endWith = function (str) {
        if (str == null || str == "" || this.length == 0 || str.length > this.length)
            return false;
        if (this.substring(this.length - str.length) == str)
            return true;
        else
            return false;
        return true;
    }
    String.prototype.startWith = function (str) {
        if (str == null || str == "" || this.length == 0 || str.length > this.length)
            return false;
        if (this.substr(0, str.length) == str)
            return true;
        else
            return false;
        return true;
    }
});
if (typeof (MyUtil) == 'undefined') {
    MyUtil = {
        loading: function (id) {  //加载中
            if (id) {
                $("#"+id).html('<div style="height:50px;text-align:center;"><i class="fa fa-spinner fa-pulse fa-3x fa-fw" style="color:#788DBA;"></i></div>');
            } else {
                $.blockUI({
                    message: '<i class="fa fa-spinner fa-pulse fa-3x fa-fw" style="color:#788DBA;"></i>',
                    baseZ: 1000,
                    centerY: false,
                    css: {
                        border: 'none',
                        top: "40%",
                        padding: '0',
                        backgroundColor: 'none'
                    }, overlayCSS: {
                        backgroundColor: '#555',
                        opacity: 0.1,
                        cursor: 'wait'
                    }
                });
            }
        },
        loaded: function (id) {    //加载完成
            if (id) {
                $("#"+id).empty();
            } else {
                $.unblockUI();
            }
        },
        /*
         * 将json数据传给form中的input类型的对象
         * (form中:input 的 name 要和 json 的属性对应 )
         */
        transferJsonToForm: function (json, formName) {
            MyUtil.clearFormValue(formName);
            for (var i in json) {
                jQuery("#" + formName + " :input[name='" + i + "']").val(json[i]).trigger("change");
            }
        },
        transferJsonToFormEx: function (json, formName) {
            for (var i in json) {
                var $input = jQuery("#" + formName + " :input[name='" + i + "']");
                if ($input.attr("type") === "checkbox" || $input.attr("type") === "radio") {
                    jQuery("#" + formName + " :input[name='" + i + "'][value=" + json[i] + "]").prop("checked", true);
                } else {
                    $input.val(json[i]);
                }
            }
        },
        /*
         * 将json数据传给form中的input类型的对象
         * (form中:input 的 name 要和 json 的属性对应 )
         */
        transferJsonToElement: function (json, element) {
            MyUtil.clearElementValue(element);
            for (var i in json) {
                element.find(":input[name='" + i + "']").val(json[i]);
            }
        },
        /**
         * 清除form中的name元素的值
         * @param forName form的id
         */
        clearFormValue: function (forName) {
            jQuery("#" + forName + " :input").each(
                function () {
                    var name = jQuery(this).attr("name");
                    jQuery("#" + forName + " :input[name=" + name + "]").val('');
                }
            );
        },
        /**
         * 清除对象下所有input的值
         * @param element jQuery对象
         */
        clearElementValue: function (element) {
            element.find(":input").each(
                function () {
                    var name = jQuery(this).attr("name");
                    element.find(":input[name=" + name + "]").val('');
                }
            );
        },
        /**
         * 请求html资源，并讲该资源绑定到divMain
         * @param url 请求的路径
         * @param param 请求的参数
         */
        asyncLoad: function (url, param) {
            jQuery.post(url, param, function (data) {
                jQuery("#divMain").html(data);
            });
        },
        /**
         * js预校验
         * @param formName from的Id
         * @returns {boolean} 校验结果
         */
        validateInput: function (formName) {
            //校验
            jQuery("#" + formName).validationEngine('attach', {
                relative: true,
                //提示框位置
                promptPosition: "bottomLeft"
            });
            if (!jQuery("#" + formName).validationEngine('validate')) {
                return false;
            }
            return true;
        },
        /**
         * 弹窗
         * @param info 弹窗信息
         */
        alertInfo: function (info) {
            if (jQuery("#alertModal").length > 0) {
                jQuery("#alertContent").find("div").eq(1).html(info);
            } else {
                jQuery("body").append("<div class='modal' style='z-index: 9999' id='alertModal' role='dialog'>" +
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
            jQuery("body").css("padding-right", "0px");
            //center(jQuery("#alertModalDialog"));

            jQuery("#alertModal").off("hidden.bs.modal");
            jQuery("#alertModal").on('hidden.bs.modal', function (e) {
                //隐藏弹窗的时候调用的方法
            });
        },
        /**
         * 显示和隐藏模块
         * @param show_id 要显示的模块的Id
         * @param hide_id 要隐藏的模块的Id
         */
        show_and_hide: function (show_id, hide_id) {
            jQuery("#" + show_id).show();
            jQuery("#" + hide_id).hide();
        },
        /**
         * 新增
         * @param obj 按纽对象，用来防止重复提交的
         * @param url 请求服务器路径
         * @param method 请求方法
         * @param formId form的id，用来校验输入，和获取参数
         * @returns {boolean} 当返回值为false的时候，校验不通过
         */
        add: function (obj, url, addFormId, method) {
            if (!MyUtil.validateInput(addFormId)) {
                return false;
            }
            if (typeof (method) == 'undefined') {
                method = "POST";
            }
            var param = jQuery("#" + addFormId).serialize();
            $(obj).attr("disabled", true);
            jQuery.ajax({
                type: method,
                url: baseUrl + url,
                data: param,
                success: function (msg) {
                    $(obj).removeAttr("disabled");
                    if (msg == 1) {
                        MyUtil.clearFormValue(addFormId);
                        alert("新增成功！");
                    } else {
                        alert("新增失败！");
                    }
                }
            });
        },
        search: function (obj, url, queryFormId, targetId, method) {
            var param = jQuery("#" + queryFormId).serialize();
            if (obj != null) {
                $(obj).attr("disabled", true);
            }
            if (typeof (method) == 'undefined') {
                method = "POST";
            }
            jQuery.ajax({
                type: method,
                url: baseUrl + url,
                data: param,
                success: function (html) {
                    if (obj != null) {
                        $(obj).removeAttr("disabled");
                    }
                    console.info(targetId);
                    console.info(html);
                    jQuery("#" + targetId).html(html);
                }
            });
        },
        showOrderInfo: function (orderId,initFlag) {
            if (!orderInfoUtil.preHandle({orderId: orderId}, initFlag)) {
                return;
            }
            jQuery.ajax({
                type: "POST",
                url: baseUrl + "orderInfo/getOrderInfoByOrderId",
                data: {
                    "orderId": orderId,
                    "index": 1
                },
                success: function (json) {
                    pageController.removeCommonModal();
                    jQuery("body").append("<div class='modal orderModal' id='orderModal' role='dialog' aria-hidden='true'></div>");
                    jQuery("#orderModal").empty().html(json);
                    jQuery("#orderModal").modal("show");

                    jQuery.ajax({
                        type: "POST",
                        url: baseUrl + "orderInfo/getOrderInfoByOrderId",
                        data: {
                            "orderId": orderId,
                            "index": 2
                        },
                        success: function (json) {
                            jQuery("#settlePanel").empty().html(json);
                        }
                    });
                    jQuery.ajax({
                        type: "POST",
                        url: baseUrl + "orderInfo/getOrderInfoByOrderId",
                        data: {
                            "orderId": orderId,
                            "index": 3
                        },
                        success: function (json) {
                            jQuery("#complainPanel").empty().html(json);
                        }
                    });
                    jQuery.ajax({
                        type: "POST",
                        url: baseUrl + "orderInfo/getOrderInfoByOrderId",
                        data: {
                            "orderId": orderId,
                            "index": 4
                        },
                        success: function (json) {
                            jQuery("#returnPanel").empty().html(json);
                        }
                    });
                    jQuery.ajax({
                        type: "POST",
                        url: baseUrl + "orderInfo/getOrderInfoByOrderId",
                        data: {
                            "orderId": orderId,
                            "index": 5
                        },
                        success: function (json) {
                            jQuery("#relevancePanel").empty().html(json);
                        }
                    });
                    jQuery.ajax({
                        type: "POST",
                        url: baseUrl + "orderInfo/getOrderInfoByOrderId",
                        data: {
                            "orderId": orderId,
                            "index": 6
                        },
                        success: function (json) {
                            jQuery("#invoiceApplyPanel").empty().html(json);
                        }
                    });
                    jQuery.ajax({
                        type: "POST",
                        url: baseUrl + "orderInfo/getOrderInfoByOrderId",
                        data: {
                            "orderId": orderId,
                            "index": 7
                        },
                        success: function (json) {
                            jQuery("#orderEventPanel").empty().html(json);
                        }
                    });
                }
            });
        },
        hideMobileAndShow: function (id, num) {
            if (num == null) {
                var td = jQuery("#" + id);
                var custMobile = td.html().trim().substring(0, 3) + "****" + td.html().trim().substring(7);
                var showdiv = "<div >" + custMobile + "</div>";
                var hidediv = "<div  style = 'display:none';>" + td.html().trim() + "</div>";
                td.attr("onmouseover", "MyUtil.showNone(this)");
                td.attr("onmouseout", "MyUtil.showBlock(this)");
                td.html(showdiv + hidediv);

            } else {
                jQuery("#" + id).find("tr").each(function () {
                    var td1 = jQuery(this).find("td").eq(num);
                    if (td1.html() == undefined || td1.html() == null || td1.html().trim() == "") {
                        return false;
                    }
                    var tds = td1.html().trim().split("&amp;");
                    if (tds.length > 1) {
                        var custMobile = tds[0].substring(0, 3) + "****" + tds[0].substring(7);
                        var mobile = tds[1].substring(0, 3) + "****" + tds[1].substring(7);
                        var showdiv = "<div >" + custMobile + '&' + mobile + "</div>";
                        var hidediv = "<div  style = 'display:none';>" + tds[0] + '&' + tds[1] + "</div>";
                    } else {
                        var custMobile = tds[0].substring(0, 3) + "****" + tds[0].substring(7);
                        var showdiv = "<div >" + custMobile + "</div>";
                        var hidediv = "<div  style = 'display:none';>" + tds[0] + "</div>";
                    }
                    td1.attr("onmouseover", "MyUtil.showNone(this)");
                    td1.attr("onmouseout", "MyUtil.showBlock(this)");
                    td1.html(showdiv + hidediv);
                });
            }
        },
        showNone: function (obj) {
            $(obj).find("div").eq(0).hide();
            $(obj).find("div").eq(1).show();
        },
        showBlock: function (obj) {
            $(obj).find("div").eq(1).hide();
            $(obj).find("div").eq(0).show();
        },
        transferLongToDate: function () {
            jQuery(".LTD").each(
                function () {
                    var longtime = jQuery(this).text();
                    if (!MyUtil.isEmpty(longtime) && !isNaN(longtime)) {
                        var date = new Date(parseInt(longtime)).myFormat("yyyy-MM-dd hh:mm:ss");
                        jQuery(this).text(date);
                    }
                }
            )
        },
        transferLongToDate1: function () {
            jQuery(".LTD1").each(
                function () {
                    var longtime = jQuery(this).text();
                    if (!MyUtil.isEmpty(longtime) && !isNaN(longtime)) {
                        var date = new Date(parseInt(longtime)).myFormat("yyyy-MM-dd");
                        jQuery(this).text(date);
                    }
                }
            )
        },
        getLongTimeBySessionId: function (sessionId) {
            return parseInt(sessionId.split('-')[0] + "000");
        },
        showO2OOrderInfo: function (orderNo) {
            jQuery.ajax({
                type: "POST",
                url: baseUrl + "o2o/showO2OOrderInfo",
                data: {"orderNo": orderNo},
                success: function (json) {
                    pageController.removeCommonModal();
                    jQuery("body").append("<div class='modal' id='orderModal' role='dialog' aria-hidden='true'></div>");
                    jQuery("#orderModal").empty().html(json);
                    jQuery("#orderModal").modal("show");
                }
            });
        },
        timeDif: function (beginTime, endTime) {
            var res = 0;
            try {
                res = endTime.getTime() - beginTime.getTime();
            } catch (e) {
                console.info(e);
            }
            return res;
        },
        timeAdd: function (dateTime, times) {
            try {
                console.info(dateTime.getTime() + times);
                return new Date(dateTime.getTime() + times).myFormat("yyyy-MM-dd hh:mm:ss");
            } catch (e) {
                return null;
            }
        },
        checkMobile: function (num) {//判断是手机号是外地号码，还是本地号码。
            if (num.length == 12) {
                if (num.substring(0, 2) == "01") {
                    if (num.substring(0, 3) != "010") {
                        num = num.substring(1, num.length)
                    }
                }
            }
            return num;
        },
        clearFormAllElemet: function (formName, elementArray) {
            jQuery("#" + formName).find(elementArray.join(",")).each(
                function () {
                    if (this.type == "radio" || this.type == "checkbox") {

                    } else {
                        jQuery(this).val("");
                        jQuery(this).text("");
                        jQuery(this).html("");
                    }
                }
            );
        },
        //查看具体的投诉信息
        viewComplaintDetail: function (comId) {
            jQuery.ajax({
                type: "POST",
                url: baseUrl + "complaint/ComplaintDetailQuery",
                data: "comId=" + comId,
                success: function (json) {
                    pageController.removeCommonModal();
                    jQuery("body").append("<div class='modal' id='compModal' role='dialog' aria-hidden='true'></div>");
                    jQuery("#compModal").empty().html(json);
                    jQuery("#compModal").modal("show");
                }
            });
        },
        /**
         *
         * Verion 1.0.2(支持不穿参数默认值curPage,pageForm,默认为异步提交)
         * @author ZacTang
         * @param curPage        当前页面
         * @param curPageName    当前页name
         * @param formname    对应的form 名称
         * @param repsonseId        如果不为空为异步提交（repsonseId 为提交后要刷新空间的ID） ，否则为直接提交
         */
        pageByForm2: function (curPage, curPageName, formname, repsonseId) {
            var dft = 0;

            if ("undefined" == typeof(curPageName) || null == curPageName || curPageName == "") {
                curPageName = "curPage";
                dft++;
            }

            if ("undefined" == typeof(formname) || null == formname || formname == "") {
                formname = "pageForm";
                dft++;
            }
            if (dft == 2) {
                repsonseId = "dft";
            }

            jQuery("#" + curPageName).val(curPage);


            var prm = jQuery("#" + formname).serialize();

            var flg = "undefined" != typeof(repsonseId) && repsonseId != 0 && repsonseId != "";

            if (flg) {

                var url = jQuery("#" + formname).attr("action");
                $.ajax({
                    type: "POST",
                    url: url,
                    data: prm,
                    success: function (msg) {

                        if (repsonseId == "dft") {
                            var divId = jQuery("#divId").val();
                            var flg1 = "undefined" != typeof(divId) && divId != 0 && divId != "";
                            if (flg1) {
                                jQuery("#" + divId).html(msg);
                            } else {
                                jQuery(jQuery("#" + formname)).parent()[0].html(msg);
                            }


                        } else {
                            jQuery("#" + repsonseId).html(msg);
                        }


                    }
                });
            } else {
                //temp code
                if (repsonseId == "dft") {
                    var url = jQuery("#" + formname + "").attr("action");
                    $.ajax({
                        type: "POST",
                        url: url,
                        data: prm,
                        success: function (msg) {
                            var divId = jQuery("#divId").val();

                            var flg = "undefined" != typeof(divId) && divId != 0 && divId != "";
                            if (flg) {
                                jQuery("#" + divId).html(msg);
                            } else {
                                jQuery(jQuery("#" + formname)).parent()[0].html(msg);
                            }

                        }
                    });
                } else {
                    $("#" + formname + "").submit();
                }

            }
        },
        showCommonModal: function (header, table, width) {
            if (jQuery("#commonModal").length == 0) {
                var modal =
                    '<div class="modal fade" id="commonModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
                    '<div id="commonModalDialog" class="modal-dialog" role="document">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                    '<h4 class="modal-title" id="commonModalHead"></h4>' +
                    '</div>' +
                    '<div class="modal-body" id="commonModalBody">' +
                    '</div>' +
                    '<div class="modal-footer" style="text-align: center">' +
                    '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                jQuery("body").append(modal);
            }
            if (MyUtil.isEmpty(width)) {
                jQuery("#commonModalDialog").removeAttr("style");
            } else {
                jQuery("#commonModalDialog").width(width);
            }
            jQuery("#commonModalHead").empty().text(header);
            jQuery("#commonModalBody").empty().html(table);
            jQuery("#commonModal").modal("show");
        },
        showHelp: function (url) {
            window.open(url);
        },
        showOrderInfoModal: function (orderNo, orderId, options, initFlag) {
            if (!orderInfoUtil.preHandle({orderNo: orderNo}, initFlag)) {
                return;
            }
            jQuery.ajax({
                type: "POST",
                url: baseUrl + "orderInfo/getOrderInfoModal",
                data: {
                    "orderNo": orderNo,
                    "index": 1
                },
                success: function (json) {
                    pageController.removeCommonModal();
                    jQuery("body").append("<div class='modal' id='orderModal' role='dialog' aria-hidden='true'></div>");
                    jQuery("#orderModal").empty().html(json);
                    jQuery("#orderModal").modal("show");

                    jQuery.ajax({
                        type: "POST",
                        url: baseUrl + "orderInfo/getOrderInfoModal",
                        data: {"orderNo": orderNo, "orderId": orderId, "index": 2},
                        success: function (json) {
                            jQuery("#settlePanel").empty().html(json);
                        }
                    });
                    jQuery.ajax({
                        type: "POST",
                        url: baseUrl + "orderInfo/getOrderInfoModal",
                        data: {"orderNo": orderNo, "orderId": orderId, "index": 3},
                        success: function (json) {
                            jQuery("#complainPanel").empty().html(json);
                        }
                    });
                    jQuery.ajax({
                        type: "POST",
                        url: baseUrl + "orderInfo/getOrderInfoModal",
                        data: {"orderNo": orderNo, "orderId": orderId, "index": 4},
                        success: function (json) {
                            jQuery("#returnPanel").empty().html(json);
                        }
                    });
                    jQuery.ajax({
                        type: "POST",
                        url: baseUrl + "orderInfo/getOrderInfoModal",
                        data: {"orderNo": orderNo, "orderId": orderId, "index": 5},
                        success: function (json) {
                            jQuery("#relevancePanel").empty().html(json);
                        }
                    });
                    jQuery.ajax({
                        type: "POST",
                        url: baseUrl + "orderInfo/getOrderInfoModal",
                        data: {"orderNo": orderNo, "orderId": orderId, "index": 6},
                        success: function (json) {
                            jQuery("#invoiceApplyPanel").empty().html(json);
                        }
                    });
                    jQuery.ajax({
                        type: "POST",
                        url: baseUrl + "orderInfo/getOrderInfoModal",
                        data: {"orderNo": orderNo, "orderId": orderId, "index": 7},
                        success: function (json) {
                            jQuery("#orderEventPanel").empty().html(json);
                        }
                    });
                    //callback
                    if (options != undefined && typeof options.callback === 'function') return options.callback(json)
                }
            });
        },
        // 获取订单信息 (外部订单号)
        showOrderInfoModalByOuOrderNo: function(ouOrderNo, options) {
            $.get(baseUrl + 'online/order/getOrderNoInfo', {'ouOrderNo':ouOrderNo}, function (data) {
                if (data.result == 1 && typeof data.data['orderNo'] != 'undefined' && $.trim(data.data['orderNo'])!='')  {
                    MyUtil.showOrderInfoModal(data.data['orderNo'],'',options);
                } else {
                    console.warn(data);
                    if(options!=undefined && $.type(options.errCallback) === 'function')
                        options.errCallback(data);
                }
                return data;
            });
        },

        /**
         * 客服选择组件
         * author: qupei
         * @param callback 自定义回调函数
         * bindingObj : 例如: {'agentId':'#test'}, 会自动把agentId值赋给#test输入框中,
         * callback: 回调put一个JSON Object :{'groupId':客服组ID,'groupName':'客服组名','agentId':坐席工号}
         */
        showAgentsSelect: function (bindingObj, callback) {
            $.post(baseUrl + "agent/getAgents", function (data) {
                if (!common.verifyResultData(data)) return;
                pageController.removeCommonModal();
                $("body").append("<div class='modal' id='agentsSelectModal' role='dialog' aria-hidden='true'></div>")
                $("#agentsSelectModal").empty().html(data).modal("show")
                    .find('.bind-callback').bind('click', function () {
                    $('#agentsSelectModal').modal('hide');
                    $('' + bindingObj['groupName']).val($(this).data('group-name'));
                    if (!$('' + bindingObj['agentId']).prop('disabled')) $('' + bindingObj['agentId']).val($(this).data('agent-id')); // disable的元素不修改
                    $('' + bindingObj['agentName']).val($(this).data('agent-name'));
                    if (callback && typeof callback === 'function') callback({
                        'groupId': $(this).data('group-id'),
                        'groupName': $(this).data('group-name'),
                        'agentId': $(this).data('agent-id'),
                        'agentName': $(this).data('agent-name')
                    });
                });
            }).error(function () {
                MyUtil.alertInfo("加载坐席选择框失败")
            })
        },
        /**
         * 客服多选组件
         * author: qupei
         * @param callback 自定义回调函数
         * bindingObj : 例如: {'agentId':'#test'}, 会自动把agentId值赋给#test输入框中,
         * callback: 回调put一个JSON Object :{'groupId':客服组ID,'groupName':'客服组名','agentId':坐席工号}
         */
        showAgentsMultiSelect: function (bindingObj, callback) {
            $.post(baseUrl + "agent/getAgents", function (data) {
                if (!common.verifyResultData(data)) return;
                pageController.removeCommonModal();
                $("body").append("<div class='modal' id='agentsSelectModal' role='dialog' aria-hidden='true'></div>")
                $("#agentsSelectModal").empty().html(data).modal("show")
                    .find('.bind-callback').bind('click', function () {
                    $('#agentsSelectModal').modal('hide');
                    $('' + bindingObj['groupName']).val($('' + bindingObj['groupName']).val()+$(this).data('group-name')+";");
                    if (!$('' + bindingObj['agentId']).prop('disabled')) $('' + bindingObj['agentId']).val($('' + bindingObj['agentId']).val()+$(this).data('agent-id')+";"); // disable的元素不修改
                    $('' + bindingObj['agentName']).val($('' + bindingObj['agentName']).val()+$(this).data('agent-name')+";");
                    if (callback && typeof callback === 'function') callback({
                        'groupId': $(this).data('group-id'),
                        'groupName': $(this).data('group-name'),
                        'agentId': $(this).data('agent-id'),
                        'agentName': $(this).data('agent-name')
                    });
                });
            }).error(function () {
                MyUtil.alertInfo("加载坐席选择框失败")
            })
        },
        /**
         * CASE/订单事件/工单 整合创建界面
         * author:qupei
         * @param fillingObj 页面初始化的值:{'ouOrderNo':'11234','phone':'13912345678'}
         * @param callback 暂未使用
         */
        showCaseEventTicket: function (fillingObj, callback) {
            $.post(baseUrl + "case/initCaseEventTicketPanel", function (data) {
                if (!common.verifyResultData(data)) return;
                pageController.removeCommonModal();
                $("body").append("<div class='modal' id='caseEventTicketModal' role='dialog' aria-hidden='true'></div>");
                $("#caseEventTicketModal").empty().html(data).modal("show");
                if (typeof fillingObj != 'undefined') {
                    $('#caseEventTicketModal #CET_ouOrderNo').val(fillingObj['ouOrderNo']);
                    $('#caseEventTicketModal #CET_orderNo').val(fillingObj['orderNo']);
                    $('#caseEventTicketModal #CET_o2oOrderNo').val(fillingObj['o2oOrderNo']);
                    $('#caseEventTicketModal #CET_phone').val(fillingObj['phone']);
                }
            }).error(function () {
                MyUtil.alertInfo("加载CASE/EVENT/TICKET操作框失败")
            })
        },
        /**
         * 前置仓选择组件
         * author: qupei
         * @param callback 自定义回调函数
         * bindingObj : 例如: {'agentId':'#test'}, 会自动把agentId值赋给#test输入框中,
         * callback: 回调put一个JSON Object :{'name':前置仓名称,'sapCode':'前置仓CODE'}
         */
        showFwCodeSelect: function (bindingObj, callback) {
            $.post(baseUrl + "o2o/getO2OShops2", {}, function (data) {
                if (!common.verifyResultData(data)) return;
                if ($("#fwInfoSelectModal").length < 1) {
                    $("body").append("<div class='modal' id='fwInfoSelectModal' role='dialog' aria-hidden='true'></div>")
                }
                $("#fwInfoSelectModal").empty().html(data).modal("show")
                    .find('.bind-callback').bind('click', function () {
                    if (callback && typeof callback === 'function') callback({
                        'name': $(this).attr('data-name'),
                        'sapCode': $(this).attr('data-sapcode')
                    });
                    $('#fwInfoSelectModal').modal('hide');
                });
            }).error(function () {
                MyUtil.alertInfo("加载前置仓选择框失败")
            });
        },
        formDataBind: function (formId) {
            $('#' + formId).find(":input").bind("change.changed", function () {
                $(this).data("changed", true);
            })
        },
        formReset: function (formId) {
            document.getElementById(formId).reset();
            $("#" + formId).find(":input").each(function () {
                $(this).unbind(".changed").removeData("changed");
            });
        },
        getChangedDate: function (formId, _name) {
            var param = "";
            $("#" + formId).find(":input").each(function () {
                if ($(this).data("changed") || _name.indexOf($(this).attr("name")) >= 0) {
                    param += $(this).attr("name") + "=" + $(this).val() + "&";
                }
            });
            console.info(param);
            if (param.length > 0) {
                param = param.substring(0, param.length - 1);
            }
            return encodeURI(param);
        },
        isEmpty: function (o) {
            if (typeof(o) === "object") {
                for (var i in  o) {
                    if (o.hasOwnProperty(i))
                        return false;
                }
                return true;
            } else if (typeof(o) === "undefined") {
                return true;
            } else if (typeof(o) === "number") {
                return false;
            } else {
                if (!o)
                    return true;
            }
            return false;
        }
        ,
        showCallInfo: function (callId) {
            jQuery.ajax({
                type: "POST",
                url: baseUrl + "bill/showCallInfo",
                data: {"callId": callId},
                success: function (html) {
                    if ($("#callInfoModal").length > 0) {
                        //document.MediaPlayer.Stop();
                    } else {
                        jQuery("body").append("<div class='modal' id='callInfoModal' role='dialog' aria-hidden='true'></div>");
                    }
                    jQuery("#callInfoModal").empty().html(html);
                    jQuery("#callInfoModal").modal("show");
                }
            });
        },
        listenRecord: function (callId) {
            jQuery.ajax({
                type: "POST",
                url: baseUrl + "bill/getRecordFilePath",
                data: {"callId": callId},
                success: function (html) {
                    try {
                        var o = $.parseJSON(html)
                        isFormSubmit = true;
                        window.location = o.fileName;
                        isFormSubmit = true;
                    } catch (e) {
                        console.info(e)
                        MyUtil.alertInfo("文件路径获取失败");
                    }
                },
                error: function (e) {
                    console.info(e)
                    MyUtil.alertInfo("系统异常");
                }
            });
        },
        initArea: function (targetObj, parentId, curId) {
            if (MyUtil.isEmpty(parentId))
                return;
            jQuery.getJSON(baseUrl + "/customer/getAreasRelatedList", {
                parentId: parentId
            }, function (json) {
                var options = "<option value=''>--请选择--</option>"
                for (var i in json) {
                    options += "<option value='" + json[i].sid + "'";
                    if (curId == json[i].sid) {
                        options += "   selected='selected'";
                    }
                    options += " >" + json[i].sname + "</option>";
                }
                jQuery(targetObj).html(options);
            });
        },
        showChatIframe: function (type) {
            if (type == "in") {
                jQuery.post(baseUrl + "chat/chatMain", function (data) {
                    $("#chat_parent_div").html(data).show();
                });
            } else {
                var width = 1600;
                var height = 900;
                var topLength = screen.availHeight / 2 - height / 2;
                var leftLength = screen.availWidth / 2 - width / 2;
                var spec = "resizable=0,menubar=no,location=no,toolbar=no,status=yes,left=" + leftLength + ",top=" + topLength + ",width=" + width + ",height=" + height;
                var newWindow = window.open(baseUrl + "chat/chatFrame", "_blank", spec);
            }
        },
        showGroupOrderInfo: function (goId) {
            jQuery.ajax({
                type: "POST",
                url: baseUrl + "trash/getGroupOrderDetail",
                data: {"goId": goId},
                success: function (json) {
                    pageController.removeCommonModal();
                    jQuery("body").append("<div class='modal' id='orderModal' role='dialog' aria-hidden='true'></div>");
                    jQuery("#orderModal").empty().html(json);
                    jQuery("#orderModal").modal("show");
                }
            });
        },
        showRetInfo: function (renNo) {
            jQuery.ajax({
                type: "POST",
                url: baseUrl + "b2cAfterSale/queryReturnNoteInfo1",
                data: "renNo=" + renNo,
                success: function (json) {
                    pageController.removeCommonModal();
                    jQuery("body").append("<div class='modal' id='orderModal' role='dialog' aria-hidden='true'></div>");
                    jQuery("#orderModal").empty().html(json);
                    jQuery("#orderModal").modal("show");
                }
            });

        },
        //gg和ff中可用
        windowsNotify: function (data) {
            if ('Notification' in window) {
                Notification.requestPermission(function (permission) {
                    if (!('permission' in Notification))
                        Notification.permission = permission;
                    if (permission === "granted") {
                        var notification = new Notification(data.title,
                            {
                                tag: data.tag,
                                body: data.body,
                                icon: data.icon,
                                data: data.data,
                                renotify: data.renotify || true
                            });
                        //兼容google
                        notification.ondisplay = function () {
                            if (data.music) {
                                console.info("play some music!")
                            }
                        }
                        notification.onshow = function () {
                            if (data.music) {
                                console.info("play some music!")
                            }
                        }
                        notification.onclick = function () {
                            window.focus();
                            this.close();
                        };
                    }
                });
            }
        },
        showEventDetailInfo:function (eventId) {
            $.ajax({
                url:baseUrl+'/online/getEventDetail',
                type:'POST',
                data:{eventId:eventId},
                success:function(msg){
                    MyUtil.showCommonModal("事件详情",msg,900);
                },
                error:function(e){
                    console.info(e)
                }
            });
        },
        showChatHis:function (uid,callback) {
            if (/^\d+$/.test(uid)){
                var cvId = parseInt(uid);
                $("#call_"+uid).button("loading");
                $.ajax({
                    url:baseUrl+"/chat/queryChatHistoryByCvId",
                    type:'POST',
                    data:{cvId:cvId},
                    success:function(msg){
                        $("#call_"+uid).button("reset");
                        if (callback && typeof callback === "function"){
                            callback(msg);
                        }else{
                            MyUtil.showCommonModal("聊天记录",msg)
                        }
                    },
                    error:function(e){
                        $("#call_"+uid).button("reset");
                        alert("系统异常")
                    }
                });
            }else{
                $("#call_"+uid).button("loading");
                $.ajax({
                    url:baseUrl+"/onlineChat/getTalkHisById",
                    type:'POST',
                    data:{uid:uid},
                    success:function(msg){
                        $("#call_"+uid).button("reset");
                        if (callback && typeof callback === "function"){
                            callback(msg);
                        }else {
                            MyUtil.showCommonModal("聊天记录", msg)
                        }
                    },
                    error:function(e){
                        $("#call_"+uid).button("reset");
                        alert("系统异常")
                    }
                });
            }
        },
        chatHisBox: function (page) {
            $("#event_info_box").html(page);
            if (parseInt($("#event_info_box").find("table").height()) > 350) {
                $("#chat_his_div", "#event_info_box").css("height", 350);
            } else {
                $("#chat_his_div", "#event_info_box").css("height", "auto");
            }
        },
        getSmsSend: function (id) {
            $("#call_" + id).button("loading");
            $.ajax({
                url: baseUrl + "/online/getSmsSend",
                type: 'POST',
                data: {id: id},
                success: function (page) {
                    $("#call_" + id).button("reset");
                    $("#event_info_box").html(page);
                },
                error: function (e) {
                    $("#call_" + id).button("reset");
                    alert("系统异常")
                }
            });
        },
        myEscape:function (target) {
            if (MyUtil.isEmpty(target)) {
                return '';
            }
            return target.replace(/([\'\"])/g,function (matchStr, $1) {
                if ($1 == "'"){
                    return "%92%";
                }
                if ($1 == "\""){
                    return "%9292%";
                }
            });
        },
        myUnescape:function (target) {
            if (MyUtil.isEmpty(target)) {
                return '';
            }
            target = target.replace(/(%9292%)/g,"\"");
            target = target.replace(/(%92%)/g,"'");
            return target;
        }
    }
}