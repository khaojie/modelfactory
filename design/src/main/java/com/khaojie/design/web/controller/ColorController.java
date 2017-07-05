package com.khaojie.design.web.controller;

import com.khaojie.pojo.Color;
import com.khaojie.service.IColorService;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.JavaType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by khaojie on 2017/6/30.
 */
@Controller
@RequestMapping("/color")
public class ColorController {
    private Logger log = LoggerFactory.getLogger(ColorController.class);
    @Autowired
    private IColorService colorService;

    @RequestMapping(value="/main")
    public String invoiceApplyInit(HttpServletRequest req, Map<String,Object> model) throws Exception{
        return "color/main";
    }

    @ResponseBody
    @RequestMapping(value = "/saveColors",method= RequestMethod.POST, produces = "application/json; charset=utf-8")
    public Map saveColors(HttpServletRequest req,String data){
        Map<String,Object> resultMap = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();
        JavaType javaType = mapper.getTypeFactory().constructCollectionType(ArrayList.class,Color.class);
        List<Color> colors = null;
        try{
            colors = mapper.readValue(data,javaType);
        }catch(Exception e){
            log.error("ColorController.saveColors error",e);
            resultMap.put("result",0);
            resultMap.put("errorMsg",e.getMessage());
        }

        try{
            colorService.saveColors(colors);
        }catch(Exception e){
            log.error("ColorController.saveColors error",e);
            resultMap.put("result",0);
            resultMap.put("errorMsg",e.getMessage());
        }
        resultMap.put("result",1);
        return resultMap;
    }
}
