package com.khaojie.vo;

import com.khaojie.pojo.AlternativeComp;
import com.khaojie.pojo.Component;
import com.khaojie.pojo.Part;
import com.khaojie.pojo.ProductDecal;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by khaojie on 2017/6/21.
 * 单组件VO
 */
public class ComponentVo {
    private Component component;
    private List<Part> parts;
    private List<AlternativeComp> alternativeProcesses = new ArrayList<>();//替换工序列表。
    private List<ProductDecal> decals = new ArrayList<>();
    public Component getComponent() {
        return component;
    }

    public void setComponent(Component component) {
        this.component = component;
    }

    public List<Part> getParts() {
        return parts;
    }

    public void setParts(List<Part> parts) {
        this.parts = parts;
    }

    public List<AlternativeComp> getAlternativeProcesses() {
        return alternativeProcesses;
    }

    public void setAlternativeProcesses(List<AlternativeComp> alternativeProcesses) {
        this.alternativeProcesses = alternativeProcesses;
    }

    public List<ProductDecal> getDecals() {
        return decals;
    }

    public void setDecals(List<ProductDecal> decals) {
        this.decals = decals;
    }

}
