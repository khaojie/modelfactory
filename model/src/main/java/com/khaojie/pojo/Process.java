package com.khaojie.pojo;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by khaojie on 2017/6/19
 * 工序.至少有两个零件/一个零件一个水贴，及最小单位的组合，可以作为一个工序
 */
public class Process {
    private Long id;
    private String processName;
    private String processDesc;
    private List<Component> comps;
    private String note;
    private Integer seq;//对应产品中所处的组装顺序
    private List<AlternativeProcess> alternativeProcesses = new ArrayList<>();//替换工序列表。
    private List<ProductDecal> decals = new ArrayList<>();
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProcessName() {
        return processName;
    }

    public void setProcessName(String processName) {
        this.processName = processName;
    }

    public String getProcessDesc() {
        return processDesc;
    }

    public void setProcessDesc(String processDesc) {
        this.processDesc = processDesc;
    }

    public List<Component> getComps() {
        return comps;
    }

    public void setComps(List<Component> comps) {
        this.comps = comps;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Integer getSeq() {
        return seq;
    }

    public void setSeq(Integer seq) {
        this.seq = seq;
    }

    public List<AlternativeProcess> getAlternativeProcesses() {
        return alternativeProcesses;
    }

    public void setAlternativeProcesses(List<AlternativeProcess> alternativeProcesses) {
        this.alternativeProcesses = alternativeProcesses;
    }

    public List<ProductDecal> getDecals() {
        return decals;
    }

    public void setDecals(List<ProductDecal> decals) {
        this.decals = decals;
    }
}
