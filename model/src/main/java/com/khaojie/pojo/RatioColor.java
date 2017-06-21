package com.khaojie.pojo;

/**
 * Created by khaojie on 2017/6/19.
 * 比例色
 */
public class RatioColor {
    private Long id;
    private Long colorId;//T_Color.id
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
