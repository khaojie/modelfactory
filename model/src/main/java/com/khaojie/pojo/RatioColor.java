package com.khaojie.pojo;

import javax.persistence.*;

/**
 * Created by khaojie on 2017/6/19.
 * 比例色
 */
@Entity
@Table(name = "T_RATIO_COLOR", catalog = "model_factory")
public class RatioColor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SID")
    private Long id;

    @Column(name = "COLOR_ID",nullable = false)
    private Long colorId;//T_Color.id

    @Column(name = "RATIO")
    private Integer ratio;//配比

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getColorId() {
        return colorId;
    }

    public void setColorId(Long colorId) {
        this.colorId = colorId;
    }

    public Integer getRatio() {
        return ratio;
    }

    public void setRatio(Integer ratio) {
        this.ratio = ratio;
    }
}
