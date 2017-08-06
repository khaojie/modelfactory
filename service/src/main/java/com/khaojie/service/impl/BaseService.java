package com.khaojie.service.impl;

import com.khaojie.repository.base.IColorDao;
import com.khaojie.repository.base.IPartColorDao;
import com.khaojie.repository.base.IPartDao;
import com.khaojie.repository.base.IProductDao;
import com.khaojie.service.IBaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by khaojie on 2017/7/23.
 */
@Service
public class BaseService implements IBaseService {

    @Autowired
    protected IProductDao productDao;

    @Autowired
    protected IPartDao partDao;


    @Autowired
    protected IPartColorDao partColorDao;


    @Autowired
    protected IColorDao colorDao;

    @Override
    public IProductDao getProductDao() {
        return productDao;
    }

    @Override
    public IPartDao getPartDao() {
        return partDao;
    }

    @Override
    public IPartColorDao getPartColorDao() {
        return partColorDao;
    }

    @Override
    public IColorDao getColorDao() {
        return colorDao;
    }
}
