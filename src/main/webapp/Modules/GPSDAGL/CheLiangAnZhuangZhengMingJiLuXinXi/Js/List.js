define(['/Modules/Config/conwin.main.js'], function () {
    require(['jquery', 'popdialog', 'tipdialog', 'toast', 'helper', 'common', 'tableheadfix', 'system', 'selectcity', 'searchbox', 'customtable', 'bootstrap-datepicker.zh-CN', 'permission'],
        function ($, popdialog, tipdialog, toast, helper, common, tableheadfix, system, selectcity) {
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
                //日志
                $('#btnLog').click(function (e) {
                    e.preventDefault();
                    popdialog.showModal({
                        'url': 'ZiBiaoView2.html',
                        'width': '1000px',
                        'showSuccess': initLogZiBiao
                    });
                });
                //导出
                $('#btnExport').on('click', function (e) {
                    e.preventDefault();
                    var rows = $("#tb_Template").CustomTable('getSelection'), ids = [];
                    var para = $('.searchpanel-form').serializeObject();
                    if (rows != undefined) {
                        $(rows).each(function (i, item) {
                            ids.push(item.data.Id);
                        });
                    }
                    var req;
                    if (ids.length >= 1) {
                        req = { 'ExCheckId': ids };
                    } else {
                        req = para;
                    }

                    helper.Ajax('003300300095', req , function (data) {
                        if (data.body) {
                            var resFileId = data.body.File;
                            window.location.href = helper.Route('00000080005', '1.0', system.ServerAgent) + '?id=' + resFileId;
                        } else {
                            if (data.publicresponse.message == "不存在记录") {
                                tipdialog.errorDialog('导出失败,不存在记录');
                            } else {
                                tipdialog.errorDialog('导出失败');
                            }
                        }
                    });

                });
                //个性化代码块
                //region
                selectCity();
                //endregion
            };
            function initLogZiBiao() {
                $('#btnZiBiao').click(function (e) {
                    $("#tb_Template_zb").CustomTable("reload");

                });

                $("#tb_Template_zb").CustomTable({
                    ajax: helper.AjaxData("003300300098",///"00020003"为接口服务地址，需要在/Config/conwin.system.js中配置
                        function (data) {
                            var pageInfo = { Page: parseInt(data.start / data.length + 1), Rows: data.length };
                            for (var i in data) {
                                delete data[i];
                            }
                            var para = $('#SYS_ChuangJianRen').val();
                            //alert(para);
                            pageInfo.data = para;
                            $.extend(data, pageInfo);
                        }, null),
                    single: false,
                    filter: false,//去掉了表格列筛选，解决表格头漂移
                    ordering: false, /////是否支持排序
                    "dom": 'fr<"table-scrollable"t><"row"<"col-md-2 col-sm-12 pagination-l"l><"col-md-3 col-sm-12 pagination-i"i><"col-md-7 col-sm-12 pagnav pagination-p"p>>',
                    columns: [
                        //{
                        //    render: function (data, type, row) {
                        //        return '<input type=checkbox class=checkboxes />';
                        //    }
                        //},
                        { data: 'SYS_ChuangJianRen' },
                        {
                            data: 'SYS_ChuangJianShiJian', render: function (data, type, row) {
                                if (data.empty == '') return ' ';
                                var notHaveSAndT = data.split('.')[0].split('T');
                                return notHaveSAndT[0] + ' ' + notHaveSAndT[1];
                            }
                        }
                    ],
                    pageLength: 10,
                    "fnDrawCallback": function (oSettings) {
                        tableheadfix.ResetFix();
                       // $('#tb_Template_zb_wrapper .table-scrollable').css({ 'height': '450px', 'overflow-y':'auto'});
                    }
                });
              //  tableheadfix.InitFix(system.OnlyTableFix);
               $("#tb_Template_zb").CustomTable("reload");

            }
            function initlizableTable() {
                $("#tb_Template").CustomTable({
                    ajax: helper.AjaxData("003300300094",///"00020003"为接口服务地址，需要在/Config/conwin.system.js中配置
                        function (data) {
                            var pageInfo = { Page: parseInt(data.start / data.length + 1), Rows: data.length };
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
                        { data: 'ZhengMingBianHao' },
                        { data: 'ChePaiHao' },
                        { data: 'ChePaiYanSe' },
                        {
                            data: 'SYS_ChuangJianShiJian', render: function (data, type, row) {
                                if (data.empty == '') return ' ';
                                var notHaveSAndT = data.split('.')[0].split('T');
                                return notHaveSAndT[0] + ' ' + notHaveSAndT[1];
                            }
                        },
                        {
                            data: 'Do', render: function (data, type, row) {
                                // debugger
                                return '<a href="#" class="Print" name = "WuZhang" data-print=' + row.Id + '>无章打印</a>|<a href="#" class="Print" name="YouZhang" data-print=' + row.Id + '>有章打印</a>';
                            }
                        }

                    ],
                    pageLength: 10,
                    "fnDrawCallback": function (oSettings) {
                        tableheadfix.ResetFix();
                        $('.Print').click(function (e) {//点击打印
                            e.preventDefault();
                           
                            Print($(this).attr('name'), $(this).data('print'));
                        });
                    }
                });
                tableheadfix.InitFix(system.OnlyTableFix);
            };
            //个性化代码块
            //region
            function Print(name, id) {
                var type = 0;//默认无章=0;有章 = 1
                if (name == 'YouZhang') {
                    type = 1;
                }
                helper.Ajax('003300300099', id, function (data) {
                    if (data.body) {
                        window.location.href = 'print.html?id=' + id + '&type=' + type;
                    } else {
                        if (data.publicresponse.message == '该车辆已停运，不允许打印') {
                            tipdialog.errorDialog('该车辆已停运，不允许打印');
                        }
                    }
                });
                //写入打印日志？
                //popdialog.showIframe({
                //    'url': 'print.html',
                //    head: false
                //});

            }
            function selectCity() {
                var defaultOption = '<option value="" selected="selected">请选择</option>';
                $('#XiaQuShi, #XiaQuXian').empty().append(defaultOption);
                selectcity.setXiaQu('00000020005', { "Province": "广东" }, '#XiaQuShi', 'GetCityList', 'CityName');
                $('#XiaQuShi').change(function () {
                    $('#XiaQuXian,#XiaQuZhen').empty().append(defaultOption);
                    var data = { "City": $(this).val() };
                    if ($(this).val() != '') {
                        ///调用接口初始化区县下拉框
                        selectcity.setXiaQu('00000020006', data, '#XiaQuXian', 'GetDistrictList', 'DistrictName');
                    }
                });
                $('#XiaQuXian').change(function () {
                    $('#XiaQuZhen').empty().append(defaultOption);
                    var data = { "District": $(this).val() };
                    if ($(this).val() != '') {
                        ///调用接口初始化区镇下拉框
                        selectcity.setXiaQu('00000020007', data, '#XiaQuZhen', 'GetTownList', 'TownName');
                    }
                });
            };
            //endregion
            initPage();
        });
});