function ColorCtl(colorCtlParams){
    //Prod Name Query Str
    this.colorBranchSelect = colorCtlParams[0];
    this.colorNameTxt = colorCtlParams[1];
    this.colorNumberTxt = colorCtlParams[2];
    this.colorQuerybtn = colorCtlParams[3];
    this.colorListTables = colorCtlParams[4];
    this.colorMaintainPanel = colorCtlParams[5];
    this.colorMaintainPanelTab = colorCtlParams[6];

    this.colorMaintainColorId = colorCtlParams[7];
    this.colorMaintainColorName = colorCtlParams[8];
    this.colorMaintainColorCode = colorCtlParams[9];
    this.colorMaintainColorMixFormula = colorCtlParams[10];
    this.colorMaintainColorBranchSelect = colorCtlParams[11];
}
/**
 * 查询商品
 */
ColorCtl.prototype.queryColors=function(){
    var instance = this;
    var queryObj={};
    var colorBranchSelect = getValById(instance.colorBranchSelect);
    if(isNotEmpty(colorBranchSelect)){
        queryObj.colorBranch = colorBranchSelect;
    }

    var colorNameTxt = getValById(instance.colorNameTxt);
    if(isNotEmpty(colorNameTxt)){
        queryObj.colorName = colorNameTxt;
    }

    var colorNumber = getValById(instance.colorNumberTxt);
    if(isNotEmpty(colorNumber)){
        queryObj.colorNumber = colorNumber;
    }

    var queryBtn = $("#"+this.colorQuerybtn);
    $(queryBtn).button('loading');
    $.ajax({
        type : "POST",
        url : baseUrl+"color/queryColors",
        data : queryObj,
        success : function(page) {
            $(queryBtn).button("reset");
            $("#"+instance.colorListTables).html(page);
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
ColorCtl.prototype.loadMaintainPanel = function(colorId,btn){
    var instance = this;
    $(btn).button('loading');
    $.ajax({
        type : "POST",
        url : baseUrl+"color/loadMaintainInfo/"+colorId,
        data : {},
        success : function(html) {
            $(btn).button("reset");
            $("#"+instance.colorMaintainPanel).empty().html(html);
            $("#"+instance.colorMaintainPanelTab).trigger('click');
        },
        error: function () {
            $(btn).button("reset");
            MyUtil.alertInfo("System error,loading error!");
        }
    });
};
/**
 * 保存功能
 * @param btn
 */
ColorCtl.prototype.saveColors = function(btn){
    var instance = this;

    var obj ={
        id:$("#"+instance.colorMaintainColorId).val(),
        colorName:$("#"+instance.colorMaintainColorName).val(),
        code:$("#"+instance.colorMaintainColorCode).val(),
        mixFormula:$("#"+instance.colorMaintainColorMixFormula).val(),
        branch:$("#"+instance.colorMaintainColorBranchSelect).val()
    };
    /*if(!isNotEmpty(obj.colorName)){
        MyUtil.alertInfo("Please provide product name");
        return false;
    }*/

    var array = new Array();
    array.push(obj);
    $(btn).button('loading');
    $.ajax({
        type : "POST",
        url : baseUrl+"color/saveColors",
        data : {data:JSON.stringify(array)},
        success : function(data) {
            if(data.result==1){
                $(btn).hide();
                MyUtil.alertInfo("saved!");
                instance.queryColors();
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
