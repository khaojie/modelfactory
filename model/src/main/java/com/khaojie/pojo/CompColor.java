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
public class CompColor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SID")
    private Long sid;
    @Column(name = "COMP_ID")
    private Long compId; //T_COMPONENT.id
    //注意组合色与单色为互斥
    @Column(name = "COLOR_ID")
    private Long colorId;//当前的颜色为单色T_Color.id

    private List<RatioColor> ratioColors;//当前的颜色为组合色
    private Integer isSingleColor=1;//默认1代表为单色

    public Long getCompId() {
        return compId;
    }

    public void setCompId(Long compId) {
        this.compId = compId;
    }


    public List<RatioColor> getRatioColors() {
        return ratioColors;
    }

    public void setRatioColors(List<RatioColor> ratioColors) {
        this.ratioColors = ratioColors;
    }

    public Integer getIsSingleColor() {
        return isSingleColor;
    }

    public void setIsSingleColor(Integer isSingleColor) {
        this.isSingleColor = isSingleColor;
    }

    public Long getColorId() {
        return colorId;
    }

    public void setColorId(Long colorId) {
        this.colorId = colorId;
    }
}
