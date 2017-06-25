/**
 * Created by xyc on 2016/1/11 0011.
 * WebSocket推送以及接收
 */
if (typeof (webSocketController) == 'undefined') {
    var webSocket = null;
    /**
     * 是否重新连接
     * @type {boolean}
     */
    var reconnect = false;
    webSocketController = {
        /**
         * 设置是否重新连接
         * @param flag
         */
        reconnect: function (flag) {
            reconnect = flag;
        },
        connect: function () {
            /**
             * 进行连接
             */
            console.log(wsUrl + "?" + $("#empCodeLogged").text().trim());
            webSocket = new WebSocket(wsUrl + "?" + $("#empCodeLogged").text().trim());
            /**
             * 连接成功后调用
             */
            webSocket.onopen = function () {
                console.log('WebSocket连接成功...');
            };
            /**
             * 连接关闭时调用
             * @param event
             */
            webSocket.onclose = function (event) {
                console.log('WebSocket连接关闭...');
                if (reconnect == true) {
                    webSocketController.connect();
                    reconnect = false;
                    return;
                }
            };
            /**
             * 后台推送消息时调用
             * @param event
             */
            webSocket.onmessage = function (event) {
                console.log("WebSocket接收到一条新消息......")
                console.log(event);
                var msg = eval('(' + event.data + ')');
                console.log(msg);
                webSocketController.branchSelection(msg.result, msg.data);
            };
        },
        /**
         * 根据接收到消息的不同类型选择不同的分支进行处理
         * @param result
         * @param data
         */
        branchSelection: function (result, data) {
            console.log(data);
            /**
             * 根据接收到消息的不同类型进行处理
             */
            switch (result) {
                case 1:
                    console.log(data);
                    break;
                case 2:
                    webSocketController.pushPubNotification(2, data);
                    break;
                case 3:
                    webSocketController.pushEventNotification(3, data);
                    break;
                case 4://公告紧急通知
                    webSocketController.pubUrgentNotice(data);
                    break;
                case 5://订单项修改通知
                    webSocketController.pushOrderItemUpdateLogMsg(5,data);
                    break;
            }
        },
        /**
         * 发送消息到后台
         * @param message 消息内容
         */
        sendMessage: function (message) {
            if (webSocket != null) {
                webSocket.send(message);
            } else {
                console.log('WebSocket无连接，无法发送消息到后台...');
            }
        },
        pushOrderItemUpdateLogMsg: function (id,data) {
            console.log(data);
            Messenger.options = {
                extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
                theme: 'future'
            }
            console.log(data);
            var msg = Messenger().post({
                id: id,
                message: data,
                hideAfter: 86400,
                type: 'success',
                showCloseButton: true,
                actions: {
                    retry: {
                        label: '查看',
                        action: function () {
                            /**
                             * 打开订单项修改记录查询标签页
                             */
                            $('.modal.in').modal('hide');//隐藏modal 否则会出现遮罩层无法关闭的情况
                            pageController.loadMenuPage(baseUrl + 'order/orderItemUpdateLogQuery', 'amenu_101_page', 1, '订单项修改记录查询');
                            /*if (!pageController.hasExistTab('amenu_101_page')) {
                                orderItemUpdateLogController.pageOrderItemUpdateLog();
                            }*/
                            return msg.cancel();
                        }
                    },
                    cancel: {
                        label: '取消',
                        action: function () {
                            return msg.cancel();
                        }
                    }
                }
            });
        },
        /**
         * 公告紧急通知
         * @param data
         */
        pubUrgentNotice: function (data) {
            var result = eval('(' + data + ')');
            if (result.sid && result.title) {
                if (!$("#scroll_item_" + result.sid).length) {
                    $("#scroll_marquee").append('<span class="glyphicon glyphicon-star" id="scroll_item_' + result.sid + '">紧急通知：<a href="javascript:void(0);" onclick="webSocketController.viewEventNotification();">' + result.title + '</a></span>');
                }
            }
            if (result.removeId) {
                $("#scroll_item_" + result.removeId, "#scroll_marquee").remove();
            }
        },
        /**
         * 推送公告列表
         * @param data
         * @param id
         */
        pushPubNotification: function (id, data) {
            Messenger.options = {
                extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
                theme: 'future'
            }
            console.log(data);
            var msg = Messenger().post({
                id: id,
                message: "[公告] " + data.substring(1, data.length - 1),
                hideAfter: 86400,
                type: 'success',
                showCloseButton: true,
                actions: {
                    retry: {
                        label: '查看',
                        action: function () {
                            /**
                             * 打开我的公告事项标签页
                             */
                            $('.modal.in').modal('hide');//隐藏modal 否则会出现遮罩层无法关闭的情况
                            pageController.loadMenuPage(baseUrl + 'notification/myPubEvent', 'amenu_A3_page', 1, '我的公告事项');
                            if (pageController.hasExistTab('amenu_A3_page')) {
                                pubNotificationController.queryPubBoardList(2);
                                eventNotificationController.queryEventBoardList(2);
                            }
                            return msg.cancel();
                        }
                    },
                    cancel: {
                        label: '取消',
                        action: function () {
                            return msg.cancel();
                        }
                    }
                }
            });
        },
        /**
         * 推送事项列表
         * @param id
         * @param data
         */
        pushEventNotification: function (id, data) {
            console.log('data=' + data);
            Messenger.options = {
                extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
                theme: 'future'
            }

            var page = "<div style='margin-top: 5px;text-align: right;'><span id='event_messenger_15' style='cursor: pointer;cursor: hand;' title='推迟15分钟' class='badge'>15</span>&nbsp;" +
                "<span id='event_messenger_30' style='cursor: pointer;cursor: hand;' title='推迟30分钟' class='badge'>30</span>&nbsp;" +
                "<span id='event_messenger_60' style='cursor: pointer;cursor: hand;' title='推迟60分钟' class='badge'>60</span>&nbsp;</div>";

            var msg = Messenger().post({
                id: id,
                message: "[事项] <a id='event_messenger_view' href='javascript:void(0);' style='color:#ffffff;' title='查看详情'>" + data.substring(1, data.length - 1) + "</a>" + page,
                hideAfter: 86400,
                type: 'success',
                showCloseButton: true,
                events: {
                    "click a#event_messenger_view": function () {
                        webSocketController.viewEventNotification();
                        return msg.cancel();
                    },
                    "click span#event_messenger_15": function () {
                        webSocketController.delayEventNotification(15);
                        return msg.cancel();
                    },
                    "click span#event_messenger_30": function () {
                        webSocketController.delayEventNotification(30);
                        return msg.cancel();
                    },
                    "click span#event_messenger_60": function () {
                        webSocketController.delayEventNotification(60);
                        return msg.cancel();
                    }
                }
            });
        },
        delayEventNotification: function (minute) {
            if (minute == null || minute == '' || minute <= 0) {
                return false;
            }
            var reqObj = {};
            reqObj.minute = minute;
            $.ajax({
                type: 'POST',
                async: false,
                url: baseUrl + 'notification/delayEventNotification',
                data: reqObj,
                success: function (msg) {
                    if (msg.result == 1) {
                        Messenger().post({
                            type: "success",
                            hideAfter: 3,
                            message: "事项推迟成功"
                        });
                    } else {
                        Messenger().post({
                            type: "error",
                            hideAfter: 3,
                            message: "事项推迟失败"
                        });
                    }
                },
                error: function () {
                    Messenger().post({
                        type: "error",
                        hideAfter: 3,
                        message: "事项推迟失败"
                    });
                }
            });
        },
        viewEventNotification: function () {
            $('.modal.in').modal('hide');//隐藏modal 否则会出现遮罩层无法关闭的情况
            /*
             * 打开我的公告事项标签页
             */
            pageController.loadMenuPage(baseUrl + 'notification/myPubEvent', 'amenu_A3_page', 1, '我的公告事项');
            if (pageController.hasExistTab('amenu_A3_page')) {
                pubNotificationController.loadPubBoardList(2, 0);
                setTimeout(pubNotificationController.loadPubBoardList(2, 1), 200);
                setTimeout(pubNotificationController.loadPubBoardList(2, 2), 200);
                setTimeout(pubNotificationController.loadPubBoardList(2, 3), 200);
                setTimeout(pubNotificationController.loadPubBoardList(2, 4), 200);
                setTimeout(pubNotificationController.loadPubBoardList(2, 5), 200);
            }
        }
    }
}
