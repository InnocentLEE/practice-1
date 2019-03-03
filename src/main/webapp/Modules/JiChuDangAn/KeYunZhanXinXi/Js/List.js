define(['/Modules/Config/conwin.main.js'], function () {
    require(['jquery', 'popdialog', 'tipdialog', 'toast', 'helper', 'common', 'tableheadfix', 'system', 'userinfo' ,'selectcity', 'searchbox', 'customtable', 'bootstrap-datepicker.zh-CN', 'permission'],
    function ($, popdialog, tipdialog, toast, helper, common, tableheadfix, system,userinfo) {
        var userInfo = helper.GetUserInfo();
        var organizationType = null;
        if(userInfo.organizationType == "0"){
            organizationType = "平台运营商"
        }
        if(userInfo.organizationType == "1"){
            organizationType = "省级监管部门"
        }
        if(userInfo.organizationType == "2"){
            organizationType = "市级监管部门"
        }
        if(userInfo.organizationType == "3"){
            organizationType = "客运站"
        }
        if(userInfo.organizationType == "4"){
            organizationType = "客运企业"
        }
        if(userInfo.organizationType == "5"){
            organizationType = "客运车队"
        }
        $(".popedom").text(userInfo.organizationName+" ["+organizationType+"] - "+userInfo.organProvince + userInfo.organCity);
        if(userInfo.organProvince != null && userInfo.organProvince != ''){
            $("#Province").attr("disabled","disabled");
            $("#Province").val(userInfo.organProvince);
            if (userInfo.organizationType == 2){
                $("#City").val(userInfo.organCity);
                $("#City").text(userInfo.organCity);
                $("#City").attr("disabled","disabled");
            }
            var arr = helper.getCity(userInfo.organProvince);
            // 循环动态添加option
            for (var i = 0; i < arr.length ; i++) {
                $("#City").append("<option value='"+arr[i]+"'>"+arr[i]+"</option>");
            }
            $("#Province").change(function(){
                var province = $("#Province").val();
                $("#City").empty();
                var arr = helper.getCity(province);
                // 循环动态添加option
                $("#City").append("<option value=''>"+"请选择"+"</option>");
                for (var i = 0; i < arr.length ; i++) {
                    $("#City").append("<option value='"+arr[i]+"'>"+arr[i]+"</option>");
                }
            });
        }

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

            //更新
            $('#btnEdit').on('click', function (e) {
                e.preventDefault();
                var rows = $("#tb_Template").CustomTable('getSelection'), ids = [];
                if (rows == undefined) {
                    tipdialog.errorDialog('请选择需要修改的行');
                    return false;
                }
                $(rows).each(function (i, item) {
                    ids.push(item.data.Id);
                });
                $('#hdIDS').val(ids.join(','));
                popdialog.showIframe({
                    'url': 'Edit.html',
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
                        helper.Ajax("008808800034", ids[0], function (data) {
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

        };

        function initlizableTable() {
            $("#tb_Template").CustomTable({
                ajax: helper.AjaxData("008808800031",
                    function (data) {
                        var pageInfo = { Page: data.start / data.length + 1, Rows: data.length };
                        for (var i in data) {
                            delete data[i];
                        }
                        var para = $('.searchpanel-form').serializeObject();
                        $('.searchpanel-form').find('[disabled]').each(function (i, item) {
                            para[$(item).attr('name')] = $(item).val();
                        });
                        //para.Province = userInfo.organProvince;
                        // para.City = userInfo.organCity;
                        //para.ParentUnitId = userInfo.organId;
                        para.OrgType = userInfo.organizationType;
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
                    { data: 'UnitName' },
                    { data: 'Popedom' },
                    {
                        data: 'BusinessType' ,
                        render: function (data, type, row, meta) {
                            if(data == '1')
                                return "国有企业";
                            if(data == '2')
                                return "民营企业";
                            if(data == '3')
                                return "外资独资";
                            if(data == '4')
                                return "中外合资";
                            if(data == '5')
                                return "其他";
                        }},
                    {
                        data: 'InNetDate' ,
                        render: function (data, type, row, meta) {
                            return helper.LongDateToDate(data);
                        }},
                    { data: 'ContactMen'}
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