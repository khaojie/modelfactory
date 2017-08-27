/**
 * 构造器
 * @param para
 * @constructor
 */
if(typeof (paintSchemeCtl)=='undefined'){
    paintSchemeCtl={
        loadDetail:function(prodId,btn){
            $(btn).button('loading');
            $("#paintSchemeParameter").val(JSON.stringify({prodId:prodId}));
            $(btn).button('loading').delay(20000).queue(function() {
                $(this).button('reset').dequeue();
            });
            isFormSubmit = true;
            $("#paintSchemeForm").attr("action", baseUrl+"paintscheme/loadDetail");
            $("#paintSchemeForm").submit();
        },
    };
}