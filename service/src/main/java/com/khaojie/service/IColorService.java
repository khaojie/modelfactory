package com.khaojie.service;

import com.khaojie.pojo.Color;

import java.util.List;

/**
 * Created by khaojie on 2017/7/2.
 */
public interface IColorService {
    public void saveColors(List<Color> colorList) throws IllegalAccessException;
}
