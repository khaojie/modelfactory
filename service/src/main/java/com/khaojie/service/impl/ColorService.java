package com.khaojie.service.impl;

import com.fd.dao.base.common.Condition;
import com.fd.dao.base.common.PageInfo;
import com.fd.dao.base.em.Operators;
import com.fd.util.MyUtils;
import com.khaojie.pojo.Color;
import com.khaojie.repository.base.IColorDao;
import com.khaojie.service.IColorService;
import com.khaojie.vo.color.ColorQueryItem;
import com.khaojie.vo.color.ColorVo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by khaojie on 2017/7/2.
 */
@Service
public class ColorService extends BaseService implements IColorService {
    private Logger log = LoggerFactory.getLogger(ColorService.class);


    @Override
    public PageInfo<ColorVo> queryColors(ColorQueryItem queryItem){
        Set<Condition> conditions = new HashSet<>();
        conditions.add(new Condition("branch", Operators.EQ,queryItem.getColorBranch()));
        if(MyUtils.isNotEmpty(queryItem.getColorName()))
            conditions.add(new Condition("colorName", Operators.LIKE,queryItem.getColorName()));
        if(MyUtils.isNotEmpty(queryItem.getColorNumber()))
            conditions.add(new Condition("code", Operators.EQ,queryItem.getColorNumber()));
        PageInfo<Color> pageInfo = colorDao.getPageInfo(conditions,1,1000);
        PageInfo<ColorVo> pageInfos = new PageInfo<>(pageInfo.getCurPage(),pageInfo.getPageSize(),pageInfo.getTotalCount(),new ArrayList<>());
        pageInfo.getDataList().stream().forEach(color->{
            ColorVo vo = new ColorVo();
            vo.setId(color.getId());
            vo.setCode(color.getCode());
            vo.setColorName(color.getColorName());
            vo.setMixFormula(color.getMixFormula());
            pageInfos.getDataList().add(vo);
        });
        return pageInfos;
    }


    @Override
    @Transactional(propagation = Propagation.REQUIRED,rollbackFor = IllegalAccessException.class)
    public void saveColors(List<Color> colorList) throws IllegalAccessException {
        List<Color> createdList = new ArrayList<>();
        for(Color color:colorList){
            if(color.getId()!=null&&color.getId()!=0L){
                try{
                    colorDao.update(color);
                }catch(Exception e) {
                    log.error("color Id:" + color.getId() + " update error!", e);
                    throw new IllegalAccessException("color Id:" + color.getId() + " update error!");
                }
            }
            else{
                color.setId(null);
                createdList.add(color);
            }

        }
        try{
            colorDao.saveBatch(createdList);
        }catch(Exception e){
            log.error("Color save batch  error!", e);
            throw new IllegalAccessException("Color save batch  error!");
        }
    }
}
