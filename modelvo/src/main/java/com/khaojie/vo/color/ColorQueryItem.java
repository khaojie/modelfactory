package com.khaojie.vo.color;

public class ColorQueryItem {

    private Integer colorBranch;

    private String colorName;

    private String colorNumber;

    private Integer curPage;

    private Integer pageSize;

    public Integer getCurPage() {
        return curPage;
    }

    public void setCurPage(Integer curPage) {
        this.curPage = curPage;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Integer getColorBranch() {
        return colorBranch;
    }

    public void setColorBranch(Integer colorBranch) {
        this.colorBranch = colorBranch;
    }

    public String getColorName() {
        return colorName;
    }

    public void setColorName(String colorName) {
        this.colorName = colorName;
    }

    public String getColorNumber() {
        return colorNumber;
    }

    public void setColorNumber(String colorNumber) {
        this.colorNumber = colorNumber;
    }
}
