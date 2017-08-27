$(document).ready(function() {
    $(".mandatory").modal({
        backdrop: 'static',
        keyboard: false,
        show:false
    });
});
var isFormSubmit = false;
window.onunload = function(){
    //开发提示信息....

};
window.onbeforeunload = function (event) {
    if(isFormSubmit==true){
        isFormSubmit = false;
        return;
    }
    return "你可能离开当前页面";
};