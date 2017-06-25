/**
 * Created by xyc on 2017/4/25 0025.
 */
if (typeof (orderInfoUtil) == 'undefined') {
    orderInfoUtil = {
        list: [],   //保存订单ID以及订单模态框
        curIdx: 0,  //当前模态框索引
        model: null,
        orderInfoGraph: [],
        orderInfoList: [],   //保存订单ID和订单号对应关系
        init: function () { //初始化
            orderInfoUtil.list = [];
            orderInfoUtil.curIdx = 0;
            orderInfoUtil.model = null;
            orderInfoUtil.orderInfoGraph = [];
            orderInfoUtil.orderInfoList = [];
        },
        save: function () { //保存当前模态框
            if (orderInfoUtil.list.length == 0) {
                return;
            }
            orderInfoUtil.list[orderInfoUtil.curIdx].page = $("#orderModal").html();
        },
        preHandle: function (orderInfo, initFlag) { //保存预处理
            if (!orderInfo || (!orderInfo.orderId && !orderInfo.orderNo)) {
                console.log("orderId或orderNo为空");
                return false;
            }
            if (!initFlag) {
                orderInfoUtil.init();
                orderInfoUtil.orderInfoGraph.push(orderInfo);
                orderInfoUtil.model = "ADD";    //新增模式
                console.log("初始化");
                return true;
            }

            var orderId = orderInfo.orderId || orderInfoUtil.getOrderId(orderInfo.orderNo);
            if (!orderId) {
                console.log("找不到orderId");
                return false;
            }
            if (orderInfoUtil.orderInfoGraph.length > 0 && orderInfoUtil.orderInfoGraph[orderInfoUtil.curIdx].orderId == orderId) {
                orderInfoUtil.model = "UNCHANGED";    //不变模式
                console.log("你点击的是当前窗口");
                return false;
            }
            orderInfoUtil.save();
            for (var i = 0; i < orderInfoUtil.orderInfoGraph.length; i++) {
                if (orderInfoUtil.orderInfoGraph[i].orderId == orderId) {
                    orderInfoUtil.model = "SKIP";    //跳转模式
                    console.log("跳转到:" + i);
                    orderInfoUtil.goTo(i);
                    return false;
                }
            }

            if (orderInfoUtil.curIdx < orderInfoUtil.orderInfoGraph.length - 1) {
                orderInfoUtil.list.splice(orderInfoUtil.curIdx + 1, orderInfoUtil.list.length - orderInfoUtil.curIdx - 1);
                orderInfoUtil.orderInfoGraph.splice(orderInfoUtil.curIdx + 1, orderInfoUtil.orderInfoGraph.length - orderInfoUtil.curIdx - 1);
            }

            orderInfoUtil.orderInfoGraph.push(orderInfo);
            orderInfoUtil.model = "ADD";    //新增模式
            console.log("可以添加");
            return true;
        },
        postHandle: function () {   //保存后处理,添加订单ID
            if (orderInfoUtil.model != "ADD") {
                console.log("只有新增模式才需要进行后处理");
                return;
            }
            orderInfoUtil.curIdx = orderInfoUtil.orderInfoGraph.length - 1;
            var orderId = orderInfoUtil.orderInfoGraph[orderInfoUtil.curIdx].orderId || orderInfoUtil.getOrderId(orderInfoUtil.orderInfoGraph[orderInfoUtil.curIdx].orderNo);
            orderInfoUtil.list.push({
                orderId: orderId,
                page: null
            });
            orderInfoUtil.orderInfoGraph[orderInfoUtil.curIdx] = {
                orderId: orderInfoUtil.orderInfoGraph[orderInfoUtil.curIdx].orderId || orderInfoUtil.getOrderId(orderInfoUtil.orderInfoGraph[orderInfoUtil.curIdx].orderNo),
                orderNo: orderInfoUtil.orderInfoGraph[orderInfoUtil.curIdx].orderNo || orderInfoUtil.getOrderNo(orderInfoUtil.orderInfoGraph[orderInfoUtil.curIdx].orderId)
            };
            orderInfoUtil.print();
        },
        goTo: function (i) {    //根据索引跳转
            if (i < 0 || i >= orderInfoUtil.orderInfoGraph.length) {
                return;
            }
            orderInfoUtil.curIdx = i;
            $("#orderModal").html(orderInfoUtil.list[orderInfoUtil.curIdx].page);
        },
        prev: function () { //上一个模态框
            orderInfoUtil.model = "PREV";   //后退模式
            if (orderInfoUtil.orderInfoGraph.length == 0 || orderInfoUtil.curIdx == 0) {
                console.log("无法后退");
                return;
            }
            orderInfoUtil.save();
            orderInfoUtil.curIdx--;
            $("#orderModal").html(orderInfoUtil.list[orderInfoUtil.curIdx].page);
        },
        next: function () { //下一个模态框
            orderInfoUtil.model = "NEXT";   //前进模式
            if (orderInfoUtil.orderInfoGraph.length == 0 || orderInfoUtil.curIdx == orderInfoUtil.orderInfoGraph.length - 1) {
                console.log("无法前进");
                return;
            }
            orderInfoUtil.save();
            orderInfoUtil.curIdx++;
            $("#orderModal").html(orderInfoUtil.list[orderInfoUtil.curIdx].page);
        },
        showArrow: function () {
            if (orderInfoUtil.orderInfoGraph.length <= 1) {
                $(".prev-able", "#orderModal").hide();
                $(".next-able", "#orderModal").hide();
                return;
            }
            if (orderInfoUtil.curIdx == 0) {
                $(".prev-able", "#orderModal").hide();
                $(".next-able", "#orderModal").show();
                return;
            }
            if (orderInfoUtil.curIdx == orderInfoUtil.orderInfoGraph.length - 1) {
                $(".prev-able", "#orderModal").show();
                $(".next-able", "#orderModal").hide();
                return;
            }
            $(".prev-able", "#orderModal").show();
            $(".next-able", "#orderModal").show();
        },
        showOrderInfoGraph: function (containerId) {
            if (!containerId) {
                return;
            }
            var html = "";
            if (orderInfoUtil.orderInfoGraph.length == 0) {
                $("#" + containerId).html("");
                return;
            }
            for (var i in orderInfoUtil.orderInfoGraph) {
                if (orderInfoUtil.curIdx == i) {
                    html = html + "<span class='label-arrow-right'><span class='label label-success' onclick='MyUtil.showOrderInfo(\"" + orderInfoUtil.orderInfoGraph[i].orderId + "\",true);'>" + orderInfoUtil.orderInfoGraph[i].orderNo + "</span></span>";
                } else {
                    html = html + "<span class='label-arrow-right'><span class='label label-default' onclick='MyUtil.showOrderInfo(\"" + orderInfoUtil.orderInfoGraph[i].orderId + "\",true);'>" + orderInfoUtil.orderInfoGraph[i].orderNo + "</span></span>";
                }
            }
            $("#" + containerId).html(html);
        },
        getOrderNo: function (orderId) {
            if (!orderId) {
                console.log("orderId为空");
                return;
            }
            if (orderInfoUtil.orderInfoList.length == 0) {
                console.log("订单信息为空");
                return;
            }
            for (var i in orderInfoUtil.orderInfoList) {
                if (orderInfoUtil.orderInfoList[i].orderId == orderId) {
                    return orderInfoUtil.orderInfoList[i].orderNo;
                }
            }
        },
        getOrderId: function (orderNo) {
            if (!orderNo) {
                console.log("orderNo为空");
                return;
            }
            if (orderInfoUtil.orderInfoList.length == 0) {
                console.log("订单信息为空");
                return;
            }
            for (var i in orderInfoUtil.orderInfoList) {
                if (orderInfoUtil.orderInfoList[i].orderNo == orderNo) {
                    return orderInfoUtil.orderInfoList[i].orderId;
                }
            }
        },
        print: function () {    //打印信息
            console.log("开始--------------------------------------------------------------");
            console.log(orderInfoUtil.list);
            console.log(orderInfoUtil.curIdx);
            console.log(orderInfoUtil.model);
            console.log(orderInfoUtil.orderInfoGraph);
            console.log(orderInfoUtil.orderInfoList);
            console.log("结束--------------------------------------------------------------");
        }
    }
}