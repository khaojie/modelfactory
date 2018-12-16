package com.khaojie.repository.business.impl;

import com.khaojie.pojo.Color;
import com.khaojie.repository.base.impl.ModelDao;
import com.khaojie.repository.business.IColorDao;
import org.springframework.stereotype.Repository;

/**
 * Created by khaojie on 2017/6/27.
 */
@Repository
public class ColorDao extends ModelDao<Color> implements IColorDao {
}
