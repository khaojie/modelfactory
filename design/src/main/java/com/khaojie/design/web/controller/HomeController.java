package com.khaojie.design.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.Map;

/**
 * Created by admin on 5/17/17.
 */
@Controller
public class HomeController {
//    @RequestMapping("/")
//    @ResponseBody
//    String home(HttpServletRequest req){
//        return "<h1>Hello World111!</h1><br/>"+req.getSession().getId();
//    }
    @RequestMapping("/sayHello")
    String sayHello(HttpServletRequest req){
        return "sayHello";
    }


    @GetMapping("/")
    public String welcome(Map<String, Object> model) {
        model.put("time", new Date());
        model.put("message", "324234");
        return "main";
    }



    public static void main(String[] args) {
  int big = Integer.MAX_VALUE;
        System.out.println(big+1);
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
