package com.khaojie.design.web.controller;

import com.khaojie.pojo.Component;
import com.khaojie.service.IComponentService;
import com.khaojie.vo.comp.CompQueryItem;
import com.khaojie.vo.comp.CompSaveVo;
import com.khaojie.vo.part.PartVo;
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
@RequestMapping("/comp")
public class ComponentController extends BaseController{
    private Logger log = LoggerFactory.getLogger(ComponentController.class);



    @RequestMapping(value="/queryComps")
    public String queryComps(CompQueryItem queryItem, HttpServletRequest req, Map<String,Object> model) throws Exception{
        model.put("data",componentService.getCompVos(queryItem));
        return "flow_cfg/comp/searchTable";
    }

    @RequestMapping(value = "/loadMaintainInfo")
    public String loadMaintainInfo(HttpServletRequest req, Map<String,Object> model) {
        Long compId = req.getParameter("compId")==null?0L:Long.valueOf(req.getParameter("compId"));
        Long prodId = req.getParameter("prodId")==null?0L:Long.valueOf(req.getParameter("prodId"));
        Component comp = new Component();
        comp.setId(compId);
        comp.setProdId(prodId);
        CompSaveVo vo = new CompSaveVo();
        if(compId!=0L&&compId!=null){
            comp =  componentService.getComponentDao().getById(compId);
            List<Long> compIds = new ArrayList<Long>(){{add(compId);}};
            List<PartVo> partVos = componentService.buildCompPartVo(compIds,prodId).get(compId);

            partVos.stream().forEach(partVo -> {
                vo.setParts(vo.getParts()+","+partVo.getNo());
            });
            vo.setParts(vo.getParts().replaceFirst(",",""));
        }else if(prodId==0L){
            model.put("error","new component creation cannot have empty prod Id");
            return "error";
        }
        vo.setComp(comp);
        model.put("vo",vo);
        return "flow_cfg/comp/maintainPanel";
    }

    @ResponseBody
    @RequestMapping(value = "/save", produces = "application/json; charset=utf-8")
    public Map save(HttpServletRequest req ){
        Map resultMap = new HashMap();
        String data = req.getParameter("data");
        ObjectMapper mapper = new ObjectMapper();
        CompSaveVo vo = null;
        try{
            vo = mapper.readValue(data,CompSaveVo.class);
        }catch(Exception e){
            resultMap.put("result",0);
            resultMap.put("errorMsg","component info convert error!");
            return resultMap;
        }
        try{
            componentService.updateAddSingleComp(vo);
        }catch(Exception e){
            resultMap.put("result",0);
            resultMap.put("errorMsg","component info save error!");
            return resultMap;
        }
        resultMap.put("result",1);
        return resultMap;
    }
}
