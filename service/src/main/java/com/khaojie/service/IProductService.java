package com.khaojie.service;

import com.fd.dao.base.common.PageInfo;
import com.khaojie.pojo.Product;
import com.khaojie.vo.product.ProductQueryItem;

/**
 * Created by khaojie on 2017/7/16.
 */
public interface IProductService extends IBaseService {
    PageInfo<Product> getProductsPageInfo(ProductQueryItem queryItem);

    void save(Product product) throws IllegalAccessException;
}
