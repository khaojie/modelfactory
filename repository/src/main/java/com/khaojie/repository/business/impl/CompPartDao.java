package com.khaojie.repository.business.impl;

import com.khaojie.pojo.CompPart;
import com.khaojie.repository.base.impl.ModelDao;
import com.khaojie.repository.business.ICompPartDao;
import org.springframework.stereotype.Repository;

@Repository
public class CompPartDao extends ModelDao<CompPart> implements ICompPartDao {
}
