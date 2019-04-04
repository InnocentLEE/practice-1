define(['jquery', 'system', 'metronic'], function ($, SystemConfig, Metronic) {

    'use strict';

    var CwHelper = {}, overTimes = 1000 * 60 * 120; //超时时间

    //返回构造后的AJAX请求参数
    CwHelper.AjaxData = function (request, body, ajax) {

        var token = "";

        if (!request && $.trim(request.servicecode) == "") {
            throw CwHelper.ErrorMessage.ERROR0003;
        }

        if ($.type(request) == "string") {
            request = { servicecode: request };
        }

        if ($.type(ajax) == "function") {
            var callback = ajax;
            ajax = {
                success: function (d) {
                    if ($.type(d) == "string") {
                        d = CwHelper.StrToJson(d);
                    }
                    callback(d);
                }
            };
        }

        var publicrequest = $.extend({
            "sysid": SystemConfig.SysId,
            "reqid": CwHelper.NewGuid(),
            "protover": "1.0",
            "servicever": "1.0",
            "requesttime": CwHelper.DateFormat(new Date(), "yyyyMMddHHmmssfff"),
            "signdata": "",
            "reserve": ""
        }, request);

        var data = { publicrequest: publicrequest, body: body };

        var ajaxObj = $.extend({
            crossDomain: true,
            url: CwHelper.Route(publicrequest.servicecode, publicrequest.servicever, SystemConfig.ServerAgent),
            type: 'post',
            cache: false,
            contentType: "application/json",
            dataType: 'json',
            headers: {
                "token": CwHelper.GetToken(),
                // "Source-Type": "76d5f6283a57b2db",
                // "Access-Control-Allow-Origin": "*",
                // "Access-Control-Allow-Headers": "X-Requested-With"
            },
            error: function (request, status, error) {
                var errorObj = { XMLHttpRequest: request, textStatus: status, errorThrown: error };
                var bv = GetBrowserVersion();
                if (request.readyState == 0 && request.statusText.indexOf("拒绝访问") >= 0 && bv.browser == "IE" && (bv.version == 8 || bv.version == 8)) {
                    alert(CwHelper.ErrorMessage.ERROR0004);
                    return;
                }
                //TODO:ajax在完成之前请求已经被取消（ajax请求没有发出），会进入这里
                if (request.readyState == 0 && request.statusText == "error") return;
                alert(CwHelper.ErrorMessage.ERROR0002);
            },
            beforeSend: function () {
                Metronic.blockUI({ animate: true });
            },
            complete: function () {
                var token = CwHelper.GetToken();
                //登录状态下，每次操作设置操作时间+2小时
                if (token != "" && !CwHelper.IsTokenTimeOut()) {
                    var date = new Date();
                    date.setTime(date.getTime() + overTimes);
                    $.cookie('lastOperateTime', date, {
                        path: "/"
                    });
                }
                Metronic.unblockUI();
            }
        }, ajax, { data: data });

        return ajaxObj;
    }

    //对AJAX进行封装
    CwHelper.Ajax = function (request, body, ajax, login) {

        //是否需要登录
        var token = "";
        if (login !== false) {
            token = CwHelper.GetToken();
            if (token == "" || CwHelper.IsTokenTimeOut()) {
                CwHelper.Login();
                return;
            }
        }
        $.support.cors = true;
        var ajaxObj = CwHelper.AjaxData(request, body, ajax);
        //ajaxObj.data = { '': CwHelper.Encode(CwHelper.JsonToStr(ajaxObj.data)) };
        ajaxObj.data = CwHelper.JsonToStr(ajaxObj.data);
        $.ajax(ajaxObj);
    }

    //获取COOKIE中的TOKEN
    CwHelper.GetToken = function () {
        var token = $.trim($.cookie('token'));
        return token;
    }

    //是否超时
    CwHelper.IsTokenTimeOut = function () {
        var tokenTime = new Date($.cookie('tokenTime'));
        var lastOperateTime = new Date($.cookie('lastOperateTime'));
        var now = new Date();
        //当前时间处于 TOKEN时间 +2小时之后 ，和最后操作时间2小时内
        return (now.getTime() - tokenTime.getTime() > 0) &&
            (now.getTime() - lastOperateTime.getTime() > 0);
    }

    //登陆
    CwHelper.Login = function () {
        require(['login'], function (t) {
            t.ShowLogin();
        });
    }

    //适配旧系统登录
    CwHelper.AdaptLogin = function (token, fn) {
        if (SystemConfig.AdaptLogin === true) {
            $.ajax({
                url: '/DefaultAdapt/Login', type: 'post', data: { 'token': token }, success: function (d) {
                    if (d.success) {
                        fn();
                    } else {
                        alert(CwHelper.ErrorMessage.ERROR0002);
                    }
                }
            });
        } else {
            fn();
        }
    }

    //适配旧系统登出
    CwHelper.AdaptLogout = function (fn) {
        if (SystemConfig.AdaptLogin === true) {
            $.ajax({
                url: '/DefaultAdapt/Logout', type: 'post', data: { 'token': CwHelper.GetToken() }, success: function (d) {
                    if (d.success) {
                        fn();
                    } else {
                        alert(CwHelper.ErrorMessage.ERROR0002);
                    }
                }
            });
        }
        else {
            fn();
        }
    }

    //设置TOKEN
    CwHelper.SetToken = function (token) {
        var time = new Date();
        time.setTime(time.getTime() + overTimes)
        $.cookie('tokenTime', time, {
            path: "/"
        });
        $.cookie('lastOperateTime', time, {
            path: "/"
        });
        var token = $.cookie('token', token, {
            path: "/"
        });
    }

    //登出
    CwHelper.Logout = function () {
        CwHelper.AdaptLogout(function () {
            $.cookie('tokenTime', '', {
                path: "/"
            });
            $.cookie('lastOperateTime', '', {
                path: "/"
            });
            $.cookie('token', '', {
                path: "/"
            });

            //redirtDefault();
            sessionStorage.clear();
            var w = top || this;
            w.location.href = SystemConfig.LoginUrl;
        });
    }

    //用户菜单
    CwHelper.UserMenu = function () {
        require(['menu'], function (menu) {
            var key = CwHelper.GetToken() + "Menu";
            var data = CwHelper.Storage.get(key);
            if (data) {
                menu.SetMenu(CwHelper.StrToJson(data));
            }
            else {
                CwHelper.Ajax("00000030006", { SysId: SystemConfig.SysId, AppId: SystemConfig.AppId, Token: CwHelper.GetToken() }, function (d) {
                    require(['menu'], function (menu) {
                        if (d.publicresponse.statuscode == 0) {
                            menu.SetMenu(d);
                            console.log(JSON.stringify(d));
                            CwHelper.Storage.set(CwHelper.GetToken() + "Menu", CwHelper.JsonToStr(d));
                        }
                    });
                });
            }
        });
    }

    //页面顶部信息
    CwHelper.Header = function () {
        require(['header'], function (header) {
            CwHelper.UserInfo(function (result) {
                header.SetHeaderInfo(result);
            });
        });
    }

    //临时存储数据
    CwHelper.Storage = (function () {
        var t = sessionStorage;
        var storage = {
            get: function (key) {
                return t.getItem(key);
            },
            set: function (key, value) {
                t.setItem(key, value);
            },
            clear: function () {
                t.clear();
            }
        };
        return storage;
    })();

    //获取服务器时间
    CwHelper.GetServerTime = function () {
        return new Date();
    }

    //用户信息
    CwHelper.UserInfo = function (fn) {
        var key = CwHelper.GetToken() + "UserInfo";
        var data = CwHelper.Storage.get(key);
        if (data) {
            fn(CwHelper.StrToJson(data));
        }
        else {
            CwHelper.Ajax("00000030002", CwHelper.GetToken(), function (d) {
                if (d.publicresponse.statuscode == 0) {
                    CwHelper.Storage.set(key, CwHelper.JsonToStr(d));
	     fn(d);
                }

            });
        }
    }

    CwHelper.GetUserInfo = function () {
        var key = CwHelper.GetToken() + "UserInfo";
        var userInfoResponseStr = CwHelper.Storage.get(key);
        var userInfo = {};
        if (!!userInfoResponseStr) {
            var userInfoResponse = CwHelper.StrToJson(userInfoResponseStr)
            userInfo = userInfoResponse.body;
        }
        return userInfo;
    };

    //编码
    CwHelper.Encode = function (str) {
        return str;
    }

    //解码
    CwHelper.Decode = function (str) {
        return str;
    }

    //将JSON序列化成字符串
    CwHelper.JsonToStr = function (json) {
        return JSON.stringify(json);
    }

    //将字符串反序列化成JSON
    CwHelper.StrToJson = function (str) {
        return JSON.parse(str);
    }

    //产生一个GUID
    CwHelper.NewGuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g,
            function (match) {
                var randomNibble = Math.random() * 16 | 0;
                var nibble = (match == 'y') ?
                    (randomNibble & 0x3 | 0x8) :
                    randomNibble;
                return nibble.toString(16).toUpperCase();
            });
    }

    //配置服务网关路由地址
    CwHelper.Route = function (code, ver, url) {
        var table = SystemConfig.ServiceCodeTable;
        var result = url;
        for (var i = 0; i < table.length; i++) {
            var item = table[i];
            if (item.code == code && ver == (item.ver || '1.0')) {
                result = item.url;
            }
        }

        return result;
    }

    //格式化时间,绑定到时间对象上（注意被覆盖）
    Date.prototype.Format = function (fmt) {
        return CwHelper.DateFormat(this, fmt);
    }

    //格式化时间
    CwHelper.DateFormat = function (date, fmt) {
        var o = {
            "M+": date.getMonth() + 1, //月份 
            "d+": date.getDate(), //日 
            "H+": date.getHours(), //小时 
            "m+": date.getMinutes(), //分 
            "s+": date.getSeconds(), //秒 
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        };
        var milliseconds = date.getMilliseconds();
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        if (/(f+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? milliseconds + '' : (("000" + milliseconds).substr(("" + milliseconds).length)));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    //普通页面判断是否返回首页进行登录还是延时当前凭据时间
    CwHelper.PageLogin = function () {
        try {
            var token = CwHelper.GetToken();
            var tokenTime = new Date($.cookie('tokenTime'));
            var lastOperateTime = new Date($.cookie('lastOperateTime'));
            var now = new Date();

            if (token == "") {
                redirtDefault();
                return;
            }

            //当前时间处于 TOKEN时间 +2小时之后 ，和最后操作时间2小时内
            if ((now.getTime() - tokenTime.getTime() > 0) &&
                now.getTime() - lastOperateTime.getTime() < 0) {
                //延长TOKEN时间
                CwHelper.Ajax('00000030005', token, function (response) {
                    if (response.publicresponse.statuscode === 0 && response.body === "true") {
                        CwHelper.SetToken(token);
                    } else {
                        redirtDefault();
                    }
                }, false);
            } else if ((now.getTime() - tokenTime.getTime() > 0) &&
                now.getTime() - lastOperateTime.getTime() > 0) {
                redirtDefault();
            }
        } catch (error) {
            redirtDefault();
        }
    }

    //指向默认登录页面
    function redirtDefault() {
        sessionStorage.clear();
        var w = top || this;
        w.location.href = SystemConfig.LoginUrl + '?ReturnUrl=' + encodeURIComponent(GetUrlRelativePath(w.location.href));
    }

    //获取相对路径
    function GetUrlRelativePath() {
        var url = document.location.toString();
        var arrUrl = url.split("//");
        var start = arrUrl[1].indexOf("/");
        var relUrl = arrUrl[1].substring(start);
        if (relUrl.indexOf("?") != -1) {
            relUrl = relUrl.split("?")[0];
        }
        return relUrl;
    }

    //获取浏览器和版本号
    function GetBrowserVersion() {
        var userAgent = navigator.userAgent,
            rMsie = /(msie\s|trident.*rv:)([\w.]+)/,
            rFirefox = /(firefox)\/([\w.]+)/,
            rOpera = /(opera).+version\/([\w.]+)/,
            rChrome = /(chrome)\/([\w.]+)/,
            rSafari = /version\/([\w.]+).*(safari)/;
        var browser;
        var version;

        var ua = userAgent.toLowerCase();
        var match = rMsie.exec(ua);

        if (match != null) {
            return { browser: "IE", version: match[2] || "0" };
        }
        var match = rFirefox.exec(ua);
        if (match != null) {
            return { browser: match[1] || "", version: match[2] || "0" };
        }
        var match = rOpera.exec(ua);
        if (match != null) {
            return { browser: match[1] || "", version: match[2] || "0" };
        }
        var match = rChrome.exec(ua);
        if (match != null) {
            return { browser: match[1] || "", version: match[2] || "0" };
        }
        var match = rSafari.exec(ua);
        if (match != null) {
            return { browser: match[2] || "", version: match[1] || "0" };
        }
        return { browser: "", version: "0" };
    };

    var BrowserVersion = GetBrowserVersion();
    CwHelper.BrowserVersion = BrowserVersion;

    //控制台输出日志信息
    CwHelper.Log = function (msg) {
        if (SystemConfig.IsTest) {
            if (console && console.info) {
                console.info(msg);
            }
        }
    }

    //保持Token有效性
    CwHelper.DelayedToken = function () {
        setInterval(function () {
            var token = CwHelper.GetToken();
            if (!!token) {
                CwHelper.Ajax("00000030002", token, function (d) { });
            }
        }, overTimes / 2);
    };

    CwHelper.LongDateToDate = function (longTypeDate){
        var datetimeType = "";
        var date = new Date();
        date.setTime(longTypeDate);
        datetimeType = date.getFullYear()+"-"+getMonth(date)+"-"+getDay(date)+"&nbsp;"+getHours(date)+":"+getMinutes(date)+":"+getSeconds(date);//yyyy-MM-dd 00:00:00格式日期
        return datetimeType;
    }

    //错误提示
    CwHelper.ErrorMessage = {
        'ERROR0001': '请重新进行登录',
        'ERROR0002': '出现网络错误，请稍后再试',
        'ERROR0003': '必须填写服务代码',
        'ERROR0004': '初次使用系统，请点击IE浏览器的的“工具->Internet 选项->安全->自定义级别”将“其他”选项中的“通过域访问数据源”选中为“启用”'
    };
    //返回 01-12 的月份值
    function getMonth(date){
        var month = "";
        month = date.getMonth() + 1; //getMonth()得到的月份是0-11
        if(month<10){
            month = "0" + month;
        }
        return month;
    }
//返回01-30的日期
    function getDay(date){
        var day = "";
        day = date.getDate();
        if(day<10){
            day = "0" + day;
        }
        return day;
    }
//返回小时
    function getHours(date){
        var hours = "";
        hours = date.getHours();
        if(hours<10){
            hours = "0" + hours;
        }
        return hours;
    }
//返回分
    function getMinutes(date){
        var minute = "";
        minute = date.getMinutes();
        if(minute<10){
            minute = "0" + minute;
        }
        return minute;
    }
//返回秒
    function getSeconds(date){
        var second = "";
        second = date.getSeconds();
        if(second<10){
            second = "0" + second;
        }
        return second;
    }

    CwHelper.getCity = function (province) {
        // region 城市列表
        var pvn0=["东城","西城","崇文","宣武","朝阳","丰台","石景山","海淀","门头沟","房山","通州","顺义","昌平","大兴","平谷","怀柔","密云","延庆"];
        var pvn1=["黄浦","卢湾","徐汇","长宁","静安","普陀","闸北","虹口","杨浦","闵行","宝山","嘉定","浦东","金山","松江","青浦","南汇","奉贤","崇明"];
        var pvn2=["和平","东丽","河东","西青","河西","津南","南开","北辰","河北","武清","红挢","塘沽","汉沽","大港","宁河","静海","宝坻","蓟县"];
        var pvn3=["万州","涪陵","渝中","大渡口","江北","沙坪坝","九龙坡","南岸","北碚","万盛","双挢","渝北","巴南","黔江","长寿","綦江","潼南","铜梁","大足","荣昌","壁山","梁平","城口","丰都","垫江","武隆","忠县","开县","云阳","奉节","巫山","巫溪","石柱","秀山","酉阳","彭水","江津","合川","永川","南川"];
        var pvn4=["石家庄","邯郸","邢台","保定","张家口","承德","廊坊","唐山","秦皇岛","沧州","衡水"];
        var pvn5=["太原","大同","阳泉","长治","晋城","朔州","吕梁","忻州","晋中","临汾","运城"];
        var pvn6=["呼和浩特","包头","乌海","赤峰","呼伦贝尔盟","阿拉善盟","哲里木盟","兴安盟","乌兰察布盟","锡林郭勒盟","巴彦淖尔盟","伊克昭盟"];
        var pvn7=["沈阳","大连","鞍山","抚顺","本溪","丹东","锦州","营口","阜新","辽阳","盘锦","铁岭","朝阳","葫芦岛"];
        var pvn8=["长春","吉林","四平","辽源","通化","白山","松原","白城","延边"];
        var pvn9=["哈尔滨","齐齐哈尔","牡丹江","佳木斯","大庆","绥化","鹤岗","鸡西","黑河","双鸭山","伊春","七台河","大兴安岭"];
        var pvn10=["南京","镇江","苏州","南通","扬州","盐城","徐州","连云港","常州","无锡","宿迁","泰州","淮安"];
        var pvn11=["杭州","宁波","温州","嘉兴","湖州","绍兴","金华","衢州","舟山","台州","丽水"];
        var pvn12=["合肥","芜湖","蚌埠","马鞍山","淮北","铜陵","安庆","黄山","滁州","宿州","池州","淮南","巢湖","阜阳","六安","宣城","亳州"];
        var pvn13=["福州","厦门","莆田","三明","泉州","漳州","南平","龙岩","宁德"];
        var pvn14=["南昌市","景德镇","九江","鹰潭","萍乡","新馀","赣州","吉安","宜春","抚州","上饶"];
        var pvn15=["济南","青岛","淄博","枣庄","东营","烟台","潍坊","济宁","泰安","威海","日照","莱芜","临沂","德州","聊城","滨州","菏泽"];
        var pvn16=["郑州","开封","洛阳","平顶山","安阳","鹤壁","新乡","焦作","濮阳","许昌","漯河","三门峡","南阳","商丘","信阳","周口","驻马店","济源"];
        var pvn17=["武汉","宜昌","荆州","襄樊","黄石","荆门","黄冈","十堰","恩施","潜江","天门","仙桃","随州","咸宁","孝感","鄂州"];
        var pvn18=["长沙","常德","株洲","湘潭","衡阳","岳阳","邵阳","益阳","娄底","怀化","郴州","永州","湘西","张家界"];
        var pvn19=["广州","深圳","珠海","汕头","东莞","中山","佛山","韶关","江门","湛江","茂名","肇庆","惠州","梅州","汕尾","河源","阳江","清远","潮州","揭阳","云浮"];
        var pvn20=["南宁","柳州","桂林","梧州","北海","防城港","钦州","贵港","玉林","南宁地区","柳州地区","贺州","百色","河池"];
        var pvn21=["海口","三亚"];
        var pvn22=["成都","绵阳","德阳","自贡","攀枝花","广元","内江","乐山","南充","宜宾","广安","达川","雅安","眉山","甘孜","凉山","泸州"];
        var pvn23=["贵阳","六盘水","遵义","安顺","铜仁","黔西南","毕节","黔东南","黔南"];
        var pvn24=["昆明","大理","曲靖","玉溪","昭通","楚雄","红河","文山","思茅","西双版纳","保山","德宏","丽江","怒江","迪庆","临沧"];
        var pvn25=["拉萨","日喀则","山南","林芝","昌都","阿里","那曲"];
        var pvn26=["西安","宝鸡","咸阳","铜川","渭南","延安","榆林","汉中","安康","商洛"];
        var pvn27=["兰州","嘉峪关","金昌","白银","天水","酒泉","张掖","武威","定西","陇南","平凉","庆阳","临夏","甘南"];
        var pvn28=["银川","石嘴山","吴忠","固原"];
        var pvn29=["西宁","海东","海南","海北","黄南","玉树","果洛","海西"];
        var pvn30=["乌鲁木齐","石河子","克拉玛依","伊犁","巴音郭勒","昌吉","克孜勒苏柯尔克孜","博 尔塔拉","吐鲁番","哈密","喀什","和田","阿克苏"];
        var pvn31=["香港"];
        var pvn32=["澳门"];
        var pvn33=["台北","高雄","台中","台南","屏东","南投","云林","新竹","彰化","苗栗","嘉义","花莲","桃园","宜兰","基隆","台东","金门","马祖","澎湖"];
        // endregion

        if(province=="北京"){return pvn0;}
        if(province=="上海"){return pvn1;}
        if(province=="天津"){return pvn2;}
        if(province=="重庆"){return pvn3;}
        if(province=="河北"){return pvn4;}
        if(province=="山西"){return pvn5;}
        if(province=="内蒙古"){return pvn6;}
        if(province=="辽宁"){return pvn7;}
        if(province=="吉林"){return pvn8;}
        if(province=="黑龙江"){return pvn9;}
        if(province=="江苏"){return pvn10;}
        if(province=="浙江"){return pvn11;}
        if(province=="安徽"){return pvn12;}
        if(province=="福建"){return pvn13;}
        if(province=="江西"){return pvn14;}
        if(province=="山东"){return pvn15;}
        if(province=="河南"){return pvn16;}
        if(province=="湖北"){return pvn17;}
        if(province=="湖南"){return pvn18;}
        if(province=="广东"){return pvn19;}
        if(province=="广西"){return pvn20;}
        if(province=="海南"){return pvn21;}
        if(province=="四川"){return pvn22;}
        if(province=="贵州"){return pvn23;}
        if(province=="云南"){return pvn24;}
        if(province=="西藏"){return pvn25;}
        if(province=="陕西"){return pvn26;}
        if(province=="甘肃"){return pvn27;}
        if(province=="宁夏"){return pvn28;}
        if(province=="青海"){return pvn29;}
        if(province=="新疆"){return pvn30;}
        if(province=="香港"){return pvn31;}
        if(province=="澳门"){return pvn32;}
        if(province=="台湾"){return pvn33;}
    }

    return CwHelper;
});