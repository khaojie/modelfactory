package com.khaojie.vo.paintscheme.download;

import java.io.Serializable;

public class PartVo implements Serializable {
    private String partNo;
    private Integer isMultiColor;

    public PartVo(){}

    public PartVo(String partNo){
        this.partNo=partNo;
    }

    public String getPartNo() {
        return partNo;
    }

    public void setPartNo(String partNo) {
        this.partNo = partNo;
    }

    public Integer getIsMultiColor() {
        return isMultiColor;
    }

    public void setIsMultiColor(Integer isMultiColor) {
        this.isMultiColor = isMultiColor;
    }
}
