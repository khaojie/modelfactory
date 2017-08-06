package com.khaojie.pojo;

import javax.persistence.*;

@Entity
@Table(name = "T_COMP_PART", catalog = "model_factory")
public class CompPart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SID")
    private Long id;

    @Column(name = "COMP_ID",nullable = false)
    private Long compId;

    @Column(name = "PART_ID",nullable = false)
    private Long partId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCompId() {
        return compId;
    }

    public void setCompId(Long compId) {
        this.compId = compId;
    }

    public Long getPartId() {
        return partId;
    }

    public void setPartId(Long partId) {
        this.partId = partId;
    }
}
