package com.khaojie.repository.base.impl;

import com.fd.dao.base.impl.BaseDao;
import com.khaojie.repository.base.IModelDao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 * Created by khaojie on 2017/6/27.
 */
public class ModelDao<POJO> extends BaseDao<POJO> implements IModelDao<POJO> {
    @PersistenceContext(unitName = "model_factory")
    protected EntityManager em;

    @Override
    protected EntityManager getEm() {
        em.setProperty("names","utf8mb4");
        return em;
    }
}
