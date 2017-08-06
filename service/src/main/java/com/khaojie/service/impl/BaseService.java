package com.khaojie.service.impl;

import com.khaojie.repository.base.*;
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


    @Autowired
    protected ICompPartDao compPartDao;


    @Autowired
    protected IComponentDao componentDao;

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

    @Override
    public ICompPartDao getCompPartDao() {
        return compPartDao;
    }

    @Override
    public IComponentDao getComponentDao() {
        return componentDao;
    }
}
