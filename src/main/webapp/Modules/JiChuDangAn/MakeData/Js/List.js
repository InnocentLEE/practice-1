define(['/Modules/Config/conwin.main.js'], function () {
    require(['jquery', 'popdialog', 'tipdialog', 'toast', 'helper', 'common', 'tableheadfix', 'system', 'userinfo' ,'selectcity', 'searchbox', 'customtable', 'bootstrap-datepicker.zh-CN', 'permission'],
    function ($, popdialog, tipdialog, toast, helper, common, tableheadfix, system,userinfo) {
        var userInfo = helper.GetUserInfo();
        var initPage = function () {
            $('#btnShengJi').on('click', function (e) {
                helper.Ajax("008808800100", {}, function (data) {
                    if ($.type(data) == "string") {
                        data = helper.StrToJson(data);
                    }
                    if (data.publicresponse.statuscode == 0) {
                        if (data.body) {
                            toast.success("成功");
                            $("#tb_Template").CustomTable("reload");
                        }
                        else {
                            tipdialog.errorDialog('失败');
                        }
                    }
                    else {
                        tipdialog.alertMsg(data.publicresponse.message);
                    }
                }, false);
            });
            $('#btnShiJi').on('click', function (e) {
                helper.Ajax("008808800101", {}, function (data) {
                    if ($.type(data) == "string") {
                        data = helper.StrToJson(data);
                    }
                    if (data.publicresponse.statuscode == 0) {
                        if (data.body) {
                            toast.success("成功");
                            $("#tb_Template").CustomTable("reload");
                        }
                        else {
                            tipdialog.errorDialog('失败');
                        }
                    }
                    else {
                        tipdialog.alertMsg(data.publicresponse.message);
                    }
                }, false);
            });
            $('#btnKeYunZhan').on('click', function (e) {
                helper.Ajax("008808800102", {}, function (data) {
                    if ($.type(data) == "string") {
                        data = helper.StrToJson(data);
                    }
                    if (data.publicresponse.statuscode == 0) {
                        if (data.body) {
                            toast.success("成功");
                            $("#tb_Template").CustomTable("reload");
                        }
                        else {
                            tipdialog.errorDialog('失败');
                        }
                    }
                    else {
                        tipdialog.alertMsg(data.publicresponse.message);
                    }
                }, false);
            });

            $('#btnKeYunQiYe').on('click', function (e) {
                helper.Ajax("008808800103", {}, function (data) {
                    if ($.type(data) == "string") {
                        data = helper.StrToJson(data);
                    }
                    if (data.publicresponse.statuscode == 0) {
                        if (data.body) {
                            toast.success("成功");
                            $("#tb_Template").CustomTable("reload");
                        }
                        else {
                            tipdialog.errorDialog('失败');
                        }
                    }
                    else {
                        tipdialog.alertMsg(data.publicresponse.message);
                    }
                }, false);
            });

            $('#btnKeYunCheDui').on('click', function (e) {
                helper.Ajax("008808800104", {}, function (data) {
                    if ($.type(data) == "string") {
                        data = helper.StrToJson(data);
                    }
                    if (data.publicresponse.statuscode == 0) {
                        if (data.body) {
                            toast.success("成功");
                            $("#tb_Template").CustomTable("reload");
                        }
                        else {
                            tipdialog.errorDialog('失败');
                        }
                    }
                    else {
                        tipdialog.alertMsg(data.publicresponse.message);
                    }
                }, false);
            });

            $('#btnChe').on('click', function (e) {
                helper.Ajax("008808800105", {}, function (data) {
                    if ($.type(data) == "string") {
                        data = helper.StrToJson(data);
                    }
                    if (data.publicresponse.statuscode == 0) {
                        if (data.body) {
                            toast.success("成功");
                            $("#tb_Template").CustomTable("reload");
                        }
                        else {
                            tipdialog.errorDialog('失败');
                        }
                    }
                    else {
                        tipdialog.alertMsg(data.publicresponse.message);
                    }
                }, false);
            });
        };
        initPage();
    });
});