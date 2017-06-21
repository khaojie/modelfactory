package com.khaojie.vo;

import com.khaojie.pojo.Part;
import com.khaojie.pojo.PartColor;
import com.khaojie.pojo.ProductDecal;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by khaojie on 2017/6/21.
 * 单零件VO
 */
public class PartVo {

    private Part part;

    private List<PartColor> colors = new ArrayList<>();//零件的需要用到的漆色

    private List<ProductDecal> decals = new ArrayList<>();//涉及用到的水贴

    public List<PartColor> getColors() {
        return colors;
    }

    public void setColors(List<PartColor> colors) {
        this.colors = colors;
    }

    public Part getPart() {
        return part;
    }

    public void setPart(Part part) {
        this.part = part;
    }

    public List<ProductDecal> getDecals() {
        return decals;
    }

    public void setDecals(List<ProductDecal> decals) {
        this.decals = decals;
    }
    /**
     * 是否为单色件
     * @return
     */
    public Boolean isSingleColorPart(){
        if(colors.size()>1)
            return false;
        return true;
    }
}
