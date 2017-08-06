package com.khaojie.vo.product;

/**
 * Created by khaojie on 2017/7/23.
 */
public class ProductQueryItem {
    public String getProdName() {
        return prodName;
    }

    public void setProdName(String prodName) {
        this.prodName = prodName;
    }

    private String prodName;

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
}
