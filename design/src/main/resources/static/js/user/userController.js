/**
 * Created by khaojie on 2015/7/16.
 */
if(typeof (userController) == 'undefined'){
    userController = {
        loginParameter :{},
        loginCheck : function(){
            $.ajax({
                type : "POST",
                url : baseUrl+"user/loginCheck",
                async : false,
                success : function(data) {
                    $("#divMain").loadingHide()
                    if(data.result == 0){
                        if(confirm(data.data+"系统将自动帮您跳转到登录页面？")){
                            userController.logOut();
                        }
                    }else{
                        var json = JSON.parse(data.data);
                        $("#userNameLogged").html(json.userName);
                        $("#empCodeLogged").html(json.empCode);
                        $("#jobType").html(json.jobType);
                        $("#empNameLogged").html(json.empName);
                        /**
                         * 用户登录成功,连接WebSocket
                         */
                        if(envConstant && envConstant.connectWebSocket){
                            webSocketController.connect();
                        }
                    }

                },
                error : function(obj) {
                    $("#divMain").loadingHide()
                    alert('登录失败,无法访问处理接口!');
                }
            });
        },
        //处理登录流程
        processLogin : function(){
            var userName = $("#loginUserName").val();
            var userPwd = $("#loginUserPwd").val();
            var verifyCode = $("#verifyCode").val();
            var isLoginPhone = $("#isLoginPhoneBox").is(":checked")?1:0;
            if(!isNotEmpty(userName)||!isNotEmpty(userPwd)||!isNotEmpty(verifyCode)){
                alert("请提供[用户名]和[密码]和[验证码]!");
                return;
            }
            $("#loginWindow").modal('hide');
            setTimeout(function(){
                $("#waitInfo").html("正在登录，请稍候...");
                $("#loading1000").modal('show');
                $.ajax({
                    type : "POST",
                    url : baseUrl+"user/login",
                    async : false,
                    data : {"userName":userName,"userPwd":userPwd,"verifyCode":verifyCode,"isLoginPhone":isLoginPhone} ,
                    success : function(data) {
                        $("#loading1000").modal('hide');
                        if(!common.verifyResultData(data)){
                            $("#verifimg").click();
                            $("#loginWindow").modal('show');
                            return;
                        }
                        var json = JSON.parse(data.data);
                        $("#userNameLogged").html(json.userName);
                        $("#empCodeLogged").html(json.empCode);
                        $("#isLoginPhone").html(json.isLoginPhone);
                        $("#jobType").html(json.jobType);
                        $("#userToken").html(json.userToken);
                        $("#empNameLogged").html(json.empName);
                        setTimeout(function(){
                            userController.loginCheck();
                        },2000);
                    },
                    error : function(obj) {
                        alert('登录失败,无法访问处理接口!');
                    }
                });
            },3000);
        },
        resetLogin : function(){//登录重置
            alert('您的登录状态，可能已失效，需要重新登录!');
            $("#userNameLogged").html("NaN");
            this.loginCheck();
        },

      /**
      * 单点注销
      */
      logOut: function () {
          window.location.href=baseUrl+"/sso/tologinout";
      },
      globalAjaxSetUp:function () {
        //处理ajax操作时session过期问题
        $(document).ajaxComplete(function (event, xhr, options) {
            var sessionstatus = xhr.getResponseHeader("sessionstatus"); //通过data取得响应头，sessionstatus，
            if (sessionstatus == "timeout" && $("#re_login_modal").is(":hidden")) {//当session失效且重新登录界面是隐藏的
                if (options.url != baseUrl+'user/reLogin') {//当请求的不是重新登录界面(防止死循环)
                    $("#re_login_modal_content").find("iframe").attr("src", baseUrl+"/user/reLogin");
                    $("#re_login_modal").modal("show");
                }
            }
        });
      }
    }
}