/**
 * Created by cxx on 2016/9/22.
 */
$(function () {
    storage.expire();
})
if(typeof (storage) == 'undefined'){
    storage = {
        setJonLS:function (key,json) {
            if (!key){
                return;
            }
            this.rmLS(key);
            json.logDate = new Date().getDate();
            try{
                window.localStorage.setItem(key,JSON.stringify(json))
            }catch (e){
                if(e.name == 'QuotaExceededError'){
                    this.clearLS();
                    window.localStorage.setItem(key,JSON.stringify(json));
                }else{
                    alert("set localStorage exception："+e.name)
                }
            }

        },
        putOrder:function (key,order) {
            var json = this.getJsonLS(key) || {};
            try{
                json.order = order;
                this.setJonLS(key,json);
            }catch (e){
                if(e.name == 'QuotaExceededError'){
                    this.clearLS();
                    window.localStorage.setItem(key,JSON.stringify(json));
                }else{
                    alert("set localStorage exception："+e.name)
                }
            }

        },
        putUser:function (key,user) {
            var json = this.getJsonLS(key) || {};
            try{
                json.user = user;
                this.setJonLS(key,json);
            }catch (e){
                if(e.name == 'QuotaExceededError'){
                    this.clearLS();
                    window.localStorage.setItem(key,JSON.stringify(json));
                }else{
                    alert("set localStorage exception："+e.name)
                }
            }

        },
        putEvent:function (key,event) {
            var json = this.getJsonLS(key) || {};
            try{
                json.event = event;
                this.setJonLS(key,json);
            }catch (e){
                if(e.name == 'QuotaExceededError'){
                    this.clearLS();
                    window.localStorage.setItem(key,JSON.stringify(json));
                }else{
                    alert("set localStorage exception："+e.name)
                }
            }

        },
        putHis:function (key,his) {
            var json = this.getJsonLS(key) || {};
            try{
                json.his = his;
                this.setJonLS(key,json);
            }catch (e){
                if(e.name == 'QuotaExceededError'){
                    this.clearLS();
                    window.localStorage.setItem(key,JSON.stringify(json));
                }else{
                    alert("set localStorage exception："+e.name)
                }
            }
        },
        putParam:function (key,param) {
            var json = this.getJsonLS(key) || {};
            try{
                json.param = param;
                this.setJonLS(key,json);
            }catch (e){
                if(e.name == 'QuotaExceededError'){
                    this.clearLS();
                    window.localStorage.setItem(key,JSON.stringify(json));
                }else{
                    alert("set localStorage exception："+e.name)
                }
            }

        },
        getJsonLS:function (key) {
            return JSON.parse(window.localStorage.getItem(key));
        },
        rmLS:function (key) {
            try{
                window.localStorage.removeItem(key);
            }catch (e){
                console.info(e);
            }
        },
        clearLS:function () {
            try{
                window.localStorage.clear();
            }catch (e){
                console.info(e);
            }

        },
        expire:function () {
            try {
                var a = new Date().getDate();
                for (var i = 0;i<window.localStorage.length ; i++){
                    var key = window.localStorage.key(i);
                    var l = storage.getJsonLS(key).logDate;
                    if(l){
                        if(l != a){
                            storage.rmLS(key);
                        }
                    }
                }   
            }catch (e){
                console.info("您的localStorage不可用啊")
            }
            
        }
    }
}