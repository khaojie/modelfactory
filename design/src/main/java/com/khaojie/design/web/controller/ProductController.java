package com.khaojie.design.web.controller;

import com.khaojie.pojo.Product;
import com.khaojie.service.IProductService;
import com.khaojie.vo.product.ProductQueryItem;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by khaojie on 2017/7/16.
 */
@Controller
@RequestMapping("/product")
public class ProductController {

    private Logger logger = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private IProductService productService;

    @RequestMapping(value="/queryProducts")
    public String queryProducts(ProductQueryItem queryItem, HttpServletRequest req, Map<String,Object> model) throws Exception{
        model.put("data",productService.getProductsPageInfo(queryItem));
        return "flow_cfg/product/searchTable";
    }

    @RequestMapping(value = "/loadMaintainInfo/{prodId}")
    public String loadMaintainInfo(HttpServletRequest req, @PathVariable Long prodId, Map<String,Object> model) {
        Product product = new Product();
        product.setId(prodId);
        if(prodId!=0L&&prodId!=null){
           product =  productService.getProductDao().getById(prodId);
        }
        model.put("prod",product);
        return "flow_cfg/product/maintainPanel";
    }

    @ResponseBody
    @RequestMapping(value = "/save", produces = "application/json; charset=utf-8")
    public Map save(Product product,HttpServletRequest req ){
        Map resultMap = new HashMap();
        try{
            productService.save(product);
            resultMap.put("result",1);
        }catch(Exception e){
            logger.error(e.getMessage(),e);
            resultMap.put("result",0);
            resultMap.put("errorMsg",e.getMessage());
        }
        return resultMap;
    }
}
