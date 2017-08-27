package com.khaojie.service.impl;

import com.fd.dao.base.common.Condition;
import com.fd.dao.base.common.PageInfo;
import com.fd.dao.base.em.Operators;
import com.fd.util.MyUtils;
import com.khaojie.pojo.CompPart;
import com.khaojie.pojo.Component;
import com.khaojie.service.IComponentService;
import com.khaojie.service.IPartService;
import com.khaojie.utils.KhjUtils;
import com.khaojie.vo.comp.CompQueryItem;
import com.khaojie.vo.comp.CompSaveVo;
import com.khaojie.vo.comp.CompVo;
import com.khaojie.vo.part.PartQueryItem;
import com.khaojie.vo.part.PartVo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ComponentService extends BaseService implements IComponentService{

    private Logger log = LoggerFactory.getLogger(ComponentService.class);

    @Autowired
    private IPartService partService;


    @Override
    @Transactional(propagation = Propagation.REQUIRED,rollbackFor = IllegalAccessException.class)
    public void updateAddSingleComp(CompSaveVo saveVo) throws IllegalAccessException{
        Component comp = saveVo.getComp();
        if(comp.getId()==null||comp.getId()==0L){
            comp.setId(null);
            componentDao.save(comp);
        }else
            componentDao.update(comp);
        String[] parts = saveVo.getParts().split(",");
        List<CompPart> compParts = new ArrayList<>();
        for(String part:parts){
            Long partId = partDao.get(Condition.getConditions(
                    new Condition("prodId",Operators.EQ,comp.getProdId()),
                    new Condition("boardNo",Operators.EQ,KhjUtils.getZiMu(part)),
                    new Condition("number",Operators.EQ,Integer.valueOf(KhjUtils.getNumber(part)))
            ),"id").getId();
            if(partId==null)
                throw new IllegalAccessException(part+" has no part defination");
            CompPart cp = new CompPart();
            cp.setCompId(comp.getId());
            cp.setPartId(partId);
            compParts.add(cp);
        }
        try{
            compPartDao.deleteByCondition(Condition.getConditions(new Condition("compId",Operators.EQ, comp.getId())));
            compPartDao.saveBatch(compParts);
        }catch(Exception e){
            log.error("save component error",e);
            throw new IllegalAccessException("save component error"+e.getMessage());
        }
    }
    @Override
    public Map<Long,List<PartVo>> buildCompPartVo(List<Long> compIds, Long prodId){
        Map<Long,List<PartVo>> map = new HashMap<>();
        List<CompPart> compParts = getCompPartDao().getListByCondition(Condition.getConditions(new Condition("compId",Operators.IN,compIds)));
        if(MyUtils.isEmpty(compParts))
            return map;
        PartQueryItem queryItem = new PartQueryItem();
        queryItem.setProdId(prodId);
        queryItem.setCurPage(1);queryItem.setPageSize(2000);
        List<PartVo> allPartVos = partService.getPartVos(queryItem).getDataList();
        for(Long compId:compIds){
            List<PartVo> partVos = new ArrayList<>();
            compParts.stream().forEach(compPart -> {
                if(compPart.getCompId().equals(compId)){
                    allPartVos.stream().forEach(partVo -> {
                        if(partVo.getSid().equals(compPart.getPartId())){
                            partVos.add(partVo);
                        }
                    });
                }
            });
            map.put(compId,partVos);
        }
        return map;
    }

    @Override
    public PageInfo<CompVo> getCompVos(CompQueryItem queryItem){
        PageInfo<Component> comps = componentDao.getPageInfo(Condition.getConditions(new Condition("prodId", Operators.EQ,queryItem.getProdId())),1,1000);
        if(comps.getTotalCount()==0L)
            return new PageInfo(1,15,0L,new ArrayList<>());
        Map<Long,List<PartVo>> compPartVos = buildCompPartVo(MyUtils.getIds("id",comps.getDataList()),queryItem.getProdId());
        PageInfo<CompVo> compVos = new PageInfo<>(comps.getCurPage(),comps.getPageSize(),comps.getTotalCount(),new ArrayList<>());
        comps.getDataList().stream().forEach(comp->{
            CompVo compVo = new CompVo();
            compVo.setComp(comp);
            List<PartVo> partVos = compPartVos.get(comp.getId());
            partVos.stream().forEach(partVo -> {
                compVo.setParts(compVo.getParts()+","+partVo.getNo());
            });
            compVo.setParts(compVo.getParts().replaceFirst(",",""));
            compVos.getDataList().add(compVo);
        });
        return compVos;
    }

    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("11");list.add("22");list.add("33");
        list.stream().collect(
            Collectors.joining(",")
        );
    }
}
