/**
 * Created by kanghj on 2016/8/22.
 */
/**
 * 构造器-针对伪分页，正常数据库分页，另外再加一个构造器
 * @param dataList 数据集
 * @constructor
 */
function PagingWidget (fakePaging,widgetId,posNumArr,controller) {
    //总数据集
    this.fakePaging = fakePaging;
    this.posNumArr = posNumArr;//页号占位数,
    this.widgetId = widgetId;
    this.controller = controller;
}
PagingWidget.prototype.highLightPageNum = function(pageNum){
    var span = $("#"+this.widgetId+" span[pMark='posNumArr']");
    var pageMark = span.find("a[posNum='"+pageNum+"']");
    var startPage,endPage;
    if(pageNum<=this.posNumArr){
        startPage=1;
        endPage = this.posNumArr;
    }else {
        startPage = pageNum-(this.posNumArr-1);
        endPage = pageNum;
    }
    span.find("a:visible").hide();
    for(var i=startPage;i<=endPage;i++){
        span.find("a[posNum='"+i+"']").show();
    }
    pageMark.show();
    span.find("a.pagingElementLight").removeClass('pagingElementLight').addClass('pagingElement');
    pageMark.removeClass('pagingElement').addClass('pagingElementLight');
};
PagingWidget.prototype.doFirst = function(){
    this.fakePaging.setStart(0);
    this.highLightPageNum(1);
    this.interactMotion();
    this.controller.renderPageInfo(this.fakePaging.getDisplayResult());
};
PagingWidget.prototype.doPrev = function(){
    this.fakePaging.setStart(this.fakePaging.getPreviousPageStart());
    this.highLightPageNum(this.fakePaging.getPageNo());
    this.interactMotion();
    this.controller.renderPageInfo(this.fakePaging.getDisplayResult());
};
PagingWidget.prototype.doNext = function(){
    this.fakePaging.setStart(this.fakePaging.getNextPageStart());
    this.highLightPageNum(this.fakePaging.getPageNo());
    this.interactMotion();
    this.controller.renderPageInfo(this.fakePaging.getDisplayResult());
};
PagingWidget.prototype.doLast = function(){
    this.fakePaging.setStart(this.fakePaging.getLastPageStart());
    this.highLightPageNum(this.fakePaging.getPageNo());
    this.interactMotion();
    this.controller.renderPageInfo(this.fakePaging.getDisplayResult());
};
PagingWidget.prototype.doSpecPage = function(curPageNum){
    var oldPageNo = this.fakePaging.getPageNo();
    if(oldPageNo==curPageNum)
        return;
    this.fakePaging.setStart(this.fakePaging.getSpecPageStart(curPageNum));
    this.highLightPageNum(curPageNum);
    this.interactMotion();
    this.controller.renderPageInfo(this.fakePaging.getDisplayResult());
};
PagingWidget.prototype.bindEvent = function(curObj){
    if(this.posNumArr>=this.fakePaging.getPageTotalNo()){
        this.posNumArr = this.fakePaging.getPageTotalNo();
    }
    var span = $("#"+this.widgetId+" span[pMark='posNumArr']");
    span.empty();
    for(var i=0;i<this.fakePaging.getPageTotalNo();i++){
        if(i<this.posNumArr)
            span.append("<a posNum='"+(i+1)+"' class=\"pagingElement\" href=\"#\">"+(i+1)+"</a>");
        else
            span.append("<a posNum='"+(i+1)+"' class=\"pagingElement\" href=\"#\" style='display: none;'>"+(i+1)+"</a>");
        span.find("a[posNum]:last").bind("click",function(){
            curObj.doSpecPage($(this).attr('posNum'));
        });
    }
    $("#"+this.widgetId+" a[pmark='first']").unbind("click").bind("click", function() {
        curObj.doFirst();
    });
    $("#"+this.widgetId+" a[pmark='prev']").unbind("click").bind("click", function() {
        curObj.doPrev();
    });
    $("#"+this.widgetId+" a[pmark='next']").unbind("click").bind("click", function() {
        curObj.doNext();
    });
    $("#"+this.widgetId+" a[pmark='last']").unbind("click").bind("click", function() {
        curObj.doLast();
    });
    $("#"+this.widgetId+" a[pmark='first']").trigger("click");
};
PagingWidget.prototype.interactMotion = function(){
    if(this.fakePaging.getIsFirstPage()){
        $("#"+this.widgetId+" a[pmark='first']").hide();
        $("#"+this.widgetId+" a[pmark='prev']").hide();
    }else {
        $("#"+this.widgetId+" a[pmark='first']").show();
        $("#"+this.widgetId+" a[pmark='prev']").show();
    }
    if(this.fakePaging.getIsLastPage()){
        $("#"+this.widgetId+" a[pmark='next']").hide();
        $("#"+this.widgetId+" a[pmark='last']").hide();
    }else{
        $("#"+this.widgetId+" a[pmark='next']").show();
        $("#"+this.widgetId+" a[pmark='last']").show();
    }
};
PagingWidget.prototype.reset = function(){
    this.bindEvent(this);
    this.interactMotion();
};

