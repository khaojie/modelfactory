package com.khaojie.pojo;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by khaojie on 2017/6/19
 * 多个零件组装在一起，称为一个组件
 */
@Entity
@Table(name = "T_COMPONENT", catalog = "model_factory")
public class Component {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SID")
    private Long id;

    @Column(name = "COMP_NAME",length = 100,nullable = false)
    private String compName;

    @Column(name = "NOTE",length = 500,nullable = false)
    private String note;

    @Column(name = "SEQ")
    private Integer seq;//对应产品中所处的组装顺序

    @Column(name = "PROD_ID",nullable = false)
    private Long prodId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompName() {
        return compName;
    }

    public void setCompName(String compName) {
        this.compName = compName;
    }


    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Integer getSeq() {
        return seq;
    }

    public void setSeq(Integer seq) {
        this.seq = seq;
    }

    public Long getProdId() {
        return prodId;
    }

    public void setProdId(Long prodId) {
        this.prodId = prodId;
    }
}
