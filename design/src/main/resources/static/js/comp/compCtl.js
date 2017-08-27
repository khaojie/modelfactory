/**
 * 构造器
 * @param para
 * @constructor
 */
function CompCtl(comtCtlParams){
    this.compMaintainTab = comtCtlParams[0];
    this.compMaintainPanel = comtCtlParams[1];
    this.compListTables = comtCtlParams[2];
    this.compMaintainCompId= comtCtlParams[3];
    this.compMaintainProdId= comtCtlParams[4];
    this.compMaintainCompName= comtCtlParams[5];
    this.compMaintainSeq= comtCtlParams[6];
    this.compMaintainParts= comtCtlParams[7];
    this.compMaintainNote= comtCtlParams[8];
}
/**
 * 查询零件
 */
CompCtl.prototype.queryComps=function(prodId){
    var instance = this;
    var queryObj={};
    if(isNotEmpty(prodId))
        queryObj.prodId = prodId;
    $.ajax({
        type : "POST",
        url : baseUrl+"comp/queryComps",
        data : queryObj,
        success : function(html) {
            $("#"+instance.compListTables).empty().html(html);
        },
        error: function () {
            MyUtil.alertInfo("System error,loading components error!");
        }
    });
};

CompCtl.prototype.loadMaintainPanel = function(compId,prodId,btn){
    var instance = this;
    $(btn).button('loading');
    $.ajax({
        type : "POST",
        url : baseUrl+"comp/loadMaintainInfo",
        data : {
            compId:compId,
            prodId:prodId
        },
        success : function(html) {
            $(btn).button("reset");
            $("#"+instance.compMaintainPanel).empty().html(html);
            $("#"+instance.compMaintainTab+" a[href=\"#"+instance.compMaintainPanel+"\"]").trigger('click');
        },
        error: function () {
            $(btn).button("reset");
            MyUtil.alertInfo("System error,loading error!");
        }
    });
};
CompCtl.prototype.save=function(btn){
    var instance = this;
    var obj ={
        comp:{
            prodId: getValById(instance.compMaintainProdId),
            id: getValById(instance.compMaintainCompId),
            seq:getValById(instance.compMaintainSeq),
            compName:getValById(instance.compMaintainCompName),
            note:getValById(instance.compMaintainNote)
        },
        parts: getValById(instance.compMaintainParts)
    };
    $(btn).button('loading');
    $.ajax({
        type : "POST",
        url : baseUrl+"comp/save",
        data : {data:JSON.stringify(obj)},
        success : function(data) {
            if(data.result==1){
                $(btn).hide();
                MyUtil.alertInfo("saved!");
                instance.queryComps(obj.comp.prodId);
            }else{
                MyUtil.alertInfo("saved error! "+data.errorMsg);
                $(btn).button("reset");
            }
        },
        error: function () {
            MyUtil.alertInfo("System error, cannot process save action!");
            $(btn).button("reset");
        }
    });
};