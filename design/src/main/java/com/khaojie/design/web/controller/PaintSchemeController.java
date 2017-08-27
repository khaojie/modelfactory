package com.khaojie.design.web.controller;

import com.khaojie.design.web.excel.PaintSchemeExcelView;
import com.khaojie.pojo.Product;
import com.khaojie.vo.ProdColorStatistics;
import com.khaojie.vo.paintscheme.download.ColorVo;
import com.khaojie.vo.paintscheme.download.PartVo;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/paintscheme")
public class PaintSchemeController extends BaseController {
    private Logger logger = LoggerFactory.getLogger(PaintSchemeController.class);

    @RequestMapping(value="/main")
    public String main(HttpServletRequest req, Map<String,Object> model) throws Exception{
//        model.put("data",productService.getProductsPageInfo());
        return "paintscheme/main";
    }

    @RequestMapping("/loadDetail")
    public ModelAndView loadDetail(HttpServletRequest req, Map<String, Object> model, String paintSchemeParameter) {
        ObjectMapper mapper = new ObjectMapper();
        Map map = null;
        try {
            map = mapper.readValue(paintSchemeParameter, HashMap.class);
        } catch (IOException e) {
            logger.error("发生错误",e);
        }
        Product prod = productService.getProductDao().getById(Long.valueOf(map.get("prodId").toString()));
        List<ProdColorStatistics> list = null;
        try{
            list = colorTalentService.getPartColorStatistics(Long.valueOf(map.get("prodId").toString()));
        }catch(Exception e){
            logger.error("发生错误",e);
        }
        List<ColorVo> colorVos = new ArrayList<>();
        Map<String,Integer> partOccurMap = new HashMap<>();
        list.stream().forEach(stat->{
            ColorVo colorVo = new ColorVo(stat.getColor().getCode());
            stat.getParts().stream().forEach(part->{
                PartVo partVo = new PartVo(part.getBoardNo()+part.getNumber());
                Integer count = partOccurMap.get(partVo.getPartNo());
                if(count==null)
                    count=1;
                else
                    count++;
                partOccurMap.put(partVo.getPartNo(),count);
                colorVo.addPart(partVo);
            });
            colorVos.add(colorVo);
        });
        model.put("colorVos", colorVos);
        model.put("partOccur", partOccurMap);
        model.put("prod",prod);
        return new ModelAndView(new PaintSchemeExcelView(), model);
    }

}
