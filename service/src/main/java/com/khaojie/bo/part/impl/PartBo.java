package com.khaojie.bo.part.impl;

import com.fd.util.MyUtils;
import com.khaojie.bo.base.impl.BaseBo;
import com.khaojie.bo.part.IPartBo;
import com.khaojie.pojo.Part;
import com.khaojie.pojo.PartColor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Component
public class PartBo extends BaseBo implements IPartBo {

    @Override
    public void saveParts(List<Part> parts){
        List<Part>newList = new ArrayList<>();
        List<Part>updateList = new ArrayList<>();
        for(Part part:parts){
            if(part.getId()==null||part.getId()==0L){
                part.setId(null);
                newList.add(part);
                continue;
            }
            updateList.add(part);
        }
        if(MyUtils.isNotEmpty(newList))
            partDao.saveBatch(newList);
        if(MyUtils.isNotEmpty(updateList))
            partDao.updateByList(updateList);
    }

    @Override
    public void savePartColors(List<PartColor> partColors){
        List<PartColor>newList = new ArrayList<>();
        List<PartColor>updateList = new ArrayList<>();
        for(PartColor part:partColors){
            if(part.getSid()==null||part.getSid()==0L){
                newList.add(part);
                continue;
            }
            updateList.add(part);
        }
        if(MyUtils.isNotEmpty(newList))
            partColorDao.saveBatch(newList);
        if(MyUtils.isNotEmpty(updateList))
            partColorDao.updateByList(updateList);
    }
}
