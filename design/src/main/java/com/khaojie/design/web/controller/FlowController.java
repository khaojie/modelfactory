package com.khaojie.design.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * Created by khaojie on 2017/7/22.
 */
@Controller
@RequestMapping("/flow")
public class FlowController extends BaseController {

    @RequestMapping(value="/main")
    public String main(HttpServletRequest req, Map<String,Object> model) throws Exception{
//        model.put("data",productService.getProductsPageInfo());
        return "flow_cfg/main";
    }
}
