package com.khaojie.vo.paintscheme.download;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class ColorVo implements Serializable{
    private String colorNo;
    private List<PartVo> parts = new ArrayList<>();
    public ColorVo(){}
    public ColorVo(String colorNo){
        this.colorNo = colorNo;
    }
    public String getColorNo() {
        return colorNo;
    }

    public void setColorNo(String colorNo) {
        this.colorNo = colorNo;
    }

    public List<PartVo> getParts() {
        return parts;
    }

    public void setParts(List<PartVo> parts) {
        this.parts = parts;
    }
    public void addPart(PartVo part){
        this.parts.add(part);
    }

    public int getPartSize(){
        return parts.size();
    }
}
