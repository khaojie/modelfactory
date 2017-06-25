
/** ${baseUrl}**/
var PROD_baseURL=document.getElementById("prodjs").getAttribute("data");

/**
 * update product of sales info 
 * @author ZacTang
 */
function  upStat(obj,sid,state){
	jQuery.ajax({
		type : "POST",
		url : PROD_baseURL+"product/updPSStat",//"${baseUrl}product/updPSStat",
		data : {
				"sid":sid,
				"stat":state,
				"type":1    //type state
				},
			//"sid="+sid+"&stat="+state ,
		success : function(msg) {
			if(msg=="1"){
				changeCont(obj,sid,state);
			}else{
				alert("失败");
			}
			
			
		}
	});   
}

/**
 * update hasProd
 * @param obj
 * @param sid
 * @param state(hasProd)
 */
function updHasProd(obj,sid,state){
	jQuery.ajax({
		type : "POST",
		url : PROD_baseURL+"product/updPSStat",//"${baseUrl}product/updPSStat",
		data : {
				"sid":sid,
				"stat":state,
				"type":2    //type state
				},
		success : function(msg) {
			if(msg=="1"){
				hasPord(obj,sid,state)
			}else{
				alert("失败");
			}
			
			
		}
	});   
}

/**
 * change style
 * @author ZacTang
 * @param obj
 * @param sid
 * @param state
 */
function changeCont(obj,sid,state){
	var linc6=$(obj).parent().parent().children("td:eq(7)");//state
	var linc8=$(obj).parent().parent().children("td:eq(15)").find("a").eq(1);//state button
	
	if(state==1){
		linc6.html('<span class="label label-success"> 在售 </span>');
		
		linc8.attr("class","btn btn-warning btn-xs");
		linc8.attr("onclick","upStat(this,"+sid+",2);");
		linc8.html('<span class="glyphicon glyphicon-arrow-down"></span>&nbsp;下架');
	
	}else{
		linc6.html('<span class="label label-danger"> 停售 </span>');
		
		linc8.attr("class","btn btn-success btn-xs");
		linc8.attr("onclick","upStat(this,"+sid+",1);");
		linc8.html('<span class="glyphicon glyphicon-arrow-up"></span>&nbsp;上架');
	}
}

function hasPord(obj,sid,hasProd){
	var linHasProdTXT=$(obj).parent().parent().children("td:eq(11)");//state
	var lincHasProd=$(obj).parent().parent().children("td:eq(15)").find("a").eq(2);//hasProd button
	if("undefined"==typeof(hasProd)||null==hasProd){
		hasProd=-1;
	}
	if(hasProd==2){
		linHasProdTXT.html('否');
		
		lincHasProd.attr("class","btn btn-success btn-xs");
		lincHasProd.attr("onclick","updHasProd(this,"+sid+",1);");
		lincHasProd.html('<span class="glyphicon glyphicon-arrow-up"></span>&nbsp;有货');
	}else if(hasProd==1){
		linHasProdTXT.html('是');
		
		lincHasProd.attr("class","btn btn-warning btn-xs");
		lincHasProd.attr("onclick","updHasProd(this,"+sid+",2);");
		lincHasProd.html('<span class="glyphicon glyphicon-arrow-down"></span>&nbsp;缺货');
	}
}


//select ALL data 
var checkStat=0;
function selectAll(obj){
	//$("#content tr input:checkbox").attr("checked","checked");
	
	$("input[name='chPid']").each(function(){
    	if(checkStat==0){
    		this.checked = true;
    	}else{
    		this.checked = false;
    	}
	});
	
	if(checkStat==0){
		checkStat=1;
	}else{
		checkStat=0;
	}
}
/**
 * delete  one row data
 * @param obj
 */
function deleteItem(obj){
	$(obj).parent().parent().remove();
}

/**
 * search product sales
 */
function searchProdSale(){
	$("#sercur").val(1);
	var param = jQuery("#serchfrom").serialize();
	var url=jQuery("#serchfrom").attr("action");
	$("#queryButton").button("loading");
	jQuery.ajax({
		type : "POST",
		url : url,
		data : param,
		success : function(msg) {
			$("#queryButton").button("reset");
			jQuery("#psContent").html(msg);
		}
	}); 
	
	
}
/**
 * 编辑预处理
 * @param sId
 * @param pcode
 * @param pName
 * @param sPrice
 * @param stan
 * @param rebateAmt
 * @param innerPacking
 */
function updatePre(sId,pcode,pName,sPrice,stan,rebateAmt,innerPacking,mtSelf){
	$("#sid").val(sId);
	$("#prodCode").val(pcode);
	$("#prodName").val(pName);
	$("#prodSpec").val(stan);
	$("#salePrice").val(sPrice);
	$("#rebateAmt").val(rebateAmt);
	$("#innerPacking").val(innerPacking);
	if(mtSelf == 1){
		jQuery("#mtSelf").attr("checked","checked");
	}else{
		jQuery("#mtSelf").removeAttr("checked");
	}
	
}

/**
 * 编辑 提交
 */
function update(){
	var arr = jQuery("#uProdSale").find("input[name]");
	if (jQuery("#mtSelf").is(":checked")){
		jQuery("#mtSelf").next().val("1");
	}else{
		jQuery("#mtSelf").next().val("0");
	}
	var pm = "";
	for ( var i = 0; i < arr.length; i++) {
		pm += jQuery(arr[i]).attr("name") + "=" + jQuery(arr[i]).val();
		if (i < arr.length - 1) {
			pm += "&";
		}
	}
	console.log("jQuery(#rebateAmt).val() " +jQuery("#rebateAmt").val());
	if(jQuery("#rebateAmt").val()>1 || jQuery("#rebateAmt").val() < 0){
		jQuery("#rebateAmt").focus();
		alertInfo("返点比例介于0到1之间");
		return false;
	}
	
	jQuery.ajax({
		type : "POST",
		url : PROD_baseURL+"product/saveProduct",//"${baseUrl}product/saveProduct",
		data : pm ,
		success : function(msg) {
			if (msg == "1") {
				$("#editModal").modal("hide");
//				searchProdSale();
				pageByForm2(jQuery("#sercur").val(),'sercur','serchfrom','psContent');
			} else {
				alert("保存失败，请查确认信息是否正确！");
			}

		}
	});
	
	
}
/**
 * 查询货品
 */
function searchPord(){
	var arr = jQuery("#pageForm").find("input[name]");
	var pm = "";
	for ( var i = 0; i < arr.length; i++) {
		pm += jQuery(arr[i]).attr("name") + "=" + jQuery(arr[i]).val();
		if (i < arr.length - 1) {
			pm += "&";
		}
	}
	
	pm={};//初始化不加参数
	jQuery.ajax({
		type : "POST",
		url : PROD_baseURL+"product/searchProd",//${baseUrl}
		data : pm ,
		success : function(msg) {
			
				jQuery("#goodsModal").html(msg);
			
		}
	});
	
}
/**
 * 添加选中的货品到预选列表中
 */
function addProdPre(){
	var prods=document.getElementsByName("chooseProd");
	
	var th="";
	th+='<thead> <tr class="info">';
	th+='<th>外部编码</th>';
	th+='<th>商品名称</th>';
	th+='<th>商品规格</th>';
	th+='<th>渠道销售价</th>';
	th+='<th>返点比例</th>';
	th+='<th>内包装</th>';
	th+='<th>个数</th>';
	th+='<th>自建物流配送</th>';
	th+='<th>操作</th>';
	th+='</tr></thead>';
	var td='<tbody id="preProdList">';
	
	var a = 0;
	var b = 0;
	for( i=0;i<prods.length;i++){
		var ch=prods[i];
		if(ch.checked){
			var  prod=jQuery.parseJSON(ch.value);
			var line="";
			line=line+'<tr>';
			line=line+'<td><input type="hidden" value="'+prod.sid+'" name="pid"><input type="text" value="'+prod.pcode+'" name="prodCode"></td>';
			line=line+'<td><input type="text" value="'+prod.pname+'" name="prodName"></td>';
			line=line+'<td><input style="width:100px"  type="text"   value="'+prod.prdSpec+'" name="prodSpec"></td>';
			line=line+'<td><input style="width:100px" type="text" value="'+prod.price+'" name="salePrice"></td>';
			line=line+'<td><input style="width:100px" type="text" value="0.0" name="rebateAmt"></td>';
			//包装　PROD_BAG
			console.log("prod " + prod);
			console.log("prod.innerPacking " + prod.innerPacking);
			if(prod&&prod.innerPacking){
				line=line+'<td ><input style="width:100px" type="text" value="'+prod.innerPacking+'" name="innerPacking"></td>';
			}else{
				
				line=line+'<td ><input style="width:100px" type="text" value="" name="innerPacking"></td>';
			}
			line=line+'<td><input style="width:100px" type="text" value="'+(prod.retByNum == undefined ? "" : prod.retByNum )+'" name="retByNum"></td>';
			line=line+'<td><input style="width:100px" type="checkbox" value="0" name="mtSelf" ></td>';
			line=line+'<td><button type="button" class="btn btn-danger btn-sm" onclick="deleteItem(this);">删除</button></td>';
			line=line+'</tr>';
			td=td+line;
			a = 1;
		}else{
			//alert("请勾选一种或者多种商品");
			//return;
			b = 1 ;
		}
	}
	td+='</tbody>';
	
	if(b==1 && a==0){
		alert("请勾选一种或者多种商品");
		return;
	}
	
	$("#goodsModal").modal("hide");
	$("#confirmModal").modal("show");
	//jQuery("#preProdList").html(td);
	jQuery("#newProdtable").html(th+td);
	
	
}

/**
 * 批量数据上架，下架
 * @param state
 */
function upStatList(state){
	var prods=document.getElementsByName("chPid");
	var sids=new Array();
	var objs=new Array();
	var j=0;
	for(var i=0;i<prods.length;i++){
		var ch=prods[i];
		if(ch.checked){
			
			objs[j]=ch;
			sids[j]=ch.value;
			j++;
		}
		
	}
	
	 jQuery.ajax({
		type : "POST",
		url : PROD_baseURL+"product/updPSStats",//${baseUrl}
		data : "sids="+sids+"&stat="+state,
		success : function(msg) {
			if(msg=="1"){
				for(var i=0;i<objs.length;i++){
					var obj=objs[i];
					changeCont(obj,obj.value,state);
					
				}
				
			}else{
				alert("失败");
			}
			
			
		}
	});    
}

/**
 * 加载价格编辑
 * @param sid
 */
function updPrice(sid){
	
	$("#maintainModal").modal("show");
	jQuery.ajax({
		type : "POST",
		url : PROD_baseURL+"product/searchPrice",//${baseUrl}
		data : "psid="+sid,
		success : function(msg) {
				jQuery("#maintainModal").html(msg);
			
			
		}
	});    
	
}
/**
 * 添加价格
 * @param sid
 */
function addPrice(sid){
	
	var arr = jQuery("#addprice").find("input[name]");
	var pm = "";
	var strTime="";
	var endTime="";
	for ( var i = 0; i < arr.length; i++) {
		if(null== jQuery(arr[i]).val()||"" ==jQuery(arr[i]).val()){
			alert("请确认输入的内容是否完整！");
			return ;
		}
		var objc=jQuery(arr[i]);//jQuery(arr[i]).attr("name") 
		if(objc.attr("name")=="statDtStr"||objc.attr("name")=="endDtStr"){
			pm += objc.attr("name") + "=" + objc.val()+" 0:0:0";
			if(objc.attr("name")=="statDtStr"){
				strTime=new Date((objc.val()).replace(/-/g,"/"));
			}
			if(objc.attr("name")=="endDtStr"){
				endTime=new Date((objc.val()).replace(/-/g,"/"));
			}
			
		}else{
			pm += jQuery(arr[i]).attr("name") + "=" + jQuery(arr[i]).val();
		}
		
		if (i < arr.length - 1) {
			pm += "&";
		}
	}
	if(!valiDate(strTime,endTime)){
		return ;
	}
	
	/*if(strTime>endTime){
		alert("结束时间必须晚于开始时间");
		return ;
	}*/
	
	pm=pm+"&psId="+sid;
	
   jQuery.ajax({
	type : "POST",
	url : PROD_baseURL+"product/addPrice",//${baseUrl}
	data : pm,
	//dataType: "json",
	success : function(msg) {
		
		var html="";
		 for(i=0;i<msg.length;i++){
			html+=" <tr>";
			html+="<td>"+strToTimestap(msg[i].statDt)+"</td>";
			html+="<td>"+strToTimestap(msg[i].endDt)+"</td>";
			if(null != msg[i].salePrice){
				html+="<td>"+msg[i].salePrice+"</td>";
			}else{
				html+="<td></td>";
			}
			
			html+="</tr>";
		} 
		jQuery("#pricelist").html(html);
			
		}
	});      
}
/**
 * string formate to time 
 * @param str
 * @returns
 */
function strToTimestap(str){
 if(str==null||str==""){
	 return "";
 }
  return (new Date(str)).format("yyyy-mm-dd");// hh:MM:ss
}


function confirmModal(){
	addProdPre();
	
}
/**
 * add product(增加商品(提交预选的货品到商品中))
 * @param channel
 */
function addProduct(channel,secondCode){
	var arry=new Array();
	var flg=-1;
	var a = 0;
	var b = 0;
	$("#preProdList tr").each(function(i){
		 var prod=new Object();
		 
		 prod.prodId= $($(this).children("td:eq(0)")).find("input")[0].value;//$(this).children("td:eq(0)").children().val();
		// if("undefined"==prod.prodId&&null==prod.prodId&&""==prod.prodId){
			// alert("外部编码不能为空");
			/// return;
		// }
		 var prodCode = $($(this).children("td:eq(0)")).find("input")[1].value;
		 if(null==prodCode || ""==prodCode){
			b = 1;
		 }else{
			prod.prodCode=$($(this).children("td:eq(0)")).find("input")[1].value;//$(this).children("td:eq(1)").children().val();
			a = 1;
		 }
		 prod.prodName=$(this).children("td:eq(1)").children().val();
		 prod.prodSpec=$(this).children("td:eq(2)").children().val(); 
		 prod.salePrice=$(this).children("td:eq(3)").children().val(); 
		 prod.rebateAmt=$(this).children("td:eq(4)").children().val(); 
		 prod.prodBag=$(this).children("td:eq(5)").children().val();
		 prod.retByNum=$(this).children("td:eq(6)").children().val();
		 
		 if ($(this).children("td:eq(6)").children().is(":checked")){
				prod.mtSelf=1;
			}else{
				prod.mtSelf=0;
			}
		 if(null!=prod.rebateAmt&&""!=prod.rebateAmt){
			 var amt=parseFloat(prod.rebateAmt);
			 if(!(amt>=0&&amt<1)){
				 flg=i;
			 }
		 }
		 arry.push(prod); 
		 
	});
	if(flg>=0){
		alert("请确保数据准确完整");
		return ;
	}
	if(b==1 &&  a==0){
		alert("请输入外部编码");
		return ;
	}
	var pm="json="+ JSON.stringify(arry)+"&channelCode="+channel;
	if("undefined"!=typeof(secondCode)&&null!=secondCode&&""!=secondCode){
		pm+="&secondCode="+secondCode;
	}
	
	   jQuery.ajax({
		type : "POST",
		url : PROD_baseURL+"product/addProdSales",//${baseUrl}
		data : pm,
		success : function(msg) {
			$("#confirmModal").modal("hide");
			if(msg=="1"){
				searchProdSale();
			}else{
				alert("保存失败，请确认编码唯一！");
			}
			
			
		}
	});    

}
