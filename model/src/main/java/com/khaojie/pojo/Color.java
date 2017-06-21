package com.khaojie.pojo;

import javax.persistence.*;

/**
 * Created by khaojie on 2017/6/19
 * 漆色基础类.
 */
@Entity
@Table(name = "T_COLOR", catalog = "model_factory")
public class Color {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SID")
    private Long id;

    @Column(name = "COLOR_NAME", length = 20, nullable = false)
    private String colorName;

    @Column(name = "COLOR_CODE", length = 10, nullable = false)
    private String code;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getColorName() {
        return colorName;
    }

    public void setColorName(String colorName) {
        this.colorName = colorName;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
