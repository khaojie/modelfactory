package com.khaojie.service;

import com.khaojie.repository.business.*;

/**
 * Created by khaojie on 2017/7/23.
 */
public interface IBaseService {
    public IProductDao getProductDao();

    IPartDao getPartDao();

    IPartColorDao getPartColorDao();

    IColorDao getColorDao();

    ICompPartDao getCompPartDao();

    IComponentDao getComponentDao();
}
