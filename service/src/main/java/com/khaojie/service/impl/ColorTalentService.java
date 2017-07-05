package com.khaojie.service.impl;

import com.fd.dao.base.common.Condition;
import com.fd.dao.base.em.Operators;
import com.fd.util.MyUtils;
import com.khaojie.pojo.Color;
import com.khaojie.pojo.Part;
import com.khaojie.pojo.PartColor;
import com.khaojie.repository.base.IColorDao;
import com.khaojie.repository.base.IPartColorDao;
import com.khaojie.repository.base.IPartDao;
import com.khaojie.service.IColorTalentService;
import com.khaojie.vo.ProdColorStatistics;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Created by khaojie on 2017/6/21.
 */
@Service
public class ColorTalentService implements IColorTalentService {
    @Autowired
    private IColorDao colorDao;
    @Autowired
    private IPartColorDao partColorDao;
    @Autowired
    private IPartDao partDao;

    @Override
    public List<ProdColorStatistics> getPartColorStatistics(Long prodId) throws IllegalAccessException {
        List<Part> parts = partDao.getListBySgCd(Condition.getConditions(new Condition("prodId", Operators.EQ,prodId)),"id","boardNo","number","name");
        if(parts==null||parts.isEmpty())
            throw new IllegalAccessException("No Part is defined under prodId:"+prodId);
        Map<Long,Part> partMap = new HashMap<>();
        parts.stream().forEach(en->{partMap.put(en.getId(),en);});
        List<Long> partIds = MyUtils.getIds("id",parts);
        List<PartColor> partColors = partColorDao.getListBySgCd(Condition.getConditions(new Condition("partId",Operators.IN,partIds)),"colorId");
        Map<Long,ProdColorStatistics> map = new HashMap<>();
        for(PartColor pc:partColors){
            Long colorId = pc.getColorId();
            ProdColorStatistics ps = map.get(colorId);
            if(ps==null){
                Color color = colorDao.getById(colorId);
                ps = new ProdColorStatistics(color);
            }
            ps.addPart(partMap.get(pc.getPartId()));
        }
        return new ArrayList<>(map.values());
    }
}