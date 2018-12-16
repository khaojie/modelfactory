package com.khaojie.bo.base.impl;

import com.khaojie.bo.base.IBaseBo;
import com.khaojie.repository.business.IPartColorDao;
import com.khaojie.repository.business.IPartDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BaseBo implements IBaseBo{
    @Autowired
    protected IPartDao partDao;
    @Autowired
    protected IPartColorDao partColorDao;

    @Override
    public IPartDao getPartDao() {
        return partDao;
    }

    @Override
    public IPartColorDao getPartColorDao() {
        return partColorDao;
    }
}
