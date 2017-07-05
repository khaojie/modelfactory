package com.khaojie.service;

import com.khaojie.vo.ProdColorStatistics;

import java.util.List;

/**
 * Created by khaojie on 2017/6/27.
 */
public interface IColorTalentService {
//    void saveColor() throws IllegalAccessException;

    public List<ProdColorStatistics> getPartColorStatistics(Long prodId) throws IllegalAccessException;
}
