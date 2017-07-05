package com.khaojie.repository.base.impl;

import com.khaojie.pojo.Color;
import com.khaojie.repository.base.IColorDao;
import org.springframework.stereotype.Repository;

/**
 * Created by khaojie on 2017/6/27.
 */
@Repository
public class ColorDao extends ModelDao<Color> implements IColorDao {
}
