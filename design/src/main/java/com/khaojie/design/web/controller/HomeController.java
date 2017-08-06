package com.khaojie.design.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * Created by admin on 5/17/17.
 */
@Controller
public class HomeController extends BaseController {
    @GetMapping("/")
    public String welcome(Map<String, Object> model) {
        return "main";
    }
}
