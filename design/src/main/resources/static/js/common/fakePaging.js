/**
 * Created by kanghj on 2016/8/19.
 * 伪分页，仅对内存集合数据进行分页。
 * 与数据库分页数据无关。
 * 除getDisplayResult方法重写以外，其他的代码均来自于
 * http://bbs.csdn.net/topics/390687502?page=1
 * 3#
 */
/**
 * 构造器
 * @param dataList 数据集
 * @constructor
 */
function FakePaging (result,startIndex,pageSize) {
    //总数据集
    this.result = result;
    //分页后的数据集
    this.displayResult = new Array();
    /**起始查询索引*/
    this.start=startIndex;
    /**每页显示多少*/
    this.pageSize = pageSize;
    /**当前页号*/
    this.pageNo=0;
    /**总页数*/
    this.pageTotalNo=0;
    /**总条数*/
    this.totalCount=0;
    /**是否是第一页*/
    this.isFirstPage=true;
    /**是否是最后一页*/
    this.isLastPage=false;
    /**上一页起始索引*/
    this.previousPageStart=0;
    /**下一页起始索引*/
    this.nextPageStart=0;
    /**最后一页起始索引*/
    this.lastPageStart=0;
}

FakePaging.prototype.getResult = function(){
    return this.result;
};

FakePaging.prototype.setResult = function(result) {
    this.result = result;
};

/**
 * 获取当前起始索引(默认从0开始)
 * @return
 */
FakePaging.prototype.getStart = function(){
    return this.start;
};

/**
 * 设置起始索引值
 * @param start
 */
FakePaging.prototype.setStart = function(start){
    this.start = start;
};

/**
 * 获取每页显示大小
 * @return
 */
FakePaging.prototype.getPageSize = function() {
    return this.pageSize;
};

/**
 * 设置每页显示条数
 * @param pageSize
 */
FakePaging.prototype.setPageSize = function(pageSize) {
    this.pageSize = pageSize;
};

/**
 * 获取当前页号
 * @return
 */
FakePaging.prototype.getPageNo = function(){
    return parseInt((this.start / this.pageSize) + 1);
};

/**
 * 获取总页数
 * @return
 */
FakePaging.prototype.getPageTotalNo = function(){
    return parseInt(this.getTotalCount() % this.pageSize == 0 ? this.getTotalCount() / this.pageSize : this.getTotalCount() / this.pageSize + 1);
};

/**
 * 获取总条数
 * @return
 */
FakePaging.prototype.getTotalCount = function(){
    return this.getResult().length;
};

/**
 * 判断是否是最后一页
 * @return
 */
FakePaging.prototype.getIsLastPage = function(){
    var expectedSize = this.getPageNo() * this.pageSize;
    this.isLastPage = expectedSize >= this.getTotalCount() && expectedSize - this.pageSize <= this.getTotalCount() ;
    return this.isLastPage;
};

/**
 * 判断是否是第一页
 * @return
 */
FakePaging.prototype.getIsFirstPage = function(){
    return this.getPageNo() == 1;
};

/**
 * 获取上一页起始索引
 * @return
 */
FakePaging.prototype.getPreviousPageStart = function(){
    return this.start - this.pageSize;
};

/**
 * 获取下一页起始索引
 */
FakePaging.prototype.getNextPageStart = function(){
    return this.start + this.pageSize;
};

/**
 * 获取最后一页起始索引
 */
FakePaging.prototype.getLastPageStart = function(){
    this.lastPageStart = (this.getPageTotalNo() - 1) * this.pageSize;
    return this.lastPageStart;
};

/**
 * 获取特定页起始索引
 */
FakePaging.prototype.getSpecPageStart = function(pageNum){
    return (pageNum - 1) * this.pageSize;
};

/**
 * 获取实际需要显示的结果集
 * @return
 */
FakePaging.prototype.getDisplayResult = function(){
    var limit =0;
    if(this.getIsLastPage()) {
        var expectedSize = this.getPageNo() * this.pageSize;
        limit = this.getPageSize() - (expectedSize - this.getTotalCount());
    } else {
        limit = this.pageSize;
    }
    this.displayResult = new Array();
    var index=0;
    for(var i=this.start;i<this.result.length;i++){
        this.displayResult.push(this.result[i]);
        index++;
        if(index>=limit)break;
    }
    return this.displayResult;
};