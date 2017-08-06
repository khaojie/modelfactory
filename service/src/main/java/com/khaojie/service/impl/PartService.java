package com.khaojie.service.impl;

import com.fd.dao.base.common.Condition;
import com.fd.dao.base.common.PageInfo;
import com.fd.dao.base.em.Operators;
import com.fd.util.MyUtils;
import com.khaojie.bo.part.IPartBo;
import com.khaojie.pojo.Color;
import com.khaojie.pojo.Part;
import com.khaojie.pojo.PartColor;
import com.khaojie.service.IPartService;
import com.khaojie.utils.KhjUtils;
import com.khaojie.vo.part.PartQueryItem;
import com.khaojie.vo.part.PartSingleSaveVo;
import com.khaojie.vo.part.PartVo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class PartService extends BaseService implements IPartService {

    private Logger log = LoggerFactory.getLogger(PartService.class);

    @Autowired
    protected IPartBo partBo;

    @Override
    @Transactional(propagation = Propagation.REQUIRED,rollbackFor = Exception.class)
    public void savePartForArray(String[] strs, Long prodId) throws Exception{
        List<Part> parts = new ArrayList<>();
        for(String str:strs){
            String board = KhjUtils.getZiMu(str);
            Integer number = Integer.valueOf(KhjUtils.getNumber(str));
            parts.add(packBasicPart(board,number,prodId));
        }
        partBo.saveParts(parts);
    }

    private Part packBasicPart(String boardNo,Integer number,Long prodId){
        Part part = new Part();
        part.setBoardNo(boardNo);
        part.setNumber(number);
        part.setProdId(prodId);
        return part;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED,rollbackFor = Exception.class)
    public void savePartRange(Long prodId, String board, Integer min, Integer max) throws Exception{
        List<Part> parts = new ArrayList<>();
        if(max==null||max==0)
            max=min;
        for(int i=min;i<=max;i++){
            parts.add(packBasicPart(board,i,prodId));
        }
        partBo.saveParts(parts);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED,rollbackFor = IllegalAccessException.class)
    public void updateAddSinglePart(PartSingleSaveVo saveVo) throws IllegalAccessException{
        List<Part> list = new ArrayList<Part>(){{add(saveVo.getPart());}};
        try{
            partBo.saveParts(list);
        }catch(Exception e){
            log.error("part save errors!",e);
            throw new IllegalAccessException(e.getMessage());
        }
        List<PartColor> partColors = new ArrayList<>();
        if(MyUtils.isNotEmpty(saveVo.getColors())){
            List<String> colorCodelist = Arrays.asList(saveVo.getColors().split(","));
            List<Color> colors =colorDao.getListBySgCd(Condition.getConditions(new Condition("code",Operators.IN,colorCodelist)));
            if(colors.size()!=colorCodelist.size())
                throw new IllegalAccessException("the color codes you input are not all matched with Color base data!");
            for(Color color:colors){
                PartColor pc = new PartColor();
                pc.setColorId(color.getId());
                pc.setPartId(saveVo.getPart().getId());
                partColors.add(pc);
            }
            try{
                partColorDao.deleteByCondition(Condition.getConditions(new Condition("partId",Operators.EQ,saveVo.getPart().getId())));
                partBo.savePartColors(partColors);
            }catch(Exception e){
                log.error("part color save errors!",e);
                throw new IllegalAccessException(e.getMessage());
            }
        }
    }
    @Override
    public Map<Long,String> getPartColors(List<Long> partIds){
        List<PartColor> partColors = partColorDao.getListBySgCd(Condition.getConditions(new Condition("partId",Operators.IN,partIds)));
        if(MyUtils.isEmpty(partColors))
            return new HashMap<>();
        Map<Long,List<PartColor>> partColorMaps = new HashMap<>();
        Map<Long,Color> colorMap = new HashMap<>();
        partColors.stream().forEach(en->{
            List<PartColor> list = partColorMaps.get(en.getPartId());
            if(list==null){
                list = new ArrayList<>();
                partColorMaps.put(en.getPartId(),list);
            }
            list.add(en);
        });
        List<Long> colorIds =MyUtils.getIds("colorId",partColors);
        List<Color> colors = colorDao.getListBySgCd(Condition.getConditions(new Condition("id",Operators.IN,colorIds)));
        colors.stream().forEach(en->{
            colorMap.put(en.getId(),en);
        });
        Map<Long,String> map = new HashMap<>();
        for(Long prodId:partColorMaps.keySet()){
            String colorxs ="";
            for(PartColor pc:partColorMaps.get(prodId)){
                Color color = colorMap.get(pc.getColorId());
                colorxs = colorxs+","+color.getCode();
            }
            map.put(prodId,colorxs.replaceFirst(",",""));
        }
        return map;
    }

    @Override
    public PageInfo<PartVo> getPartVos(PartQueryItem queryItem){
        PageInfo<Part> parts = partDao.getPageInfo(Condition.getConditions(new Condition("prodId", Operators.EQ,queryItem.getProdId())),1,2000);
        if(parts.getTotalCount()==0L)
            return new PageInfo(1,15,0L,new ArrayList<>());

        Map<Long,String> partColorMaps = new HashMap<>();
        partColorMaps.putAll(getPartColors(MyUtils.getIds("id",parts.getDataList())));
        PageInfo<PartVo> partss = new PageInfo<>(parts.getCurPage(),parts.getPageSize(),parts.getTotalCount(),new ArrayList<>());
        parts.getDataList().stream().forEach(part->{
            PartVo vo = new PartVo();
            vo.setSid(part.getId());
            vo.setNo(part.getBoardNo()+""+part.getNumber());
            vo.setName(part.getName());
            vo.setProdId(part.getProdId());
            vo.setColors(partColorMaps.get(part.getId())==null?"":partColorMaps.get(part.getId()));
            partss.getDataList().add(vo);
        });
        return partss;
    }
}
