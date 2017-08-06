package com.khaojie.repository.base.impl;

import com.khaojie.pojo.Component;
import com.khaojie.repository.base.IComponentDao;
import org.springframework.stereotype.Repository;

@Repository
public class ComponentDao extends ModelDao<Component> implements IComponentDao {
}
