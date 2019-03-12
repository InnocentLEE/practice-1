define(['/Modules/Config/conwin.main.js'], function () {
    require(['jquery', 'popdialog', 'tipdialog', 'toast', 'helper', 'common', 'tableheadfix', 'system', 'userinfo' ,'selectcity', 'searchbox', 'customtable', 'bootstrap-datepicker.zh-CN', 'permission'],
    function ($, popdialog, tipdialog, toast, helper, common, tableheadfix, system,userinfo) {
        var userInfo = helper.GetUserInfo();
        var organizationType = null;
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
            };
        }, false);
        function resetStation() {
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
                $('#RouteName').val('');
                $('#StartStation').val('');
                $('#StartStation').text('请选择');
                $('#EndStation').val('');
                $('#EndStation').text('请选择');
                resetStation();
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

            $("#btnCreateStation").on('click', function (e) {
                e.preventDefault();
                popdialog.showModal({
                    'url': 'AddStation.html',
                    'width': '450px',
                    'showSuccess': CreateStation
                });
            });
            function CreateStation(){
                $("#btnSaveNewStation").on('click', function (e) {
                    var jsonData1 = $('#FormStation').serializeObject();
                    for (var key in jsonData1) {
                        jsonData1[key] = jsonData1[key].replace(/\s/g, "");
                    }
                    jsonData1.UnitId = userInfo.organId;
                    console.log(jsonData1);
                    helper.Ajax("008808800070", jsonData1, function (data) {
                        if ($.type(data) == "string") {
                            data = helper.StrToJson(data);
                        }
                        if (data.publicresponse.statuscode == 0) {
                            toast.success("保存成功!");
                            $('.close').trigger('click');
                            resetStation();
                        }
                        else {
                            tipdialog.alertMsg(data.publicresponse.message);
                        }
                    }, false);
                });
            }
            //启用
            $('#btnUse').on('click', function (e) {
                e.preventDefault();
                var rows = $("#tb_Template").CustomTable('getSelection'), ids = [];
                if (rows == undefined) {
                    tipdialog.errorDialog('请选择需要启用的行');
                    return false;
                }
                var validResult = true;
                $(rows).each(function (i, item) {
                    if (item.data.Status == "1") {
                        validResult = false;
                    }
                    else {
                        ids.push(item.data.Id);
                    }
                });
                if (!validResult) {
                    tipdialog.errorDialog("只能启用状态为禁用的记录");
                    return false;
                }
                if(ids.length > 1) {
                    tipdialog.errorDialog('只能选择一行进行启用');
                    return false;
                }
                tipdialog.confirm("确定要启用选中的记录？", function (r) {
                    if (r) {
                        helper.Ajax("008808800074", ids[0], function (data) {
                            if ($.type(data) == "string") {
                                data = helper.StrToJson(data);
                            }
                            if (data.publicresponse.statuscode == 0) {
                                if (data.body) {
                                    toast.success("启用成功");
                                    $("#tb_Template").CustomTable("reload");
                                }
                                else {
                                    tipdialog.errorDialog('启用失败');
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
                    tipdialog.errorDialog('请选择需要禁用的行');
                    return false;
                }
                var validResult = true;
                $(rows).each(function (i, item) {
                    if (item.data.Status == "0") {
                        validResult = false;
                    }
                    else {
                        ids.push(item.data.Id);
                    }
                });
                if (!validResult) {
                    tipdialog.errorDialog("只能禁用状态为正常的记录");
                    return false;
                }
                if(ids.length > 1) {
                    tipdialog.errorDialog('只能选择一行进行禁用');
                    return false;
                }
                tipdialog.confirm("确定要禁用选中的记录？", function (r) {
                    if (r) {
                        helper.Ajax("008808800075", ids[0], function (data) {
                            if ($.type(data) == "string") {
                                data = helper.StrToJson(data);
                            }
                            if (data.publicresponse.statuscode == 0) {
                                if (data.body) {
                                    toast.success("禁用成功");
                                    $("#tb_Template").CustomTable("reload");
                                }
                                else {
                                    tipdialog.errorDialog('禁用失败');
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
                ajax: helper.AjaxData("008808800073",
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
                         para.RouteName = $('#RouteName').val();
                         para.StartStation = $('#StartStation').val();
                         para.EndStation = $('#EndStation').val();
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
                   { data: 'RouteName' },
                   { data: 'StartStation' },
                   { data: 'EndStation' },
                   { data: 'Station' },
                   { data: 'TotalTime' },
                   {
                       data: 'Status' ,
                       render: function (data, type, row, meta) {
                           if(data == 1)
                               return "正常";
                           if(data == 0)
                               return "禁用";
                       }},
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