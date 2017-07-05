package com.khaojie.repository.base.impl;

import com.khaojie.pojo.PartColor;
import com.khaojie.repository.base.IPartColorDao;
import com.khaojie.repository.base.IPartDao;
import org.springframework.stereotype.Repository;

/**
 * Created by khaojie on 2017/6/30.
 */
@Repository
public class PartColorDao extends ModelDao<PartColor> implements IPartColorDao<PartColor> {
}
