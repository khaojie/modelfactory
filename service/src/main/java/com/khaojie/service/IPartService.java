package com.khaojie.service;

import com.fd.dao.base.common.PageInfo;
import com.khaojie.pojo.Part;
import com.khaojie.vo.part.PartQueryItem;
import com.khaojie.vo.part.PartSingleSaveVo;
import com.khaojie.vo.part.PartVo;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

public interface IPartService extends IBaseService {

    void savePartForArray(String[] strs, Long prodId) throws Exception;

    void savePartRange(Long prodId, String board, Integer min, Integer max) throws  Exception;

    void updateAddSinglePart(PartSingleSaveVo saveVo) throws IllegalAccessException;

    Map<Long,String> getPartColors(List<Long> partIds);

    PageInfo<PartVo> getPartVos(PartQueryItem queryItem);
}
