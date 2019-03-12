define(['/Modules/Config/conwin.main.js'], function () {
    require(['jquery', 'popdialog', 'tipdialog', 'toast', 'helper', 'common', 'tableheadfix', 'system', 'userinfo' ,'selectcity', 'searchbox', 'customtable', 'bootstrap-datepicker.zh-CN', 'permission'],
    function ($, popdialog, tipdialog, toast, helper, common, tableheadfix, system,userinfo) {
        var userInfo = helper.GetUserInfo();
        var organizationType = null;
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
        function resetChoose() {
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
        }
        if(userInfo.organizationType == "0"){
            organizationType = "平台运营商";
        }
        if(userInfo.organizationType == "1"){
            organizationType = "省级监管部门";
        }
        if(userInfo.organizationType == "2"){
            organizationType = "市级监管部门";
        }
        if(userInfo.organizationType == "3"){
            organizationType = "客运站";
        }
        if(userInfo.organizationType == "4"){
            organizationType = "客运企业";
        }
        if(userInfo.organizationType == "5"){
            organizationType = "客运车队";
        }
        $(".popedom").text(userInfo.organizationName+" ["+organizationType+"] - "+userInfo.organProvince + userInfo.organCity);
        console.log(userInfo);
        var initPage = function () {
            //初始化table
            initlizableTable();
            //查询
            $('#btnSearch').click(function (e) {
                e.preventDefault();
                $("#tb_Template").CustomTable("reload");
            });

            //重置
            $("#btnReset").click(function (e) {
                e.preventDefault();
                $('#Num').val('');
                $('#ArrangeType').val('');
                $('#Route').val('');
                $('#Route').text('请选择');
                $('#Car').val('');
                $('#Car').text('请选择');
                resetChoose();
            });

            //新增
            $("#btnCreate").click(function (e) {
                e.preventDefault();
                //TODO:编写逻辑
                popdialog.showIframe({
                    'url': 'Add.html',
                    head: false
                });
            });

            //启用
            $('#btnUse').on('click', function (e) {
                e.preventDefault();
                var rows = $("#tb_Template").CustomTable('getSelection'), ids = [];
                if (rows == undefined) {
                    tipdialog.errorDialog('请选择需要恢复的行');
                    return false;
                }
                var validResult = true;
                $(rows).each(function (i, item) {
                    if (item.data.isCancle == "正常") {
                        validResult = false;
                    }
                    else {
                        ids.push(item.data.Id);
                    }
                });
                if (!validResult) {
                    tipdialog.errorDialog("只能恢复状态为已取消的记录");
                    return false;
                }
                if(ids.length > 1) {
                    tipdialog.errorDialog('只能选择一行进行恢复');
                    return false;
                }
                tipdialog.confirm("确定要恢复选中的记录？", function (r) {
                    if (r) {
                        helper.Ajax("008808800080", ids[0], function (data) {
                            if ($.type(data) == "string") {
                                data = helper.StrToJson(data);
                            }
                            if (data.publicresponse.statuscode == 0) {
                                if (data.body) {
                                    toast.success("恢复成功");
                                    $("#tb_Template").CustomTable("reload");
                                }
                                else {
                                    tipdialog.errorDialog('恢复失败');
                                }
                            }
                            else {
                                tipdialog.alertMsg(data.publicresponse.message);
                            }
                        }, false);
                    }
                });
            });

            //禁用
            $('#btnStop').on('click', function (e) {
                e.preventDefault();
                var rows = $("#tb_Template").CustomTable('getSelection'), ids = [];
                if (rows == undefined) {
                    tipdialog.errorDialog('请选择需要取消的行');
                    return false;
                }
                var validResult = true;
                $(rows).each(function (i, item) {
                    if (item.data.isCancle == "已取消") {
                        validResult = false;
                    }
                    else {
                        ids.push(item.data.Id);
                    }
                });
                if (!validResult) {
                    tipdialog.errorDialog("只能取消状态为正常的记录");
                    return false;
                }
                if(ids.length > 1) {
                    tipdialog.errorDialog('只能选择一行进行取消');
                    return false;
                }
                tipdialog.confirm("确定要取消选中的记录？", function (r) {
                    if (r) {
                        helper.Ajax("008808800081", ids[0], function (data) {
                            if ($.type(data) == "string") {
                                data = helper.StrToJson(data);
                            }
                            if (data.publicresponse.statuscode == 0) {
                                if (data.body) {
                                    toast.success("取消成功");
                                    $("#tb_Template").CustomTable("reload");
                                }
                                else {
                                    tipdialog.errorDialog('取消失败');
                                }
                            }
                            else {
                                tipdialog.alertMsg(data.publicresponse.message);
                            }
                        }, false);
                    }
                });
            });

        };

        function initlizableTable() {
            $("#tb_Template").CustomTable({
                ajax: helper.AjaxData("008808800079",
                     function (data) {
                         var pageInfo = { Page: data.start / data.length + 1, Rows: data.length };
                         for (var i in data) {
                             delete data[i];
                         }
                         /*
                         var para = $('.searchpanel-form').serializeObject();
                         $('.searchpanel-form').find('[disabled]').each(function (i, item) {
                             para[$(item).attr('name')] = $(item).val();
                         });
                         */
                         var para = {};
                         para.Num = $('#Num').val();
                         para.ArrangeType = $('#ArrangeType').val();
                         para.Route = $('#Route').val();
                         para.Car = $('#Car').val();
                         para.UnitId = userInfo.organId;
                         data.data = para;
                         $.extend(data, pageInfo);
                     }, null),
                single: false,
                filter: true,
                ordering: true, /////是否支持排序
                "dom": 'fr<"table-scrollable"t><"row"<"col-md-2 col-sm-12 pagination-l"l><"col-md-3 col-sm-12 pagination-i"i><"col-md-7 col-sm-12 pagnav pagination-p"p>>',
                columns: [
                {
                    render: function (data, type, row) {
                        return '<input type=checkbox class=checkboxes />';
                    }
                },
                   { data: 'Num' },
                   { data: 'CarNum' },
                   { data: 'CarType' },
                   { data: 'ArrangeType' },
                   { data: 'StartStation' },
                   { data: 'EndStation' },
                   { data: 'Station' },
                   { data: 'Price' },
                   { data: 'LeaveNumber' },
                   { data: 'StartTime' },
                   { data: 'EndTime' },
                   { data: 'isCancle' },

                ],
                pageLength: 10,
                "fnDrawCallback": function (oSettings) {
                    tableheadfix.ResetFix();
                }
            });
            tableheadfix.InitFix(system.OnlyTableFix);
        };
        initPage();
    });
});