package com.khaojie.vo.part;

import com.khaojie.pojo.Part;

public class PartSingleSaveVo {
    private Part part;
    private String colors = "";
    /*********以下两个属性用于界面的快捷操作*********/
    private Long prevId = 0L;
    private Long nextId = 0L;
    public Part getPart() {
        return part;
    }

    public void setPart(Part part) {
        this.part = part;
    }

    public String getColors() {
        return colors;
    }

    public void setColors(String colors) {
        this.colors = colors;
    }

    public Long getPrevId() {
        return prevId;
    }

    public void setPrevId(Long prevId) {
        this.prevId = prevId;
    }

    public Long getNextId() {
        return nextId;
    }

    public void setNextId(Long nextId) {
        this.nextId = nextId;
    }
}
