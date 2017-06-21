package com.khaojie.vo;

import com.khaojie.pojo.Component;
import com.khaojie.pojo.Product;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by khaojie on 2017/6/21.
 * 单产品VO
 */
public class ProductVo {
    private Product product;
    private List<Component> comps = new ArrayList<>();//组件集
    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public List<Component> getComps() {
        return comps;
    }

    public void setComps(List<Component> comps) {
        this.comps = comps;
    }

}
