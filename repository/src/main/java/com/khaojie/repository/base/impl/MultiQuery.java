package com.khaojie.repository.base.impl;

import com.fd.dao.base.impl.MQuery;
import com.khaojie.repository.base.IMultiQuery;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 * Created by khaojie on 2017/7/9.
 */
@Repository
public class MultiQuery extends MQuery implements IMultiQuery {
    private static final long serialVersionUID = -8060531414304069388L;

    @PersistenceContext(unitName = "model_factory")
    protected EntityManager em;

    @Override
    protected EntityManager getEm() {
        em.setProperty("names","utf8mb4");
        return em;
    }
}
