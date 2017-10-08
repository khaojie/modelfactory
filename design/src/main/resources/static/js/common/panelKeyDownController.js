if(typeof (panelKeyDownController) == 'undefined') {
    panelKeyDownController = {
        exeArray:new Array(),
        register:function(panelId,executor,keyCode){
            if(this.getDefined(panelId,keyCode)==null){
                this.exeArray.push({
                    panelId:panelId,
                    executor:executor,
                    keyCode:keyCode
                });
            }
        },
        getDefined:function(panelId,keyCode){
            var instance = this;
            var obj=null;
            $.each(this.exeArray,function(){
               if(this.panelId==panelId&&this.keyCode==keyCode){
                   obj = this;
                   return false;
               }
            });
            return obj;
        },
        executeIfDefined:function(keyCode){
            var obj = this.getDefined($("div.active.shortcut").attr('id'),keyCode);
            if(obj==null)
                return;
            eval(obj.executor);
        }
    }
}