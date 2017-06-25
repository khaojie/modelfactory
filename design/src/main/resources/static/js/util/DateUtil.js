/**
 * Created by cxx on 2016/1/8.
 */
if(typeof (DateUtil) == 'undefined'){
    DateUtil = {
        MERGR_YEAR : "y",
        MERGR_MONTH: "M",
        MERGR_DAY:   "d",
        MERGR_HOUR:  "h",
        MERGR_MINUTE:"m",
        MERGR_SECOND:"s",
        MERGR_MILLISECOND:"S",

        mergeDate:function(c,n,t){
            if(c instanceof Date){
                try{
                    var y= c.getFullYear();
                    var M= c.getMonth()+1;
                    var d= c.getDate();
                    var h= c.getHours();
                    var m= c.getMinutes();
                    var s= c.getSeconds();
                    var S= c.getMilliseconds();
                    var W= c.getDay();
                    switch (t){
                        case DateUtil.MERGR_YEAR:
                            y+=n;
                            break;
                        case DateUtil.MERGR_MONTH:
                            M+=n;
                            break;
                        case DateUtil.MERGR_DAY:
                            d+=n;
                            break;
                        case DateUtil.MERGR_HOUR:
                            h+=n;
                            break;
                        case DateUtil.MERGR_MINUTE:
                            m+=n;
                            break;
                        case DateUtil.MERGR_SECOND:
                            s+=n;
                            break;
                        case DateUtil.MERGR_MILLISECOND:
                            S+=n;
                            break;
                        default :
                            break;
                    }
                    var ds = y+"/"+M+"/"+d+" "+h+":"+m+":"+s;
                    return new Date(Date.parse(ds));
                }catch(e){
                    console.error("非法的日期对象",e) ;
                    return;
                }
            }else{
                console.error("非法的日期对象") ;
                return;
            }
        },
        mergeYear:function(d,s){
            return DateUtil.mergeDate(d,s,DateUtil.MERGR_YEAR);
        },
        mergeMonth:function(d,s){
            return DateUtil.mergeDate(d,s,DateUtil.MERGR_MONTH);
        },
        mergeDay:function(d,s){
            return DateUtil.mergeDate(d,s,DateUtil.MERGR_DAY);
        },
        mergeHour:function(d,s){
            return DateUtil.mergeDate(d,s,DateUtil.MERGR_HOUR);
        },
        mergeMinute:function(d,s){
            return DateUtil.mergeDate(d,s,DateUtil.MERGR_MINUTE);
        },
        mergeSecond:function(d,s){
            return DateUtil.mergeDate(d,s,DateUtil.MERGR_SECOND);
        },
        mergeMilliSecond:function(d,s){
            return DateUtil.mergeDate(d,s,DateUtil.MERGR_MILLISECOND);
        },
        getDate:function(t,str){
            switch (t){
                case "d":
                    try{
                        str+=" 00:00:00";
                        return new Date(Date.parse(str.replace(/-/g,"/")));
                    }catch(e){
                        alert("日期类型不匹配："+str)
                    }
                    break;
                case "t":
                    try{
                        return new Date(Date.parse(str.replace(/-/g,"/")));
                    }catch(e){
                        alert("日期类型不匹配："+str)
                    }
                    break;
                default:
                    alert("非法的日期类型："+t);
                    break;
            }
        },
    }
}