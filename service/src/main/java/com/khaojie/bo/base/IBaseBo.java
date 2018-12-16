package com.khaojie.bo.base;


import com.khaojie.repository.business.IPartColorDao;
import com.khaojie.repository.business.IPartDao;

public interface IBaseBo {
    IPartDao getPartDao();

    IPartColorDao getPartColorDao();
}
