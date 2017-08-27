/**
 * Created by khaojie on 2017/7/23.
 */
/**
 * 构造器
 * @param para
 * @constructor
 */
function ProductCtl(productCtlParams){
    //Prod Name Query Str
    this.prodName_query = productCtlParams[0];
    this.btn_query = productCtlParams[1];
    this.prodTable_Query = productCtlParams[2];
    this.productMaintainTab = productCtlParams[3];
    this.productMaintainPanel = productCtlParams[4];
    this.prodMaintainProdId = productCtlParams[5];
    this.prodMaintainProdName = productCtlParams[6];
    this.prodMaintainVersion =productCtlParams[7];
    this.prodSearchTable = productCtlParams[8];
}
/**
 * 查询商品
 */
ProductCtl.prototype.queryProducts=function(){
    var instance = this;
    var queryObj={};
    var prodNameStr = getValById(instance.prodName_query);
    if(isNotEmpty(prodNameStr)){
        queryObj.prodName = prodNameStr;
    }
    queryObj.searchTable = instance.prodSearchTable;
    var queryBtn = $("#"+this.btn_query);
    $(queryBtn).button('loading');
    $.ajax({
        type : "POST",
        url : baseUrl+"product/queryProducts",
        data : queryObj,
        success : function(page) {
            $(queryBtn).button("reset");
            $("#"+instance.prodTable_Query).html(page);
        },
        error: function () {
            $(queryBtn).button("reset");
            MyUtil.alertInfo("System error, query failure!");
        }
    });
};
/**
 * 加载维护界面
 */
ProductCtl.prototype.loadMaintainPanel = function(prodId,btn){
    var instance = this;
    $(btn).button('loading');
    $.ajax({
        type : "POST",
        url : baseUrl+"product/loadMaintainInfo/"+prodId,
        data : {},
        success : function(html) {
            $(btn).button("reset");
            $("#"+instance.productMaintainPanel).empty().html(html);
            $("#"+instance.productMaintainTab+" a[href=\"#"+instance.productMaintainPanel+"\"]").trigger('click');
        },
        error: function () {
            $(btn).button("reset");
            MyUtil.alertInfo("System error,loading error!");
        }
    });
};
/**
 * 保存产品
 * @param btn
 */
ProductCtl.prototype.saveProd = function(btn){
    var instance = this;
    var obj ={
        id:$("#"+instance.prodMaintainProdId).val(),
        name:$("#"+instance.prodMaintainProdName).val(),
        version:$("#"+instance.prodMaintainVersion).val()
    };
    if(!isNotEmpty(obj.name)){
        MyUtil.alertInfo("Please provide product name");
        return false;
    }
    $(btn).button('loading');
    $.ajax({
        type : "POST",
        url : baseUrl+"product/save",
        data : obj,
        success : function(data) {
            if(data.result==1){
                $(btn).hide();
                MyUtil.alertInfo("saved!");
                instance.queryProducts();
            }else{
                MyUtil.alertInfo("saved error!"+data.errorMsg);
                $(btn).button("reset");
            }
        },
        error: function () {
            MyUtil.alertInfo("System error, cannot process save action!");
            $(btn).button("reset");
        }
    });
};
ProductCtl.prototype.loadFlowSettings = function(prodId,btn) {
    var instance = this;
    if(isNotEmpty(partCtl)){
        partCtl.queryParts(prodId);
        partCtl.mainProdId = prodId;
    }
    if(isNotEmpty(compCtl)){
        compCtl.queryComps(prodId);
        compCtl.mainProdId = prodId;
    }

};
