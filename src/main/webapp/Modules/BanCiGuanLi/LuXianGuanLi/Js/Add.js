define(['/Modules/Config/conwin.main.js'], function () {
    require(['jquery', 'popdialog', 'tipdialog', 'toast', 'helper', 'common', 'formcontrol', 'prevNextpage', 'tableheadfix', 'system', 'selectcity', 'selectCity2', 'filelist', 'metronic', 'customtable', 'bootstrap-datepicker.zh-CN', 'bootstrap-datetimepicker.zh-CN'],
        function ($, popdialog, tipdialog, toast, helper, common, formcontrol, prevNextpage, tableheadfix, system, selectcity,selectCity2, filelist, Metronic, fileupload) {
            var userInfo = helper.GetUserInfo();
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
                    if ($.trim(fromData.CarNum) == '') {
                        msg += "车牌号码 是必填项<br/>";
                    }
                    if ($.trim(fromData.CarType) == '') {
                        msg += "车牌颜色 是必填项<br/>";
                    }
                    if ($.trim(fromData.LicenceRegistDate) == '') {
                        msg += "行驶证注册日期 是必填项<br/>";
                    }
                    if ($.trim(fromData.LicencePublishDate) == '') {
                        msg += "行驶证发证日期 是必填项<br/>";
                    }
                    if ($.trim(fromData.ErweiDate) == '') {
                        msg += "二维日期 是必填项<br/>";
                    }
                    if ($.trim(fromData.ErweiDateNext) == '') {
                        msg += "下次二维日期 是必填项<br/>";
                    }
                    if ($.trim(fromData.PermitNum) == '') {
                        msg += "道路运输证号 是必填项<br/>";
                    }
                    if ($.trim(fromData.LicenceAddress) == '') {
                        msg += "行驶证地址 是必填项<br/>";
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
                jsonData1.UnitName = userInfo.organizationName;
                jsonData1.OrgType = userInfo.organizationType;
                console.log(JSON.stringify(jsonData1));
                //调用新增接口
                helper.Ajax("008808800060", jsonData1, function (data) {
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
