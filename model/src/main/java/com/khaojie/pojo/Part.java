package com.khaojie.pojo;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by khaojie on 2017/6/19.
 * 板件中的零件
 */
@Entity
@Table(name = "T_PART", catalog = "model_factory")
public class Part {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SID")
    private Long id;

    @Column(name = "PROD_ID",nullable = false)
    private Long prodId;//T_Product.id;

    @Column(name = "BOARD_NO", length = 4,nullable = false)
    private String boardNo;

    @Column(name = "PART_NUMBER",nullable = false)
    private Integer number;

    @Column(name = "PART_NAME",length = 50,nullable = false)
    private String name;

    @Column(name = "NOTE",length = 500,nullable = false)
    private String note;


    private Integer needPrePaint =1;
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBoardNo() {
        return boardNo;
    }

    public void setBoardNo(String boardNo) {
        this.boardNo = boardNo;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getProdId() {
        return prodId;
    }

    public void setProdId(Long prodId) {
        this.prodId = prodId;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Integer getNeedPrePaint() {
        return needPrePaint;
    }

    public void setNeedPrePaint(Integer needPrePaint) {
        this.needPrePaint = needPrePaint;
    }
}
