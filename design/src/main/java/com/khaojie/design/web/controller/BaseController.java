package com.khaojie.design.web.controller;

import com.khaojie.service.IColorService;
import com.khaojie.service.IComponentService;
import com.khaojie.service.IPartService;
import com.khaojie.service.IProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.lang.invoke.MethodHandles;


public class BaseController {
    private static Logger log = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());
    @Autowired
    protected IColorService colorService;
    @Autowired
    protected IComponentService componentService;
    @Autowired
    protected IPartService partService;
    @Autowired
    protected IProductService productService;
}
