package com.khaojie.design.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * Created by khaojie on 2017/6/25.
 */
@Component
@ConfigurationProperties(prefix="urlProp")
public final class UrlProp {
    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    private String baseUrl;
}
