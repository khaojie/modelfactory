package com.khaojie.repository.business.impl;

import com.khaojie.pojo.Product;
import com.khaojie.repository.base.impl.ModelDao;
import com.khaojie.repository.business.IProductDao;
import org.springframework.stereotype.Repository;

/**
 * Created by khaojie on 2017/7/16.
 */
@Repository
public class ProductDao extends ModelDao<Product> implements IProductDao {
}
