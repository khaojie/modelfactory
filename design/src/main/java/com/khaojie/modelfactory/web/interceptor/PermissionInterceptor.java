package com.khaojie.modelfactory.web.interceptor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by khaojie on 2017/6/25.
 */
public class PermissionInterceptor extends HandlerInterceptorAdapter {
    static Logger log = LoggerFactory.getLogger(PermissionInterceptor.class);

    @Value("${extraProp.loginTimeStr}")
    private String loginTimeStr;

    /**
     * controller 方法调用执行前
     */
    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response, Object handler) throws Exception {
        request.getSession().setAttribute("loginTimeStr", loginTimeStr);
//        if (request.getHeader("x-requested-with") != null && request.getHeader("x-requested-with").equalsIgnoreCase("XMLHttpRequest")) { //如果是ajax请求响应头会有x-requested-with
//            LoginInfo e = (LoginInfo) request.getSession().getAttribute("current_ssologin_user");
//            if (e == null) {//session已经失效
//                response.setHeader("sessionstatus", "timeout"); //设置失效标志
//                if (!request.getRequestURI().equals("/callcenter/user/reLogin")) {   //如果在登录失效的情况下不是访问重新登录界面则驳回
//                    return false;
//                }
//            } else {//session未失效
//                if ("timeout".equals(response.getHeader("sessionstatus"))) {
//                    response.setHeader("sessionstatus", "");
//                }
//            }
//        }
        return true;
    }
}
