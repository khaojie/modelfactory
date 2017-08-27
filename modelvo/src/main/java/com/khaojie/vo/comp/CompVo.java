package com.khaojie.vo.comp;

import com.khaojie.pojo.Component;
import com.khaojie.pojo.Part;
import com.khaojie.vo.part.PartVo;

import java.util.ArrayList;
import java.util.List;

public class CompVo {
    private Component comp;

    private String parts ="";

    public Component getComp() {
        return comp;
    }

    public void setComp(Component comp) {
        this.comp = comp;
    }

    public String getParts() {
        return parts;
    }

    public void setParts(String parts) {
        this.parts = parts;
    }

}
