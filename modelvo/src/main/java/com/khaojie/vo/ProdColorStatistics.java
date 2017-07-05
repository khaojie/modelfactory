package com.khaojie.vo;

import com.khaojie.pojo.Color;
import com.khaojie.pojo.Part;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by khaojie on 2017/6/30.
 */
public class ProdColorStatistics {

    public ProdColorStatistics(Color color){
        this.color = color;
    }
    private Color color;

    private List<Part> parts = new ArrayList<>();

    public Color getColor() {
        return color;
    }

    public void setColor(Color color) {
        this.color = color;
    }

    public Integer getTotalParts() {
        return parts.size();
    }

    public List<Part> getParts() {
        return parts;
    }

    public void setParts(List<Part> parts) {
        this.parts = parts;
    }

    public void addPart(Part part){
        this.parts.add(part);
    }

}
