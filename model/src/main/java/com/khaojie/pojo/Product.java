package com.khaojie.pojo;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by khaojie on 2017/6/19.
 */
public class Product {
    private Long id;
    private String name;
    private List<Component> comps = new ArrayList<>();//零件集
    private List<Process> processes = new ArrayList<>();//所有的工序，包括替换工序

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Component> getComps() {
        return comps;
    }

    public void setComps(List<Component> comps) {
        this.comps = comps;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Process> getProcesses() {
        return processes;
    }

    public void setProcesses(List<Process> processes) {
        this.processes = processes;
    }
}
