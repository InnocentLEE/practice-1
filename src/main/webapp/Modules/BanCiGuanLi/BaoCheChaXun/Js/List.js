define(['/Modules/Config/conwin.main.js'], function () {
    require(['jquery', 'popdialog', 'tipdialog', 'toast', 'helper', 'common', 'tableheadfix', 'system', 'userinfo' ,'selectcity', 'searchbox', 'customtable', 'bootstrap-datepicker.zh-CN', 'permission'],
    function ($, popdialog, tipdialog, toast, helper, common, tableheadfix, system,userinfo) {
        var userInfo = helper.GetUserInfo();
        var organizationType = null;
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
                $('#Car').val('');
                $('#Car').text('请选择');
                resetChoose();
            });
        };

        function initlizableTable() {
            $("#tb_Template").CustomTable({
                ajax: helper.AjaxData("008808800083",
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
                   { data: 'StartStation' },
                   { data: 'EndStation' },
                   { data: 'Price' },
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