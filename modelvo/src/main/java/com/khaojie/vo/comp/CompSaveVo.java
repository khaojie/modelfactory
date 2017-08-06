package com.khaojie.vo.comp;

import com.khaojie.pojo.Component;

public class CompSaveVo {
    private Component comp;
    private String parts="";
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
