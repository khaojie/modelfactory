package com.khaojie.service.impl;

import com.fd.dao.base.common.Condition;
import com.fd.dao.base.common.PageInfo;
import com.fd.dao.base.em.Operators;
import com.fd.util.MyUtils;
import com.khaojie.pojo.Product;
import com.khaojie.service.IProductService;
import com.khaojie.vo.product.ProductQueryItem;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

/**
 * Created by khaojie on 2017/7/16.
 */
@Service
public class ProductService extends BaseService implements IProductService {

    private Logger logger = LoggerFactory.getLogger(ProductService.class);

    @Override
    public PageInfo<Product> getProductsPageInfo(ProductQueryItem queryItem){
        Set<Condition> conditions = new HashSet();
        if(MyUtils.isNotEmpty(queryItem.getProdName()))
            conditions.add(new Condition("name", Operators.LIKE,queryItem.getProdName()));
        return productDao.getPageInfo(conditions,1,1000);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {IllegalAccessException.class})
    public void save(Product product) throws IllegalAccessException {
        try{
            if(product.getId()==0L){
                productDao.save(product);
                return;
            }
            productDao.update(product);
        }catch(Exception e){
            logger.error(e.getMessage(),e);
            throw new IllegalAccessException(e.getMessage());
        }
    }
}
