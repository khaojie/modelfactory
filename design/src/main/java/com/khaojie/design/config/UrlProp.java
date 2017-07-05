package com.khaojie.design.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * Created by khaojie on 2017/6/25.
 */
@Component
public final class UrlProp {
    public String getBaseUrl() {
        return baseUrl;
    }
    @Value("${urlProp.baseUrl}")
    private  String baseUrl;
}
