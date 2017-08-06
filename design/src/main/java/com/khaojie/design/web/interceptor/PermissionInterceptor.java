package com.khaojie.design.web.interceptor;

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
        return true;
    }
}
