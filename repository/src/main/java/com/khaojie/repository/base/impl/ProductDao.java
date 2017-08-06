package com.khaojie.repository.base.impl;

import com.khaojie.pojo.Product;
import com.khaojie.repository.base.IModelDao;
import com.khaojie.repository.base.IProductDao;
import org.springframework.stereotype.Repository;

/**
 * Created by khaojie on 2017/7/16.
 */
@Repository
public class ProductDao extends ModelDao<Product> implements IProductDao{
}
