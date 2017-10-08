/**
 * Created by khaojie on 2015/8/7.
 */
if(typeof (pageController) == 'undefined'){
    pageController={
        pageArray:new Array(),
        conflictGroup:new Array(),
        curDisplayPageId:'',
        init:function(){//初始化调用
           if(!this.hasExistTab('custDetailTab'))
                this.pageArray.push('custDetailTab');
        },
        loadMenuPage:function(url,pageId,isRootPage,menuName){//加载菜单的页面。
            jQuery.post(baseUrl+url,function(data) {
                pageController.pushPage(pageId,data,menuName);
            });
        },
        disableActiveContent:function(){//将当前界面取消激活，不显示
            $("#systemMainTab > li.active").removeClass("active");//移除现在active的TAB标签的active样式
            $("#divMainContent > div.active").removeClass("active").removeClass("in");//移除已激活的标签内容页的active样式
        },
        switchPage:function(curPageId){//切换页面
            for(var i=0;i<pageController.pageArray.length;i++){
                var pageId = pageController.pageArray[i];
                if(pageId!=curPageId) {
                    $("#"+pageId+" form[id='pageForm']").removeClass('active').addClass('inactive');
                }else{
                    $("#"+pageId+" form[id='pageForm']").removeClass('inactive').addClass('active');
                }
            }
            this.curDisplayPageId=curPageId;
        },
        pushPage : function(curPageId,content,menuName){//curPageId为当前被增加的页面
            var hasExistPage = this.hasExistTab(curPageId);
            if(!hasExistPage&&this.pageArray.length==7){
                alert('为了保证系统流畅，主界面不允许超过7个工作页!');
                return ;
            }
            if(!this.checkConflictPage(curPageId))
                return;
            this.disableActiveContent();
            if(hasExistPage){
                if(curPageId=='o2oExchange')
                    $("#"+curPageId).html(content).addClass("in").addClass("active");
                else
                    $("#"+curPageId).addClass("in").addClass("active");
                $("#systemMainTab a[href=\"#"+curPageId+"\"]").parent().addClass("active");
                try{
                    this.fireEvent('EXIST_'+curPageId);
                }catch(e){}
                return;
            }
            $("#systemMainTab").append("<li class=\"active\"><a onclick=\"pageController.switchPage('"+curPageId+"')\" href=\"#"+curPageId+"\" data-toggle=\"tab\">"+menuName+"" +
                "<span class=\"glyphicon glyphicon-remove\" style=\"padding-left: 10px;\" onclick=\"pageController.closePage('"+curPageId+"','"+menuName+"')\"></span>"+
                "</a></li>"); //添加新标签
            //加载新TAB页内容
            $("#divMainContent").append("<div class=\"tab-pane fade in active\" id=\""+curPageId+"\">").append("</div>");
            $("#"+curPageId).html(content);
            this.pageArray.push(curPageId);
            idRepeatController.detectRepeatIdForNewPage(curPageId);//侦测DOM ID是否重复。
            this.switchPage(curPageId);
        },
        closePage: function(curPageId,pageName){//关闭标签页
           if(!confirm("是否真的要关闭当前页:【"+pageName+"】"))
             return;
            try{
                this.fireEvent("CLOSE_"+curPageId);
            }catch(e){}
           $("#systemMainTab a[href=\"#"+curPageId+"\"]").parent().remove();
           $("#"+curPageId).remove();
           var pageArray = this.pageArray;
           var newArray = new Array();
           for(var i=0;i<pageArray.length;i++){
               if(pageArray[i]!=curPageId) {
                   newArray.push(pageArray[i]);
               }else{
                   this.disableActiveContent();
                   $("#"+ pageArray[i-1]).addClass("in").addClass("active");
                   $("#systemMainTab a[href=\"#"+ pageArray[i-1]+"\"]").parent().addClass("active");
                   this.switchPage(pageArray[i-1]);
               }
           }
           this.pageArray = newArray;
            idRepeatController.removePageId(curPageId);
            //pageController.doCallback("CLOSE",curPageId)
        },
        hasExistTab:function(curPageId){//是否已加载相同的page
            var hasExistPage = false;
            for(var i=0;i<this.pageArray.length;i++){
                if(this.pageArray[i]===curPageId){
                    hasExistPage = true;
                    break;
                }
            }
            return hasExistPage;
        },
        showOrHideMenu:function(action){//显示或隐藏菜单栏
            if(!isNotEmpty(action)){
                if($("#sidebar").is(":visible")){
                    $("#sidebar").hide();
                    $("#divMain").width( document.body.clientWidth - 25);
                }else{
                    $("#divMain").width( document.body.clientWidth - 205);
                    $("#sidebar").show();
                }
                return;
            }
            if(action==='hide'){
                if($("#sidebar").is(":visible")){
                    $("#sidebar").hide();
                    $("#divMain").width( document.body.clientWidth - 25);
                }
                return;
            }
            $("#divMain").width( document.body.clientWidth - 205 );
            $("#sidebar").show();
        },
        initDivMainWidth: function () {
            console.info(document.body.clientWidth);
            $("#divMain").width( document.body.clientWidth- 205 );
            $("#divContainerFluid").height( document.body.clientHeight - 50);
            if ($("#divContainerFluid").height() > $("#rootMenuNode").height()) {
                $("#sidebar").height($("#divContainerFluid").height());
            } else {
                $("#sidebar").height($("#rootMenuNode").height() + 50);
            }
            $("#divMainContent").height( $("#divContainerFluid").height() - 50);
            $("#urgent_notice").css("width", $("#nav_top_right").width() - $("#nav_top_left").width() - $("#nav_top_user_ul").width() - 60);
            console.info("height:"+ $("#divMainContent").height())
            console.info("width:"+$("#divMain").width());
        },

        //自定义事件,可处理窗口关闭,打开,已存在等;
        _listeners: {},
        registerEvent: function(type, fn){
            this._listeners[type] = [];
            if (typeof fn === "function") {
                this._listeners[type].push(fn);
            }
        },
        addEvent: function(type, fn) {
            if (typeof this._listeners[type] === "undefined") {
                this._listeners[type] = [];
            }
            if (typeof fn === "function") {
                this._listeners[type].push(fn);
            }
            return this;
        },
        fireEvent: function(type) {
            var arrayEvent = this._listeners[type];
            if (arrayEvent instanceof Array) {
                for (var i=0, length=arrayEvent.length; i<length; i+=1) {
                    if (typeof arrayEvent[i] === "function") {
                        arrayEvent[i]({
                            type: type
                        });
                    }
                }
            }
            return this;
        },
        removeEvent: function(type, fn) {
            var arrayEvent = this._listeners[type];
            if (typeof type === "string" && arrayEvent instanceof Array) {
                if (typeof fn === "function") {
                    for (var i=0, length=arrayEvent.length; i<length; i+=1){
                        if (arrayEvent[i] === fn){
                            this._listeners[type].splice(i, 1);
                            break;
                        }
                    }
                } else {
                    delete this._listeners[type];
                }
            }
            return this;
        },
        removeCommonModal:function(){
            if(jQuery("#orderModal").length>0) {
                jQuery("#orderModal").modal("hide");
                jQuery("#orderModal").remove();
            }
            if(jQuery("#retnoteModal").length>0) {
                jQuery("#retnoteModal").modal("hide");
                jQuery("#retnoteModal").remove();
            }
            if(jQuery("#compModal").length>0) {
                jQuery("#compModal").modal("hide");
                jQuery("#compModal").remove();
            }
            if(jQuery("#commonModal").length>0) {
                jQuery("#commonModal").modal("hide");
                jQuery("#commonModal").remove();
            }
            if(jQuery("#agentsSelectModal").length>0) {
                jQuery("#agentsSelectModal").modal("hide");
                jQuery("#agentsSelectModal").remove();
            }

        },
        checkConflictPage:function(pageId){//冲突页检查
            var group = this.getConflictPageGroup(pageId);
            if(group.length<=0)
                return true;
            var bingo=0;
            for(var i=0;i<group.length;i++){
                for(var j=0;j<this.pageArray.length;j++){
                    var pageIdj = this.pageArray[j];
                    if(pageIdj==group[i]) {
                        bingo++;
                    }
                }
            }
            if(bingo>0){
                alert('当前功能存在冲突页，无法加载~,等以后有空了，我们会改的。');
                return false;
            }

            return true;
        },
        initConflictPageConfig:function(){//冲突页定义
            this.conflictGroup.push({name:'amenu_B2CAF_page',groups:['amenu_B2CAF1_page','amenu_C1_page','amenu_21_page']});
            this.conflictGroup.push({name:'amenu_B2CAF1_page',groups:['amenu_B2CAF_page','amenu_C1_page','amenu_21_page']});
            this.conflictGroup.push({name:'amenu_C1_page',groups:['amenu_B2CAF1_page','amenu_B2CAF_page','amenu_21_page']});
            this.conflictGroup.push({name:'amenu_21_page',groups:['amenu_B2CAF_page','amenu_B2CAF1_page','amenu_C1_page']});
            this.conflictGroup.push({name:'amenu_22_page',groups:['amenu_C1_page','amenu_B2CAF_page','amenu_B2CAF1_page']});
        },
        getConflictPageGroup:function(key){
            var group =new Array();
            $.each(this.conflictGroup,function(){
                if(this.name==key){
                    group = this.groups;
                    return false;
                }
            });
            return group;
        }
    };
    pageController.initConflictPageConfig();
}