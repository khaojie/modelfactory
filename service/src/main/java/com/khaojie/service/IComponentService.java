package com.khaojie.service;

import com.fd.dao.base.common.PageInfo;
import com.khaojie.vo.comp.CompQueryItem;
import com.khaojie.vo.comp.CompSaveVo;
import com.khaojie.vo.comp.CompVo;
import com.khaojie.vo.part.PartVo;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

public interface IComponentService extends IBaseService{
    @Transactional(propagation = Propagation.REQUIRED,rollbackFor = IllegalAccessException.class)
    void updateAddSingleComp(CompSaveVo saveVo) throws IllegalAccessException;

    Map<Long,List<PartVo>> buildCompPartVo(List<Long> compIds, Long prodId);

    PageInfo<CompVo> getCompVos(CompQueryItem queryItem);
}
