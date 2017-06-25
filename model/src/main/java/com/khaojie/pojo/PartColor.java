package com.khaojie.pojo;

import javax.persistence.*;
import java.util.List;

/**
 * Created by khaojie on 2017/6/19.
 * 零件所用到的颜色
 * 当前对象所代表的是有可能单色，也有可能是组合色
 */
@Entity
@Table(name = "T_COMP_COLOR", catalog = "model_factory")
public class PartColor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SID")
    private Long sid;

    @Column(name = "PART_ID",nullable = false)
    private Long partId; //T_COMPONENT.id

    //注意组合色与单色为互斥 ,如果为0代表多色件
    @Column(name = "COLOR_ID" ,nullable = false)
    private Long colorId;//当前的颜色为单色T_Color.id

    public Long getSid() {
        return sid;
    }

    public void setSid(Long sid) {
        this.sid = sid;
    }

    public Long getPartId() {
        return partId;
    }

    public void setPartId(Long partId) {
        this.partId = partId;
    }

    public Long getColorId() {
        return colorId;
    }

    public void setColorId(Long colorId) {
        this.colorId = colorId;
    }
}