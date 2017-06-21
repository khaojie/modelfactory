package com.khaojie.pojo;

import javax.persistence.*;

/**
 * Created by khaojie on 2017/6/19.
 * 替换工序
 */
@Entity
@Table(name = "T_ALT_PROCESS", catalog = "model_factory")
public class AlternativeProcess {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SID")
    private Long id;

    @Column(name = "PROCESS_ID")
    private Long processId;//可补替换工序ID

    @Column(name = "ALT_PROCESS_ID")
    private Long altProcessId; //备选工序ID，如是有多个备选工序ID，则为多条记录，如1,2 and 1,3这种存储方式。
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProcessId() {
        return processId;
    }

    public void setProcessId(Long processId) {
        this.processId = processId;
    }

    public Long getAltProcessId() {
        return altProcessId;
    }

    public void setAltProcessId(Long altProcessId) {
        this.altProcessId = altProcessId;
    }
}
