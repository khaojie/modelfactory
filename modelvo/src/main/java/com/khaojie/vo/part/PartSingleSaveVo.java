package com.khaojie.vo.part;

import com.khaojie.pojo.Part;

public class PartSingleSaveVo {
    private Part part;
    private String colors = "";
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
}
