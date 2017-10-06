package com.khaojie.vo.comp;

public class CompQueryItem {
    private Integer curPage;

    private Integer pageSize;

    public Long getProdId() {
        return prodId;
    }

    public void setProdId(Long prodId) {
        this.prodId = prodId;
    }

    private Long prodId;
    public Integer getCurPage() {
        if(curPage==null)
            curPage=1;
        return curPage;
    }

    public void setCurPage(Integer curPage) {
        this.curPage = curPage;
    }

    public Integer getPageSize() {
        if(pageSize==null)
            pageSize=10;
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }
}
