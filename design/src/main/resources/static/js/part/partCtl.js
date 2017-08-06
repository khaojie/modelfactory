/**
 * 构造器
 * @param para
 * @constructor
 */
function PartCtl(partCtlParams){
    this.partMaintainTab = partCtlParams[0];
    this.partMaintainPanel = partCtlParams[1];
    this.partListTables = partCtlParams[2];
    this.partMaintainPartNos = partCtlParams[3];
    this.partMaintainProdId = partCtlParams[4];
    this.partMaintainPartId = partCtlParams[5];
    this.partMaintainBoardNo = partCtlParams[6];
    this.partMaintainPartNumber = partCtlParams[7];
    this.partMaintainPartName = partCtlParams[8];
    this.partMaintainPartColors = partCtlParams[9];
    this.partMaintainNote = partCtlParams[10];
}
/**
 * 查询零件
 */
PartCtl.prototype.queryParts=function(prodId){
    var instance = this;
    var queryObj={};
    if(isNotEmpty(prodId))
        queryObj.prodId = prodId;
    $.ajax({
        type : "POST",
        url : baseUrl+"part/queryParts",
        data : queryObj,
        success : function(html) {
            $("#"+instance.partListTables).empty().html(html);
        },
        error: function () {
            MyUtil.alertInfo("System error,loading part error!");
        }
    });
};
PartCtl.prototype.quickSave=function(btn){
    var instance = this;
    var data ={};
    data.prodId = instance.mainProdId;
    data.rangeStr = $("#"+instance.partMaintainPartNos).val();
    if(!isNotEmpty(data.rangeStr)){
        MyUtil.alertInfo("Please provide Part Nos");
        return false;
    }
    $(btn).button('loading');
    $.ajax({
        type : "POST",
        url : baseUrl+"part/save",
        data : data,
        success : function(data) {
            if(data.result==1){
                $(btn).hide();
                MyUtil.alertInfo("saved!");
                instance.queryParts(instance.mainProdId);
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

PartCtl.prototype.loadMaintainPanel = function(partId,prodId,btn){
    var instance = this;
    $(btn).button('loading');
    $.ajax({
        type : "POST",
        url : baseUrl+"part/loadMaintainInfo",
        data : {
            partId:partId,
            prodId:prodId
        },
        success : function(html) {
            $(btn).button("reset");
            $("#"+instance.partMaintainPanel).empty().html(html);
            $("#"+instance.partMaintainTab+" a[href=\"#"+instance.partMaintainPanel+"\"]").trigger('click');
        },
        error: function () {
            $(btn).button("reset");
            MyUtil.alertInfo("System error,loading error!");
        }
    });
};
PartCtl.prototype.save=function(btn){
    var instance = this;
    var obj ={
        part:{
            prodId: getValById(instance.partMaintainProdId),
            id: getValById(instance.partMaintainPartId),
            boardNo:getValById(instance.partMaintainBoardNo),
            number:getValById(instance.partMaintainPartNumber),
            name:getValById(instance.partMaintainPartName),
            note:getValById(instance.partMaintainNote)
        },
        colors: getValById(instance.partMaintainPartColors)
    };
    $(btn).button('loading');
    $.ajax({
        type : "POST",
        url : baseUrl+"part/save",
        data : {data:JSON.stringify(obj)},
        success : function(data) {
            if(data.result==1){
                $(btn).hide();
                MyUtil.alertInfo("saved!");
                instance.queryParts(obj.part.prodId);
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