define(['/Modules/Config/conwin.main.js'], function () {
    require(['jquery', 'popdialog', 'tipdialog', 'toast', 'helper', 'common', 'formcontrol', 'prevNextpage', 'tableheadfix', 'system', 'selectcity', 'selectCity2', 'filelist', 'metronic', 'searchbox', 'customtable', 'bootstrap-datepicker.zh-CN', 'bootstrap-datetimepicker.zh-CN'],
        function ($, popdialog, tipdialog, toast, helper, common, formcontrol, prevNextpage, tableheadfix, system, selectcity,selectCity2, filelist, Metronic, fileupload) {
            var userInfo = helper.GetUserInfo();
            helper.Ajax("008808800076", userInfo.organId, function (result) {
                if ($.type(result) == "string") {
                    result = helper.StrToJson(result);
                }
                var publicresponse = result.publicresponse;
                var body = result.body;
                if (publicresponse.statuscode == 0) {
                    var reResult = [];
                    reResult.push({ id: "QingXuanZeBiaoZhiId", text: "请选择" });
                    for (var i = 0; i < result.body.length; i++) {
                        reResult.push({ id: body[i].Id, text: body[i].Item });
                    }
                    $("#Route").searchbox({
                        data: reResult
                    });
                };
            }, false);
            helper.Ajax("008808800077", userInfo.organId, function (result) {
                if ($.type(result) == "string") {
                    result = helper.StrToJson(result);
                }
                var publicresponse = result.publicresponse;
                var body = result.body;
                if (publicresponse.statuscode == 0) {
                    var reResult = [];
                    reResult.push({ id: "QingXuanZeBiaoZhiId", text: "请选择" });
                    for (var i = 0; i < result.body.length; i++) {
                        reResult.push({ id: body[i].Id, text: body[i].Item });
                    }
                    $("#Car").searchbox({
                        data: reResult
                    });
                };
            }, false);
            console.log(JSON.stringify(userInfo));
            var initPage = function () {
                common.AutoFormScrollHeight('#Form1', function (hg) {
                    var boxHeight = hg - $('.portlet-title').outerHeight(true) - $('.nav-tabs').outerHeight(true) - 50;
                    var me = $(".scroller", '#Form1').eq(0);
                    me.parent().css('height', boxHeight);
                    me.css('height', boxHeight);
                });
                $('.date-picker').datetimepicker({ format: 'yyyy-mm-dd hh:ii', autoclose: true, language: 'zh-CN' });
                $("#EndDate").datetimepicker({
                    autoclose: true,//选中之后自动隐藏日期选择框
                    clearBtn: true,//清除按钮
                    todayBtn: false,//今日按钮
                    format: 'yyyy-mm-dd hh:ii',
                }).on('changeDate', function(ev){
                    $("#StartDate").datetimepicker('setEndDate', new Date(new Date(ev.date.valueOf()).getTime() - 8 * 60 * 60 * 1000));
                });
                $("#StartDate").datetimepicker({
                    autoclose: true,//选中之后自动隐藏日期选择框
                    clearBtn: true,//清除按钮
                    todayBtn: false,//今日按钮
                    format: 'yyyy-mm-dd hh:ii',
                }).on('changeDate', function(ev){
                    if(ev.date){
                        $("#EndDate").datetimepicker('setStartDate', new Date(new Date(ev.date.valueOf()).getTime() - 8 * 60 * 60 * 1000));
                    }
                });
                formcontrol.initial();
                //保存
                $('#saveBtn').on('click', function (e) {
                    e.preventDefault();
                    var flags = true;
                    var msg = '';
                    var fromData = $('#Form1').serializeObject();
                    if ($.trim(fromData.Num) == '') {
                        msg += "编号 是必填项<br/>";
                    }
                    if ($.trim(fromData.TotalNumber) == '') {
                        msg += "总票数 是必填项<br/>";
                    }
                    if ($.trim(fromData.Price) == '') {
                        msg += "票价 是必填项<br/>";
                    }
                    if ($.trim(fromData.StartDate) == '') {
                        msg += "出发日期 是必填项<br/>";
                    }
                    if ($.trim(fromData.EndDate) == '') {
                        msg += "到达日期 是必填项<br/>";
                    }
                    if ($.trim(fromData.Route) == '' || $.trim(fromData.Route) == 'QingXuanZeBiaoZhiId') {
                        msg += "路线 是必填项<br/>";
                    }
                    if ($.trim(fromData.Car ) == '' || $.trim(fromData.Car) == 'QingXuanZeBiaoZhiId') {
                        msg += "客车 是必填项<br/>";
                    }
                    if (msg != '') {
                        flags = false;
                        tipdialog.alertMsg(msg);
                    }
                    if (flags) {
                        save();
                    }
                });
                //关闭
                $('#btnclose').click(function () {
                    tipdialog.confirm("确定关闭？", function (r) {
                        if (r) {
                            parent.window.$("#btnSearch").click();
                            popdialog.closeIframe();
                        }
                    });
                });
            };
            //保存
            function save() {
                var jsonData1 = $('#Form1').serializeObject();
                for (var key in jsonData1) {
                    jsonData1[key] = jsonData1[key].replace(/\s/g, "");
                }
                jsonData1.UnitId = userInfo.organId;
                console.log(JSON.stringify(jsonData1));
                //调用新增接口
                helper.Ajax("008808800078", jsonData1, function (data) {
                    if ($.type(data) == "string") {
                        data = helper.StrToJson(data);
                    }
                    if (data.publicresponse.statuscode == 0) {
                        toast.success("创建成功");
                        setTimeout(function () { window.location.href = "List.html"; }, 2000);
                    }
                    else {
                        tipdialog.alertMsg(data.publicresponse.message);
                    }
                }, false);
            };
            initPage();
        });


});
