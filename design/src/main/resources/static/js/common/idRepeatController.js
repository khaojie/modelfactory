/**
 * Created by khaojie on 2015/11/24.
 */
if(typeof (idRepeatController) == 'undefined'){
    idRepeatController = {
       idList:new Array(),
       strucIds:new Array(),//只作存储，与关闭标签时取出来清除idList的数据
       blackList:new Array(),
       initRootPage:function(){ // 初始化得到首次业务操作前已经加载的DOM,对已经加载的DOM ID进行重复检查
           $.each($("[id]"),function(){
               var newId = $(this).attr('id');
               if(idRepeatController.isRepeat(newId,idRepeatController.idList))
                   idRepeatController.blackList.push(newId);
               else
                   idRepeatController.idList.push(newId);
           });
           this.showRepeatIds();
       },
       isRepeat:function(suspectId,existList){//判断suspectId是否在existList已经存在
           var isMatched = false;
           for(var i = 0;i < existList.length;i++){
               var oldId = existList[i];
               if(suspectId==oldId){
                   isMatched = true;
                   break;
               }
           }
           return isMatched;
       } ,
       removePageId : function(pageId){//删除标签页时调用

            var tempIds = new Array();
            tempIds.push(pageId);
            for(var i=0;i<idRepeatController.strucIds.length;i++){
                var pageObj = idRepeatController.strucIds[i];
                if(pageObj.pageId==pageId){
                    $.each(pageObj.subList,function(){
                        tempIds.push(this);
                    });
                    idRepeatController.strucIds.splice(i,1);
                    break;
                }
            }
            var newList = new Array();
            for(var i=0;i<idRepeatController.idList.length;i++){
                var curId = idRepeatController.idList[i];
                var isMatch = false;
                for(var j=0;j<tempIds.length;j++){
                    var delId = tempIds[j];
                    if(delId == curId){
                        isMatch = true;
                        break;
                    }
                }
                if(!isMatch)
                    newList.push(curId);
            }
            idRepeatController.idList = newList;
       },
       detectPageRepeatId : function(pageId,subIds){//对新增的页面，进行ID重复检查
           //pageId重复判断
           if(idRepeatController.isRepeat(pageId,idRepeatController.idList))
               idRepeatController.blackList.push(pageId);
           else
               idRepeatController.idList.push(pageId);
           console.info(subIds);
           console.info("***********************************************");
           console.info(idRepeatController.idList);
           //业务PAGE子DOM ID重复判断
           for(var i=0;i<subIds.length;i++){
               var id = subIds[i];
               if(idRepeatController.isRepeat(id,idRepeatController.idList))
                   idRepeatController.blackList.push(id);
               else
                   idRepeatController.idList.push(id);
           }
           var pageObj={
               "pageId":pageId,
               "subList":subIds
           };
          this.strucIds.push(pageObj);
       },
       detectRepeatIdForNewPage:function(pageId){//侦测重复的ID

           var idList1 = new Array();
           $.each($("#"+pageId+" [id]"),function(){
               idList1.push($(this).attr('id'));
           });
           this.detectPageRepeatId(pageId,idList1);
           this.showRepeatIds();
       },
       showRepeatIds:function(){
           if(this.blackList.length<1) return;
           var str = "";
           $.each(this.blackList,function(){
               str=str+","+this;
           });
           alert("ID重复:"+str);
       }
    }
}