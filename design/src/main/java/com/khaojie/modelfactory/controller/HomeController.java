package com.test.sessionshare.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by admin on 5/17/17.
 */
@Controller
public class HomeController {
    @RequestMapping("/")
    @ResponseBody
    String home(HttpServletRequest req){
        return "<h1>Hello World111!</h1><br/>"+req.getSession().getId();
    }

    @RequestMapping("/sayHello")
    String sayHello(HttpServletRequest req){
        return "sayHello";
    }

//@RequestMapping("/greeting")
////    public String greeting(@RequestParam(value="name", required=false, defaultValue="World") String name, Model model) {
////        model.addAttribute("name", name);
////        return "greeting";
////    }
//public String greeting(HttpServletRequest req) {
////        model.addAttribute("name", name);
//    return "greeting";
//}
}
