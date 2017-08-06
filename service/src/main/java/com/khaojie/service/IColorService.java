package com.khaojie.service;

import com.fd.dao.base.common.PageInfo;
import com.khaojie.pojo.Color;
import com.khaojie.vo.color.ColorQueryItem;
import com.khaojie.vo.color.ColorVo;

import java.util.List;

/**
 * Created by khaojie on 2017/7/2.
 */
public interface IColorService extends IBaseService {
    PageInfo<ColorVo> queryColors(ColorQueryItem queryItem);

    public void saveColors(List<Color> colorList) throws IllegalAccessException;
}
