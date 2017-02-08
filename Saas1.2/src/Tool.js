//import * as config from './config.js';
//import PreventOverScroll from 'preventoverscrolljs';
import {target,SessionId,getWxConfig,shareURL} from './config.js';

const Tool = {};
Tool.HTTPs = target;
Tool.SessionId = SessionId;
Tool.ShareURL = shareURL;

window.routerChange = function(){
    wx.config(getWxConfig.get());
    wx.ready(function(){wx.hideOptionMenu();});
    // document.body.addEventListener('touchmove', function (event) {
    //     event.preventDefault();
    // }, false);
    // let lastY;
    // document.getElementById('container').addEventListener('touchstart', function (event) {
    //     lastY = event.changedTouches[0].pageY;
    // }, false);
    //document.getElementById('container').addEventListener('touchmove', function (event) {
        //let st = this.scrollTop;
        //console.log(st);
    //     if ( st < 0 || st > 0) {
    //         event.preventDefault();
    //     }
    // }, false);
}
window.AlertTimeOut = '';
window.XHRLIST = [];

Tool.ga = function () {
        let nac = JSON.parse(Tool.localItem('vipLodData'));
        let users = '员工'
        if(nac.usercategory == '2'){
            users = '老板'
        }
        let delname = nac.dealersalesallbrandsname.replace(/\,/g, "|");

        ga('send','event','首页加载','首页加载',{
            dimension2:users,
            dimension3:nac.dealername,
            dimension4:delname,
            dimension5: nac.userid
        });
};

Tool.gaTo = function (txt, name, lab) {
    ga('send','event', txt, name, lab);
}
        
// window.addEventListener("click", function(e){});

// window._IsAndroid =function(){
//     var ua = navigator.userAgent.toLowerCase();
//     if (ua.match(/Android/i)) {
//         return 'bodywrapper';
//     } else {
//         return 'container';
//     }
// }
// var Bouter = _IsAndroid();
// var Bouterlist = [Bouter];
// var Bprevent = new PreventOverScroll({
//     list: Bouterlist
// });
/**
 * 发送ajax请求和服务器交互
 * @param {object} mySetting 配置ajax的配置
 */
Tool.ajax = function (mySetting) {

    var setting = {
        url: window.location.pathname, //默认ajax请求地址
        async: true, //true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false
        type: 'GET', //请求的方式
        data: {}, //发给服务器的数据
        dataType: 'json',
        success: function (text) { }, //请求成功执行方法
        error: function () { } //请求失败执行方法
    };


    var aData = []; //存储数据
    var sData = ''; //拼接数据
    //属性覆盖
    for (var attr in mySetting) {
        setting[attr] = mySetting[attr];
    }
    for (var attr in setting.data) {
        aData.push(attr + '=' + filter(setting.data[attr]));
    }
    sData = aData.join('&');
    setting.type = setting.type.toUpperCase();

    var xhr = new XMLHttpRequest();
    XHRLIST.push(xhr);
    try {
        if (setting.type == 'GET') { //get方式请求
            if(setting.url.indexOf('?') > 0){
                sData = setting.url + sData;
            }else{
                sData = setting.url + '?' + sData;
            }
            
            xhr.open(setting.type, sData + '&' + new Date().getTime(), setting.async);
            xhr.send();
        } else { //post方式请求
            xhr.open(setting.type, setting.url, setting.async);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(sData);
        }
    } catch (e) {
        return httpEnd();
    }

    if (setting.async) {
        xhr.addEventListener('readystatechange', httpEnd, false);
    } else {
        httpEnd();
    }

    function httpEnd() {
        if (xhr.readyState == 4) {
            var head = xhr.getAllResponseHeaders();
            var response = xhr.responseText;
            //将服务器返回的数据，转换成json

            if (/application\/json/.test(head) || setting.dataType === 'json' && /^(\{|\[)([\s\S])*?(\]|\})$/.test(response)) {
                response = JSON.parse(response);
            }

            if (xhr.status == 200) {
                setting.success(response, setting, xhr);
            } else {
                setting.error(setting, xhr);
            }
        }
    }
    xhr.end = function () {
        xhr.removeEventListener('readystatechange', httpEnd, false);
    }

    function filter(str) { //特殊字符转义
        str += ''; //隐式转换
        str = str.replace(/%/g, '%25');
        str = str.replace(/\+/g, '%2B');
        str = str.replace(/ /g, '%20');
        str = str.replace(/\//g, '%2F');
        str = str.replace(/\?/g, '%3F');
        str = str.replace(/&/g, '%26');
        str = str.replace(/\=/g, '%3D');
        str = str.replace(/#/g, '%23');
        return str;
    }
    return xhr;
};
/**
 * 封装ajax post请求
 * @param {string} pathname 服务器请求地址
 * @param {object} data     发送给服务器的数据
 * @param {function} success  请求成功执行方法
 * @param {function} error    请求失败执行方法
 */
Tool.post = function (pathname, data, success, error) {
    var setting = {
        url: target + pathname, //默认ajax请求地址
        type: 'POST', //请求的方式
        data: data, //发给服务器的数据
        success: success || function () { }, //请求成功执行方法
        error: error || function () { } //请求失败执行方法
    };
    return Tool.ajax(setting);
};
/**
 * 封装ajax get请求
 * @param {string} pathname 服务器请求地址
 * @param {object} data     发送给服务器的数据
 * @param {function} success  请求成功执行方法
 * @param {function} error    请求失败执行方法
 */
Tool.get = function (pathname, data, success, error) {
    var setting = {
        url: target + pathname, //默认ajax请求地址
        type: 'GET', //请求的方式
        data: data, //发给服务器的数据
        success: success || function () { }, //请求成功执行方法
        error: error || function () { } //请求失败执行方法
    };
    return Tool.ajax(setting);
};

// Tool.getWX = function (pathname, data, success, error) {
//     var setting = {
//         url: 'https://didi.360che.com/saas/' + pathname, //默认ajax请求地址
//         type: 'GET', //请求的方式
//         data: data, //发给服务器的数据
//         success: success || function () { }, //请求成功执行方法
//         error: error || function () { } //请求失败执行方法
//     };
//     return Tool.ajax(setting);
// };
/**
 * 格式化时间
 * 
 * @param {any} t
 * @returns
 */
Tool.formatDate = function (str) {
    var date = new Date(str);
    var time = new Date().getTime() - date.getTime(); //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
    if (time < 0) {
        return '';
    } else if (time / 1000 < 60) {
        return '刚刚';
    } else if ((time / 60000) < 60) {
        return parseInt((time / 60000)) + '分钟前';
    } else if ((time / 3600000) < 24) {
        return parseInt(time / 3600000) + '小时前';
    } else if ((time / 86400000) < 31) {
        return parseInt(time / 86400000) + '天前';
    } else if ((time / 2592000000) < 12) {
        return parseInt(time / 2592000000) + '月前';
    } else {
        return parseInt(time / 31536000000) + '年前';
    }
}

/**
 * 本地数据存储或读取
 * 
 * @param {any} key
 * @param {any} value
 * @returns
 */
Tool.localItem = function (key, value) {
    if (arguments.length == 1) {
        return localStorage.getItem(key);
    } else {
        return localStorage.setItem(key, value);
    }
}

/**
 * 删除本地数据
 * 
 * @param {any} key
 * @returns
 */
Tool.removeLocalItem = function (key) {
    if (key) {
        return localStorage.removeItem(key);
    }
    return localStorage.removeItem();
}
//验证手机号
Tool.checkPhone = function (phone){
    if((/^1[3|4|5|7|8]\d{9}$/.test(phone))){ return true; }else{return false;}
}
Tool.getQueryString = function(name) {
    let conts = window.location.hash.split("?");
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = conts[1].match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    else {
        return null;
    }
}

//弹窗提示的封装
var Alert = {};
Alert.to = function(val) {
        clearTimeout(AlertTimeOut);
        let AlertCont = document.getElementById("AlertCont");
        let AlertTxt = document.getElementById("AlertTxt");
        AlertTxt.innerHTML = val;
        AlertCont.setAttribute('class','notification notification-in');
        AlertTimeOut = setTimeout(() => Alert.out(),4000);
}
Alert.out = function(){
    let AlertCont = document.getElementById("AlertCont");
    AlertCont.setAttribute('class','notification');
}

var AllMsgToast = {};
AllMsgToast.to = function(val) {
        let AlertTxt = document.getElementById("AllMsg");
        AlertTxt.innerHTML = val;
        AlertTxt.setAttribute('class','active');
        let AllMsgToastOut = setTimeout(() => AllMsgToast.out(),2000);
}
AllMsgToast.out = function(){
    let AlertCont = document.getElementById("AllMsg");
    AlertCont.removeAttribute('class');
}

export {Tool , Alert, AllMsgToast}
