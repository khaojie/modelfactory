package com.khaojie.design.web.controller;


import com.khaojie.pojo.Part;
import com.khaojie.service.IPartService;
import com.khaojie.utils.KhjUtils;
import com.khaojie.vo.part.PartQueryItem;
import com.khaojie.vo.part.PartSingleSaveVo;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/part")
public class PartController extends BaseController {

    private Logger log = LoggerFactory.getLogger(PartController.class);

    @RequestMapping(value="/queryParts")
    public String queryParts(PartQueryItem queryItem, HttpServletRequest req, Map<String,Object> model) throws Exception{
        model.put("data",partService.getPartVos(queryItem));
        return "flow_cfg/part/searchTable";
    }

    @ResponseBody
    @RequestMapping(value = "/save", produces = "application/json; charset=utf-8")
    public Map save(HttpServletRequest req ){
        Map resultMap = new HashMap();
        String rangeStr = req.getParameter("rangeStr");
        if(KhjUtils.isNotEmpty(rangeStr)){//只有快速保存才会有
            Long prodId = Long.valueOf(req.getParameter("prodId"));
            String regEx = "[A-Z]{1}\\d{1,2}";//A1
            Boolean result = KhjUtils.matchRegx(regEx,rangeStr);
            if(result){
                String boardNo = KhjUtils.getZiMu(rangeStr);
                Integer min = Integer.valueOf(KhjUtils.getNumber(rangeStr));
                try{
                    partService.savePartRange(prodId,boardNo,min,null);
                    resultMap.put("result",1);
                }catch(Exception e){
                    resultMap.put("result",0);
                    resultMap.put("errorMsg","save error!"+e.getMessage());
                }
                return resultMap;
            }
            regEx = "([A-Z]{1}\\d{1,2},{0,1}){1,}";//A1,A12,B13...
            result = KhjUtils.matchRegx(regEx,rangeStr);
            if(result){
                String []strs = rangeStr.split(",");
                Map<String,Integer> map = new HashMap<>();
                for(String str:strs){
                    if(map.get(str)!=null){
                        resultMap.put("result",0);
                        resultMap.put("errorMsg","the part info you input has repeat infos");
                        return  resultMap;
                    }
                    map.put(str,1);
                }
                try{
                    partService.savePartForArray(strs,prodId);
                    resultMap.put("result",1);
                }catch(Exception e){
                    resultMap.put("result",0);
                    resultMap.put("errorMsg","save error!"+e.getMessage());
                }
                return  resultMap;
            }
            regEx = "[A-Z]{1}\\d{1,2}-{1}[A-Z]{1}\\d{1,2}";//A1-A12
            result = KhjUtils.matchRegx(regEx,rangeStr);
            if(result){
                String[] strs = rangeStr.split("-");
                String boardNo1 = KhjUtils.getZiMu(strs[0]);
                String boardNo2 = KhjUtils.getZiMu(strs[1]);
                if(!boardNo1.equals(boardNo2)){
                    resultMap.put("result",0);
                    resultMap.put("errorMsg","broard no cannot allow more than 1 area");
                }
                Integer min = Integer.valueOf(KhjUtils.getNumber(strs[0]));
                Integer max = Integer.valueOf(KhjUtils.getNumber(strs[1]));
                try{
                    partService.savePartRange(prodId,boardNo1,min,max);
                    resultMap.put("result",1);
                }catch(Exception e){
                    resultMap.put("result",0);
                    resultMap.put("errorMsg","save error!"+e.getMessage());
                }
                return  resultMap;
            }

            resultMap.put("result",0);
            resultMap.put("errorMsg","part info input error!");
            return resultMap;
        }
        String data = req.getParameter("data");
        ObjectMapper mapper = new ObjectMapper();
        PartSingleSaveVo vo = null;
        try{
            vo = mapper.readValue(data,PartSingleSaveVo.class);
        }catch(Exception e){
            resultMap.put("result",0);
            resultMap.put("errorMsg","part info convertion error!");
            return resultMap;
        }
        try{
            partService.updateAddSinglePart(vo);
        }catch(Exception e){
            resultMap.put("result",0);
            resultMap.put("errorMsg","part info save error!");
            return resultMap;
        }
        resultMap.put("result",1);
        return resultMap;
    }

    @RequestMapping(value = "/loadMaintainInfo")
    public String loadMaintainInfo(HttpServletRequest req, Map<String,Object> model) {
        Long partId = req.getParameter("partId")==null?0L:Long.valueOf(req.getParameter("partId"));
        Long prodId = req.getParameter("prodId")==null?0L:Long.valueOf(req.getParameter("prodId"));
        Part part = new Part();
        part.setId(partId);
        part.setProdId(prodId);
        PartSingleSaveVo vo = new PartSingleSaveVo();
        if(partId!=0L&&partId!=null){
            part =  partService.getPartDao().getById(partId);
            List<Long> partIds = new ArrayList<>();
            partIds.add(partId);
            vo.setColors(partService.getPartColors(partIds).get(partId));
        }else if(prodId==0L){
            model.put("error","new part creation cannot have empty prod Id");
            return "error";
        }
        vo.setPart(part);
        model.put("vo",vo);
        return "flow_cfg/part/maintainPanel";
    }
}
