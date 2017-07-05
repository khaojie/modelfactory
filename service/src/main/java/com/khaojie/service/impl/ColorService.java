package com.khaojie.service.impl;

import com.khaojie.pojo.Color;
import com.khaojie.repository.base.IColorDao;
import com.khaojie.service.IColorService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by khaojie on 2017/7/2.
 */
@Service
public class ColorService implements IColorService {
    private Logger log = LoggerFactory.getLogger(ColorService.class);

    @Autowired
    private IColorDao colorDao;
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
            else
                createdList.add(color);
        }
        try{
            colorDao.saveBatch(createdList);
        }catch(Exception e){
            log.error("Color save batch  error!", e);
            throw new IllegalAccessException("Color save batch  error!");
        }
    }
}
