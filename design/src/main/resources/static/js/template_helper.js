/**
 * template扩展方法
 * Created by qupei on 8/19 2016.
 */
require(['template'], function (template){

    Date.prototype.myFormat = function(format){
        var o = {
            "M+" : this.getMonth()+1, //month
            "d+" : this.getDate(), //day
            "h+" : this.getHours(), //hour
            "m+" : this.getMinutes(), //minute
            "s+" : this.getSeconds(), //second
            "q+" : Math.floor((this.getMonth()+3)/3), //quarter
            "S" : this.getMilliseconds() //millisecond
        }

        if(/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        }

        for(var k in o) {
            if(new RegExp("("+ k +")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
            }
        }
        return format;
    }

    template.helper('compare', function(source, data) {
        try {
            //console.log('compare source:' +source + ' data:' + data);
            var jsonData = JSON.parse(data);
            return  source == jsonData['target'] ? jsonData['hit'] : jsonData['not_hit'];
        } catch (e) {
            console.error(e);
            return '';
        }
    });

    template.helper('fixed', function (data, fractionalDigits) {
        return Number(data).toFixed(fractionalDigits);
    });

    template.helper('dateCompare', function(source, data) {
        try {
            // console.log('dateCompare source:' +source + ' data:' + data);
            var jsonData = JSON.parse(data);
            var pattern = jsonData['pattern'];
            var $now = new Date();

            var sourceDate,targetDate;

            if (!isNaN(source) &&( pattern == 'long' || pattern == 'Long' || pattern == 'LONG')) {
                sourceDate = new Date(Number(source));
                targetDate = $now;
            } else {
                sourceDate = /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/.test(source) ? new Date(source.replace(/\-/g,'/'))
                    : /^(\d{4})\-(\d{2})\-(\d{2})$/.test(source) ? new Date(source.replace(/\-/g,'/') + ' 00:00:00') : $now;

                targetDate = /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/.test(jsonData['target']) ? new Date(jsonData['target'].replace(/\-/g,'/'))
                    : /^(\d{4})\-(\d{2})\-(\d{2})$/.test(jsonData['target']) ? new Date(jsonData['target'].replace(/\-/g,'/') + ' 00:00:00') : $now;
            }


            var boolResult = false;
            switch (jsonData['operator']) {
                case 'EQ':
                    boolResult = sourceDate == targetDate;
                    break;
                case 'LE':
                    boolResult = sourceDate <= targetDate;
                    break;
                case 'GE':
                    boolResult = sourceDate >= targetDate;
                    break;
                case 'GT':
                    boolResult = sourceDate > targetDate;
                    break;
                case 'LT':
                    boolResult = sourceDate < targetDate;
                    break;
                default:
                    boolResult = false;
            }
            //console.log('boolResult:'+boolResult);
            return  boolResult ? jsonData['hit'] : jsonData['not_hit'];
        }catch (e){
            console.error(e);
            return '';
        }
    });

    template.helper('dateParse', function (source, pattern) {
        try {
            if (!isNaN(source) &&( pattern == 'long' || pattern == 'Long' || pattern == 'LONG')) {
                return new Date(Number(source)).myFormat("yyyy-MM-dd hh:mm:ss");
            } else {
                return source;//TODO 暂未实现
            }
        } catch (e) {
            console.error(e);
            return source;
        }
    })

    template.helper('subEight', function (source) {
        try {
            if (source){
                source = source.substr(0,8) +"..."
            }
            return source;
        } catch (e) {
            console.error(e);
            return source;
        }
    })
});