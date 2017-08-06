package com.khaojie.bo.base;

import com.khaojie.repository.base.IPartColorDao;
import com.khaojie.repository.base.IPartDao;

public interface IBaseBo {
    IPartDao getPartDao();

    IPartColorDao getPartColorDao();
}
