package com.khaojie.design;

import com.fd.dao.base.bean.Cuery;
import com.fd.dao.base.bean.JoinQuery;
import com.fd.dao.base.common.Condition;
import com.fd.dao.base.em.MultiJoinTp;
import com.fd.dao.base.em.Operators;
import com.fd.util.MyUtils;
import com.khaojie.repository.base.IMultiQuery;
import com.khaojie.service.IColorService;
import com.khaojie.vo.color.ColorQueryItem;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("dev")
public class TestUnitClass {

    @Autowired
    IColorService colorService;

    @Autowired
    IMultiQuery multiQuery;

//    @Test
    public void test(){
        ColorQueryItem cqi = new ColorQueryItem();
        cqi.setCurPage(1);
        cqi.setPageSize(10);
        colorService.queryColors(cqi);
    }

    @Test
    public void testMultiQuery(){
        JoinQuery prodJoinQuery = new JoinQuery("T_PRODUCT");
        prodJoinQuery.setMidcm(MyUtils.getObjs("SID"));//关联键
        prodJoinQuery.setCuerys(new LinkedHashSet<Cuery>(Arrays.asList(Cuery.getCuerys("PROD_NAME"))));
        prodJoinQuery.setMultiJoinTp(MultiJoinTp.INNER);

        JoinQuery partJoinQuery = new JoinQuery("T_PART");
        partJoinQuery.setMidcm(MyUtils.getObjs("PROD_ID","SID"));//关联键
        partJoinQuery.setCuerys(new LinkedHashSet<Cuery>(Arrays.asList(Cuery.getCuerys("BOARD_NO", "PART_NAME", "NOTE", "PART_NUMBER", "PART_COUNT")))); //查询列
        prodJoinQuery.setJoinQuery(partJoinQuery);

//		partJoinQuery.setGroupbys(MyUtils.getObjs("ORDER_ID"));//分组
        partJoinQuery.setMultiJoinTp(MultiJoinTp.INNER);
        Set<Condition> conditions = new HashSet<Condition>(){{
            add(new Condition("BOARD_NO",Operators.EQ,"123"));
        }};
        partJoinQuery.setConditions(conditions);  //条件

        JoinQuery partColorJoinQuery = new JoinQuery("T_PART_COLOR");
        partJoinQuery.setJoinQuery(partColorJoinQuery);
        partColorJoinQuery.setMidcm(MyUtils.getObjs("PART_ID"));
        partColorJoinQuery.setCuerys(new LinkedHashSet<>(Arrays.asList(Cuery.getCuerys("COLOR_ID")))); //查询列
        partColorJoinQuery.setConditions(Condition.getConditions(
                new Condition(1,"COLOR_ID", 2)
        ));
        System.out.println(multiQuery.getJoinList(prodJoinQuery, 1, Integer.MAX_VALUE));
    }
}
