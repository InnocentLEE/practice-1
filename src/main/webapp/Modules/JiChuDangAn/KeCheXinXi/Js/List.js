define(['/Modules/Config/conwin.main.js'], function () {
    require(['jquery', 'popdialog', 'tipdialog', 'toast', 'helper', 'common', 'tableheadfix', 'system', 'userinfo' ,'selectcity', 'searchbox', 'customtable', 'bootstrap-datepicker.zh-CN', 'permission'],
    function ($, popdialog, tipdialog, toast, helper, common, tableheadfix, system,userinfo) {
        var userInfo = helper.GetUserInfo();
        var organizationType = null;
        if(userInfo.organizationType == "0"){
            organizationType = "平台运营商";
            $("#Status").append("<option value='2'>审核通过</option>");
        }
        if(userInfo.organizationType == "1"){
            organizationType = "省级监管部门";
            $("#Status").append("<option value='2'>审核通过</option>");
        }
        if(userInfo.organizationType == "2"){
            organizationType = "市级监管部门";
            $("#Status").append("<option value='2'>审核通过</option>");
        }
        if(userInfo.organizationType == "3"){
            organizationType = "客运站";
            $("#Status").append("<option value=''>请选择</option>");
            $("#Status").append("<option value='1'>待审核</option>");
            $("#Status").append("<option value='2'>审核通过</option>");
            $("#Status").append("<option value='3'>审核不通过</option>");
        }
        if(userInfo.organizationType == "4"){
            organizationType = "客运企业";
            $("#Status").append("<option value=''>请选择</option>");
            $("#Status").append("<option value='0'>待提交</option>");
            $("#Status").append("<option value='1'>待审核</option>");
            $("#Status").append("<option value='2'>审核通过</option>");
            $("#Status").append("<option value='3'>审核不通过</option>");
        }
        if(userInfo.organizationType == "5"){
            organizationType = "客运车队";
            organizationType = "客运企业";
            $("#Status").append("<option value=''>请选择</option>");
            $("#Status").append("<option value='0'>待提交</option>");
            $("#Status").append("<option value='1'>待审核</option>");
            $("#Status").append("<option value='2'>审核通过</option>");
            $("#Status").append("<option value='3'>审核不通过</option>");
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
                $('.searchpanel-form').find('input[type=text]:not(:disabled), select:not(:disabled)').val('');
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

            //查看
            $('#btnView').on('click', function (e) {
                e.preventDefault();
                var rows = $("#tb_Template").CustomTable('getSelection'), ids = [];
                if (rows == undefined) {
                    tipdialog.errorDialog('请选择需要查看的行');
                    return false;
                }
                //TODO:编写逻辑
                $(rows).each(function (i, item) {
                    ids.push(item.data.Id);
                });
                $('#hdIDS').val(ids.join(','));
                popdialog.showIframe({
                    'url': 'View.html',
                    head: false
                });
            });

            //删除
            $('#btnDel').on('click', function (e) {
                e.preventDefault();
                var rows = $("#tb_Template").CustomTable('getSelection'), ids = [];
                if (rows == undefined) {
                    tipdialog.errorDialog('请选择需要删除的行');
                    return false;
                }
                $(rows).each(function (i, item) {
                    ids.push(item.data.Id);
                });
                if(ids.length > 1) {
                    tipdialog.errorDialog('只能选择一行进行删除');
                    return false;
                }
                tipdialog.confirm("确定要删除选中的记录？", function (r) {
                    if (r) {
                        helper.Ajax("008808800064", ids[0], function (data) {
                            if ($.type(data) == "string") {
                                data = helper.StrToJson(data);
                            }
                            if (data.publicresponse.statuscode == 0) {
                                if (data.body) {
                                    toast.success("删除成功");
                                    $("#tb_Template").CustomTable("reload");
                                }
                                else {
                                    tipdialog.errorDialog('删除失败');
                                }
                            }
                            else {
                                tipdialog.alertMsg(data.publicresponse.message);
                            }
                        }, false);
                    }
                });
            });

            //提交
            $('#btnSubmit').on('click', function (e) {
                e.preventDefault();
                var rows = $("#tb_Template").CustomTable('getSelection'), ids = [];
                if (rows == undefined) {
                    tipdialog.errorDialog('请选择需要提交的行');
                    return false;
                }
                var validResult = true;
                $(rows).each(function (i, item) {
                    if (!(item.data.Status == "0" || item.data.Status == "3")) {
                        validResult = false;
                    }
                    else {
                        ids.push(item.data.Id);
                    }
                });
                if (!validResult) {
                    tipdialog.errorDialog("只能提交审核不通过或待提交的记录");
                    return false;
                }
                if(ids.length > 1) {
                    tipdialog.errorDialog('只能选择一行进行提交');
                    return false;
                }
                tipdialog.confirm("确定要提交选中的记录？", function (r) {
                    if (r) {
                        helper.Ajax("008808800066", ids[0], function (data) {
                            if ($.type(data) == "string") {
                                data = helper.StrToJson(data);
                            }
                            if (data.publicresponse.statuscode == 0) {
                                if (data.body) {
                                    toast.success("提交成功");
                                    $("#tb_Template").CustomTable("reload");
                                }
                                else {
                                    tipdialog.errorDialog('删除失败');
                                }
                            }
                            else {
                                tipdialog.alertMsg(data.publicresponse.message);
                            }
                        }, false);
                    }
                });
            });

            //更新
            $('#btnEdit').on('click', function (e) {
                e.preventDefault();
                var rows = $("#tb_Template").CustomTable('getSelection'), ids = [];
                if (rows == undefined) {
                    tipdialog.errorDialog('请选择需要修改的行');
                    return false;
                }
                var validResult = true;
                if(userInfo.organizationType == "3"){
                    $(rows).each(function (i, item) {
                        if (item.data.Status != "2") {
                            validResult = false;
                        }
                        else {
                            ids.push(item.data.Id);
                        }
                    });
                    if (!validResult) {
                        tipdialog.errorDialog("只能选择审核通过的记录");
                        return false;
                    }
                }
                if(userInfo.organizationType == "5" || userInfo.organizationType == "4"){
                    $(rows).each(function (i, item) {
                        if (!(item.data.Status == "0" || item.data.Status == "3")){
                            validResult = false;
                        }
                        else {
                            ids.push(item.data.Id);
                        }
                    });
                    if (!validResult) {
                        tipdialog.errorDialog("只能选择待提交或审核不通过的记录");
                        return false;
                    }
                }
                $('#hdIDS').val(ids.join(','));
                popdialog.showIframe({
                    'url': 'Edit.html',
                    head: false
                });
            });

            //审核
            $('#btnCheck').on('click', function (e) {
                e.preventDefault();
                var rows = $("#tb_Template").CustomTable('getSelection'), ids = [];
                if (rows == undefined) {
                    tipdialog.errorDialog('请选择需要审核的行');
                    return false;
                }
                var validResult = true;
                $(rows).each(function (i, item) {
                    if (item.data.Status != "1") {
                        validResult = false;
                    }
                    else {
                        ids.push(item.data.Id);
                    }
                });
                if (!validResult) {
                    tipdialog.errorDialog("只能选择待审核的记录");
                    return false;
                }
                if(ids.length > 1) {
                    tipdialog.errorDialog('只能选择一行进行审核');
                    return false;
                }
                checkPower(function () {
                    popdialog.showModal({
                        'url': 'TanKuang.html',
                        'width': '300px',
                        'showSuccess': function () {
                            initSubmitCheck(ids);
                        }
                    });
                }, ids);
            });

            function checkPower(callback,ids) {
                callback();
            };

            function initSubmitCheck(ids) {
                $('#AddZiBiaoSure').on('click', function (e) {
                    var isSure = $("input[name='isSure']:checked").val();
                    if (typeof (isSure) == 'undefined') {
                        tipdialog.errorDialog('请选择审核结果');
                        return false;
                    }
                    var jsonData = { "Id": ids[0], "Status": isSure };
                    SubmitCheck(jsonData, function () {
                        popdialog.closeModal();
                        $("#tb_Template").CustomTable("reload");
                    });
                });
            };

            function SubmitCheck(array, callback) {
                helper.Ajax("008808800065", array, function (data) {
                    if ($.type(data) == "string") {
                        data = helper.StrToJson(data);
                    }
                    if (data.publicresponse.statuscode == 0) {
                        if (data.body) {
                            toast.success("审核成功");
                            if (typeof callback == 'function') {
                                popdialog.closeModal();
                                $("#tb_Template").CustomTable("reload");
                            }
                        }
                        else {
                            tipdialog.alertMsg("审核失败");
                        }
                    }
                    else {
                        tipdialog.alertMsg(data.publicresponse.message);
                    }
                }, false);
            };

        };

        function initlizableTable() {
            $("#tb_Template").CustomTable({
                ajax: helper.AjaxData("008808800061",
                     function (data) {
                         var pageInfo = { Page: data.start / data.length + 1, Rows: data.length };
                         for (var i in data) {
                             delete data[i];
                         }
                         var para = $('.searchpanel-form').serializeObject();
                         $('.searchpanel-form').find('[disabled]').each(function (i, item) {
                             para[$(item).attr('name')] = $(item).val();
                         });
                         para.OrgType = userInfo.organizationType;
                         para.UnitId = userInfo.organId;
                         pageInfo.data = para;
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
                   { data: 'CarNum' },
                   {
                       data: 'CarType' ,
                       render: function (data, type, row, meta) {
                           if(data == '1')
                               return "蓝色";
                           if(data == '2')
                               return "黄色";
                           if(data == '3')
                               return "白色";
                           if(data == '4')
                               return "黑色";
                           if(data == '5')
                               return "绿色";
                       }},
                    { data: 'UnitName' },
                    {
                        data: 'Status' ,
                        render: function (data, type, row, meta) {
                            if(data == '0')
                                return "待提交";
                            if(data == '1')
                                return "待审核";
                            if(data == '2')
                                return "审核通过";
                            if(data == '3')
                                return "审核不通过";
                        }},
                   { data: 'PermitNum'}
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