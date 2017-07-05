package com.khaojie.bo;

import com.khaojie.pojo.Color;
import com.khaojie.repository.base.IColorDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by khaojie on 2017/6/28.
 */
@Service
public class TestBo implements ITestBo{
    @Autowired
    private IColorDao colorDao;

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW,rollbackFor = IllegalArgumentException.class)
    public void test() throws IllegalArgumentException{
        Color color = new Color();
        color.setCode("ff");
        color.setColorName("gg");
        colorDao.save(color);
//        if(color.getColorName().equals("gg"))
//            throw new IllegalArgumentException("fuckyou!");
    }
}
