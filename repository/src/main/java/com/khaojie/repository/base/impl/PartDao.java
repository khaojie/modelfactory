package com.khaojie.repository.base.impl;

import com.khaojie.pojo.Part;
import com.khaojie.repository.base.IPartDao;
import org.springframework.stereotype.Repository;

/**
 * Created by khaojie on 2017/6/29.
 */
@Repository
public class PartDao extends ModelDao<Part> implements IPartDao{
}
