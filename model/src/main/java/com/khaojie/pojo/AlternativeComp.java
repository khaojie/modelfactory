package com.khaojie.pojo;

import javax.persistence.*;

/**
 * Created by khaojie on 2017/6/19.
 * 替换组件
 */
@Entity
@Table(name = "T_ALT_COMP", catalog = "model_factory")
public class AlternativeComp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SID")
    private Long id;

    @Column(name = "COMP_ID")
    private Long COMP_ID;//可补替换工序ID

    @Column(name = "ALT_COMP_ID")
    private Long altCompId; //备选工序ID，如是有多个备选工序ID，则为多条记录，如1,2 and 1,3这种存储方式。

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCOMP_ID() {
        return COMP_ID;
    }

    public void setCOMP_ID(Long COMP_ID) {
        this.COMP_ID = COMP_ID;
    }

    public Long getAltCompId() {
        return altCompId;
    }

    public void setAltCompId(Long altCompId) {
        this.altCompId = altCompId;
    }
}
