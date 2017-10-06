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

    this.colorBranchSelect1 = colorCtlParams[12];
    this.colorMaintainColorNos = colorCtlParams[13]
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
ColorCtl.prototype.saveColor = function(btn){
    var instance = this;
    var obj ={
        id:$("#"+instance.colorMaintainColorId).val(),
        colorName:$("#"+instance.colorMaintainColorName).val(),
        code:$("#"+instance.colorMaintainColorCode).val(),
        mixFormula:$("#"+instance.colorMaintainColorMixFormula).val(),
        branch:$("#"+instance.colorMaintainColorBranchSelect).val()
    };

    var array = new Array();
    array.push(obj);
    instance.submitColors(this,btn,array,0);
};

ColorCtl.prototype.saveColors = function(btn){
    var instance = this;
    var array = new Array();
    var values = $("#"+instance.colorMaintainColorNos).val();
    if(!isNotEmpty(values)){
        MyUtil.alertInfo("Please input color nos!!!");
        return;
    }
    $($("#"+instance.colorMaintainColorNos).val().split(",")).each(function(index, code){
        var obj ={
            id:0,
            colorName:'',
            code:code,
            mixFormula:'',
            branch:$("#"+instance.colorBranchSelect1).val()
        };
        array.push(obj);
    });
    instance.submitColors(this,btn,array,1);
};
ColorCtl.prototype.submitColors = function(instance,btn,array,isbatch){
    $(btn).button('loading');
    $.ajax({
        type : "POST",
        url : baseUrl+"color/saveColors",
        data : {data:JSON.stringify(array)},
        success : function(data) {
            if(data.result==1){
                if(isbatch==0){
                    $(btn).hide();
                }else{
                    $(btn).button("reset");
                    $("#"+instance.colorMaintainColorNos).val('');
                }
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
