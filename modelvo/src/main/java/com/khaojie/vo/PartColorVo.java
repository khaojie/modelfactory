package com.khaojie.vo;

import com.khaojie.pojo.PartColor;
import com.khaojie.pojo.RatioColor;

import java.util.List;

/**
 * Created by khaojie on 2017/6/21.
 */
public class PartColorVo {

    private PartColor color;

    private List<RatioColor> ratioColors;//当前的颜色为组合色

    public PartColor getColor() {
        return color;
    }

    public void setColor(PartColor color) {
        this.color = color;
    }

    public List<RatioColor> getRatioColors() {
        return ratioColors;
    }

    public void setRatioColors(List<RatioColor> ratioColors) {
        this.ratioColors = ratioColors;
    }
}
