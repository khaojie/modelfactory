package com.khaojie.service;

import com.khaojie.repository.base.IColorDao;
import com.khaojie.repository.base.IPartColorDao;
import com.khaojie.repository.base.IPartDao;
import com.khaojie.repository.base.IProductDao;

/**
 * Created by khaojie on 2017/7/23.
 */
public interface IBaseService {
    public IProductDao getProductDao();

    IPartDao getPartDao();

    IPartColorDao getPartColorDao();

    IColorDao getColorDao();
}
