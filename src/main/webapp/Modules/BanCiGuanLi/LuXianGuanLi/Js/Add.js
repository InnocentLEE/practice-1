define(['/Modules/Config/conwin.main.js'], function () {
    require(['jquery', 'popdialog', 'tipdialog', 'toast', 'helper', 'common', 'formcontrol', 'prevNextpage', 'tableheadfix', 'system', 'selectcity', 'selectCity2', 'filelist', 'metronic', 'searchbox', 'customtable', 'bootstrap-datepicker.zh-CN', 'bootstrap-datetimepicker.zh-CN'],
        function ($, popdialog, tipdialog, toast, helper, common, formcontrol, prevNextpage, tableheadfix, system, selectcity,selectCity2, filelist, Metronic, fileupload) {
            var userInfo = helper.GetUserInfo();
            helper.Ajax("008808800071", userInfo.organId, function (result) {
                if ($.type(result) == "string") {
                    result = helper.StrToJson(result);
                }
                var publicresponse = result.publicresponse;
                var body = result.body;
                if (publicresponse.statuscode == 0) {
                    var reResult = [];
                    reResult.push({ id: "QingXuanZeBiaoZhiId", text: "请选择" });
                    for (var i = 0; i < result.body.length; i++) {
                        reResult.push({ id: body[i].id, text: body[i].stationName });
                    }
                    $("#StartStation").searchbox({
                        data: reResult
                    });
                    $("#EndStation").searchbox({
                        data: reResult
                    });
                    $("#Station1").searchbox({
                        data: reResult
                    });
                    $("#Station2").searchbox({
                        data: reResult
                    });
                    $("#Station3").searchbox({
                        data: reResult
                    });
                    $("#Station4").searchbox({
                        data: reResult
                    });
                    $("#Station5").searchbox({
                        data: reResult
                    });
                    $("#Station6").searchbox({
                        data: reResult
                    });
                    $("#Station7").searchbox({
                        data: reResult
                    });
                    $("#Station8").searchbox({
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
                $('.date-picker').datepicker({ format: 'yyyy-mm-dd', autoclose: true, language: 'zh-CN' });
                formcontrol.initial();
                //保存
                $('#saveBtn').on('click', function (e) {
                    e.preventDefault();
                    var flags = true;
                    var msg = '';
                    var fromData = $('#Form1').serializeObject();
                    if ($.trim(fromData.RouteName) == '') {
                        msg += "路线名 是必填项<br/>";
                    }
                    if ($.trim(fromData.TotalTime) == '') {
                        msg += "总用时 是必填项<br/>";
                    }
                    if ($.trim(fromData.StartStation) == '' || $.trim(fromData.StartStation) == 'QingXuanZeBiaoZhiId') {
                        msg += "起点 是必填项<br/>";
                    }
                    if ($.trim(fromData.EndStation) == '' || $.trim(fromData.EndStation) == 'QingXuanZeBiaoZhiId') {
                        msg += "终点 是必填项<br/>";
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
                helper.Ajax("008808800072", jsonData1, function (data) {
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
