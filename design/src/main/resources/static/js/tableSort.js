/**
 * Created by qupei on 2015/11/24.
 *
 * agr1：th 为th对象
 * arg2: type 比较对象的类型，默认为string，可传入number
 *
 *
 */
(function($){
    //插件
    $.extend($,{
        //命名空间
        sortTable:{
            sort:function(tableId, Idx, dataType){
                //var Idx = $(th).index()
                //var table = th.closest('table');
                var table = document.getElementById(tableId);
                var tbody = table.tBodies[0];

                var tr = tbody.rows;

                var trValue = new Array();
                for (var i=0; i<tr.length; i++ ) {
                    trValue[i] = tr[i];  //将表格中各行的信息存储在新建的数组中
                }

                if (tbody.sortCol == Idx) {
                    trValue.reverse(); //如果该列已经进行排序过了，则直接对其反序排列
                } else {
                    //trValue.sort(compareTrs(Idx));  //进行排序
                    trValue.sort(function(tr1, tr2){
                        var value1 = tr1.cells[Idx].innerHTML;
                        var value2 = tr2.cells[Idx].innerHTML;
                        //比较数字
                        if (dataType == 'number') {
                            try{
                                return Number(value1) - Number(value2)
                            } catch(e) {
                                return value1.localeCompare(value2);
                            }
                        }
                        return value1.localeCompare(value2);
                    });
                }

                var fragment = document.createDocumentFragment();  //新建一个代码片段，用于保存排序后的结果
                for (var i=0; i<trValue.length; i++ ) {
                    fragment.appendChild(trValue[i]);
                }

                tbody.appendChild(fragment); //将排序的结果替换掉之前的值
                tbody.sortCol = Idx;
            },
            init : function(tableId){
                $('#'+tableId).find($('th[data-sort="true"][data-sorted!="1"]'))
                    .bind('click',function() {
                        $.sortTable.sort($(this).closest('table').prop('id'), $(this).index(),($(this).attr('data-sort-type') || 'string')); })
                    .css('cursor','pointer').append('<span class="caret" style="border-bottom:" title="点击排序"></span>')
                    .each(function(index,item){
                        $(item).attr("data-sorted","1");  //防止二次加载
                    });
            }
        }
    });
})(jQuery);