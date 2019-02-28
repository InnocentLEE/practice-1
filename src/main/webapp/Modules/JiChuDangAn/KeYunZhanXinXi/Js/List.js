define(['/Modules/Config/conwin.main.js'], function () {
    require(['jquery', 'popdialog', 'tipdialog', 'toast', 'helper', 'common', 'tableheadfix', 'system', 'userinfo' ,'selectcity', 'searchbox', 'customtable', 'bootstrap-datepicker.zh-CN', 'permission'],
    function ($, popdialog, tipdialog, toast, helper, common, tableheadfix, system,userinfo) {
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

        };

        function initlizableTable() {
            $("#tb_Template").CustomTable({
                ajax: helper.AjaxData("008808800011",
                     function (data) {
                         var pageInfo = { Page: data.start / data.length + 1, Rows: data.length };
                         for (var i in data) {
                             delete data[i];
                         }
                         var para = $('.searchpanel-form').serializeObject();
                         $('.searchpanel-form').find('[disabled]').each(function (i, item) {
                             para[$(item).attr('name')] = $(item).val();
                         });
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
                       { data: 'Province' },
                        { data: 'Province' },
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