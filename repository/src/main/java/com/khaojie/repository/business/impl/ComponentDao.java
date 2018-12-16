package com.khaojie.repository.business.impl;

import com.khaojie.pojo.Component;
import com.khaojie.repository.base.impl.ModelDao;
import com.khaojie.repository.business.IComponentDao;
import org.springframework.stereotype.Repository;

@Repository
public class ComponentDao extends ModelDao<Component> implements IComponentDao {
}
