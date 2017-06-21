package com.khaojie.pojo;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by khaojie on 2017/6/19.
 * 板件中的零件
 */
public class Component {
    private Long id;
    private Long prodId;//T_Product.id;
    private String boardNo;
    private Integer number;
    private String name;
    private List<CompColor> colors = new ArrayList<>();//零件的需要用到的漆色
    private List<ProductDecal> decals = new ArrayList<>();//涉及用到的水贴
    private String note;
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBoardNo() {
        return boardNo;
    }

    public void setBoardNo(String boardNo) {
        this.boardNo = boardNo;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<CompColor> getColors() {
        return colors;
    }

    public void setColors(List<CompColor> colors) {
        this.colors = colors;
    }

    public Long getProdId() {
        return prodId;
    }

    public void setProdId(Long prodId) {
        this.prodId = prodId;
    }

    /**
     * 是否为单色件
     * @return
     */
    public Boolean isSingleColorComp(){
        if(colors.size()>1)
            return false;
        return true;
    }
}
