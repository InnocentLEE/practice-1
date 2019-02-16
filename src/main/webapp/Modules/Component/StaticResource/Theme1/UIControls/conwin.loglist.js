/**
 * 业务日志嵌入表单控件
 */
define(['jquery', 'system', 'popdialog', 'warning', 'toast', 'customtable', 'helper'], function ($, SystemConfig, popdialog, warning, toast, customtable, helper) {
    var loglist = {};

    // require(['helper'], function (CwHelper) {

    var defaults = {
        moduleId: null, //模块Id
        businessItemId: null, //业务对象Id
        moduleNumber: null, //模块编号
        businessItemNumber: null, //业务对象标识
        single: false, //是否单选
        filter: false, //过滤功能
        ordering: false, //是否排序
        dateFormat: 'yyyy-MM-dd HH:mm:ss',
        pageLength: 10, //默认条数
        emptyTips:'无变更记录'
    };
    //初始化日志列表
    $.fn.loglist = function (options) {
        var $item = $(this);
        var options = $.extend({}, defaults, options);
        if (!(options.moduleId || options.moduleNumber)) {
            warning.errorDialog('moduleNumber 必须赋值');
            return false;
        }
        if (!(options.businessItemId || options.businessItemNumber)) {
            warning.errorDialog('businessItemId或businessItemNumber 必须赋值一个');
            return false;
        }
        $(this).html('');
        $(this).append(ListHtml);
        var tips = gettips(options.emptyTips)
        $("#tab_tb_loginfo", this).on('click', 'a[data-id]',
            function (e) {
                e.preventDefault();
                var id = $(this).data('id')
                popdialog.showModalHtml({
                    'html': modelHtml,
                    'width': 'large',
                    'showSuccess': function () {
                        helper.Ajax('00000090005', id, function (response) {
                            if (response.publicresponse.statuscode === 0) {
                                var html = '';
                                var array = response.body;
                                for (var index = 0; index < array.length; index++) {
                                    var element = array[index];
                                    html += '<tr><td>' + element.PropertyDescription + '</td><td>' + element.BeforeValue + '</td><td>' + element.AfterValue + '</td></tr>';
                                }
                                $('#tab_tb_loginfo_modal tbody').html(html)
                                if (html == '') {
                                    $('#tab_tb_loginfo_modal  .modal-body').append(tips);
                                }
                            } else {
                                warning.errorDialog(response.publicresponse.message);
                            }
                        })
                    }
                });
            })

        ///绑定列表
        $("#tab_tb_loginfo").CustomTable({
            ajax: helper.AjaxData("00000090004",
                function (data) {
                    var pageInfo = { Page: parseInt(data.start / data.length) + 1, Rows: data.length };
                    for (var i in data) {
                        delete data[i];
                    }
                    var para = {
                        YeWuDuiXiangID: options.businessItemId,
                        YeWuDuiXiangBiaoShi: options.businessItemNumber,
                        MoKuaiBianHao: options.moduleNumber,
                    };
                    pageInfo.data = para;
                    $.extend(data, pageInfo);
                }, null),
            single: options.single,
            filter: options.filter,
            ordering: options.ordering, /////是否支持排序
            dom: 'fr<"table-scrollable"t><"row"<"col-md-2 col-sm-12 pagination-l"l><"col-md-3 col-sm-12 pagination-i"i><"col-md-7 col-sm-12 pagnav pagination-p"p>>',
            columns: [{
                data: "XuHao",
                render: function (data, type, row, config) {
                    return config.row + 1;
                }
            },
                { data: 'YeWuBanLiRen', orderable: true },
                { data: 'YeWuBanLiDanWei', orderable: true },
                {
                    data: 'YeWuBanLiShiJian',
                    render: function (data, type, row) {
                        var time = loglist.ParseDateToObject(row.YeWuBanLiShiJian);
                        return time.Format(options.dateFormat);
                    },
                    orderable: true
                },
                {
                    data: "ChangeInfo",
                    render: function (data, type, row) {
                        return "<a class='btn btn-primary' data-id='" + row.Id + "'>查看</a>"
                    }
                },

            ],
            pageLength: options.pageLength
        });
        $("#tab_tb_loginfo").CustomTable("reload");
        //删除附件
    };

    loglist.ParseDateToObject = function (str) {
        var s = str.split(/\D/); // 分割日期字串
        var d = new Date(s[0], s[1] - 1, s[2], s[3] || '', s[4] || '', s[5] || '');
        return d;
    }

    var gettips = function (tip) {
        return '<p style="text-align: center;font-size: 14px;padding: 6px 0px;background: #ececec;">' + tip + '</p>';
    }
    var ListHtml = (function () {
        var html = '';
        html += '<div class="page-container">';
        html += '<div class="page-content-wrapper">';
        html += '<div class="page-content" style="margin-left:0!important;margin-top:0px;">';
        html += '<table id="tab_tb_loginfo" class="table table-striped table-bordered table-hover">';
        html += '<thead>';
        html += '<tr>';
        html += '<th data-name="XuHao">序号</th>';
        html += '<th data-name="YeWuBanLiRen">办理人</th>';
        html += '<th data-name="YeWuBanLiDanWei">办理单位名称</th>';
        html += '<th data-name="YeWuBanLiShiJian">变更时间</th>';
        html += '<th data-name="ChangeInfo">变更信息</th>';
        html += '</tr>';
        html += '</thead>';
        html += '<tbody><tr class="odd gradeX"><td valign="top" colspan="5" class="dataTables_empty">请先进行查询</td></tr></tbody>';
        html += '</table>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        return html;
    })()
    var modelHtml = (function () {
        var html = '<style>#tab_tb_loginfo_modal th{text-align:center;min-width:89px}#tab_tb_loginfo_modal tbody{max-height:100px;overflow:auto;}</style>';
        html += '<div class="modal-dialog">'
        html += '<div class="modal-content" id="tab_tb_loginfo_modal">'
        html += '<div class="modal-header">'
        html += '<button type="button" class="close" aria-hidden="true"></button>'
        html += '<h4 class="modal-title">变更信息</h4>'
        html += '</div>'
        html += '<div class="modal-body">'
        html += '<table class="table table-hover text-center" style="margin-bottom:0px;">'
        html += '<thead><tr><th>属性名称</th><th>变更前</th><th>变更后</th></tr></thead><tbody></tbody></table>'
        html += '</div>'
        html += '</div>'
        html += '</div>'
        return html;
    })()
    return loglist;
});