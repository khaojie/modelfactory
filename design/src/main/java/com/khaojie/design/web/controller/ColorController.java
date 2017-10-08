package com.khaojie.design.web.controller;

import com.khaojie.pojo.Color;
import com.khaojie.service.IColorService;
import com.khaojie.utils.KhjUtils;
import com.khaojie.vo.color.ColorQueryItem;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.JavaType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by khaojie on 2017/6/30.
 */
@Controller
@RequestMapping("/color")
public class ColorController extends BaseController {
    private Logger log = LoggerFactory.getLogger(ColorController.class);


    @RequestMapping(value="/main")
    public String invoiceApplyInit(HttpServletRequest req, Map<String,Object> model) throws Exception{
        return "color/main";
    }

    @RequestMapping(value="/queryColors")
    public String queryColors(ColorQueryItem queryItem, HttpServletRequest req, Map<String,Object> model) throws Exception{
        model.put("data",colorService.queryColors(queryItem));
        KhjUtils.packQueryParameter(queryItem,model);
        return "color/searchTable";
    }

    @RequestMapping(value = "/loadMaintainInfo/{colorId}")
    public String loadMaintainInfo(HttpServletRequest req, @PathVariable Long colorId, Map<String,Object> model) {
        Color color = new Color();
        color.setId(colorId);
        if(colorId!=0L&&colorId!=null){
            color =  colorService.getColorDao().getById(colorId);
        }
        model.put("color",color);
        return "color/maintainPanel";
    }

    @ResponseBody
    @RequestMapping(value = "/saveColors",method= RequestMethod.POST, produces = "application/json; charset=utf-8")
    public Map saveColors(String data,HttpServletRequest req){
        Map<String,Object> resultMap = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();
        JavaType javaType = mapper.getTypeFactory().constructCollectionType(ArrayList.class,Color.class);
        List<Color> colors = null;
        try{
            colors = mapper.readValue(data.toString(),javaType);
        }catch(Exception e){
            log.error("ColorController.saveColors error",e);
            resultMap.put("result",0);
            resultMap.put("errorMsg",e.getMessage());
        }

        try{
            colorService.saveColors(colors);
            resultMap.put("result",1);
        }catch(Exception e){
            log.error("ColorController.saveColors error",e);
            resultMap.put("result",0);
            resultMap.put("errorMsg",e.getMessage());
        }

        return resultMap;
    }
}
