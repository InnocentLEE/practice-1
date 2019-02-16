define(['jquery', 'system', 'warning', 'toast', 'customtable', 'fileupload', 'helper'], function ($, SystemConfig, warning, toast, customtable, fileupload, CwHelper) {
    var filelist = {};

    // require(['helper'], function (CwHelper) {

    var defaults = {
        type: 'edit',//列表类型:edit是编辑页面的附件列表,list是所有附件的列表
        appId: SystemConfig.AppId,//应用Id
        appName: SystemConfig.AppName,//应用名称
        systemId: SystemConfig.SysId,//系统Id
        businessType: null,//业务类型
        businessId: null,//业务Id
        single: false,//是否单选
        filter: false,//过滤功能
        ordering: false,//排序
        timeOut: '10000',//超时时间
        dateFormat: 'yyyy-MM-dd HH:mm:ss',
        pageLength: 10,//默认条数
        lengthMenu: [
            [10, 20, 50, 100, 200],
            [10, 20, 50, 100, 200]
        ],
    };

    //初始化附件列表
    $.fn.filelist = function (options) {
        var options = $.extend({}, defaults, options);
        if (options.type == 'edit') {
            if (!options.businessId) {
                warning.errorDialog('businessId必须赋值');
                return false;
            }
        }
        $(this).html('');
        $(this).append(getListHtml());
        $("input[type=checkbox]").uniform();

        $('#btnCreate').fileupload({
            type: 'list',
            appId: options.appId,
            appName: options.appName,
            systemId: options.systemId,
            businessType: options.businessType,
            businessId: options.businessId,
            timeOut: options.timeOut
        });

        if (options.type == 'view') {
            $('#btnCreate').remove();
            $('#btnRemove').remove();
        }

        ///绑定列表
        $("#sample_1").CustomTable({
            ajax: CwHelper.AjaxData("00000080002",
                function (data) {
                    var pageInfo = { Page: parseInt(data.start / data.length) + 1, Rows: data.length };
                    for (var i in data) {
                        delete data[i];
                    }
                    pageInfo.SystemId = options.systemId;
                    pageInfo.AppName = options.appName;
                    pageInfo.AppId = options.appId;
                    pageInfo.BusinessType = options.businessType;
                    pageInfo.BusinessId = options.businessId;
                    $.extend(data, pageInfo);
                }, null),
            single: options.single,
            filter: options.filter,
            ordering: options.ordering, /////是否支持排序
            dom: 'fr<"table-scrollable"t><"row"<"col-md-2 col-sm-12 pagination-l"l><"col-md-3 col-sm-12 pagination-i"i><"col-md-7 col-sm-12 pagnav pagination-p"p>>',
            columns: [
                {
                    data: "FileId",
                    render: function (data, type, row) {
                        return '<input type=checkbox class=checkboxes value=' + data + ' />';
                    }
                },
                { data: 'AttachDisName', orderable: true },
                { data: 'Extension', orderable: true },
                { data: 'AttachSize', orderable: true },
                {
                    data: "CreateTime",
                    render: function (data, type, row) {
                        var time = filelist.ParseDateToObject(data);
                        return time.Format(options.dateFormat);
                    },
                    orderable: true
                },
                { data: "AttachRemark", orderable: true },
                {
                    data: "",
                    render: function (data, type, row) {
                        var url = CwHelper.Route('00000080005', '1.0', SystemConfig.ServerAgent) + '?id=' + row.FileId;
                        return '<a href="' + url + '" class="btn default btn-xs blue" ><i class="fa fa-download"></i>  下载  </a>';
                    }
                }
            ],
            pageLength: options.pageLength,
            lengthMenu: options.lengthMenu

        });
        $("#sample_1").CustomTable("reload");

        //删除附件
        $('#btnRemove').on('click', function () {
            var rows = $('#sample_1').CustomTable('getSelection'), idStr = '', idArray = [];
            if (rows) {
                $(rows).each(function (i, item) {
                    idArray.push(item.data.FileId);
                });
                idStr = idArray.join(',');
                warning.confirm('确定要删除选中的记录吗？', function (r) {
                    if (r) {
                        CwHelper.Ajax("00000080003", idStr, function (data) {
                            if (!data.body) {
                                warning.errorDialog(data.publicresponse.message);
                            }
                            else {
                                toast.success('删除成功!',
                                    {
                                        onShown: function () { $("#sample_1").CustomTable("reload"); }
                                    });
                            }
                        });
                    }
                });
            }
            else {
                warning.alertMsg('请选择需要操作的行');
            }
        });
    };

    filelist.ParseDateToObject = function (str) {
        var s = str.split(/\D/); // 分割日期字串
        var d = new Date(s[0], s[1] - 1, s[2], s[3] || '', s[4] || '', s[5] || '');
        return d;
    }


    var getListHtml = function () {
        var html = '';
        html += '<div class="page-container">';
        html += '<div class="page-content-wrapper">';
        html += '<div  style="margin-left:10px">';
        html += '<div class="row">';
        html += '<div class="col-md-9">';
        html += '<div class="form-group">';
        html += '<a id="btnCreate" accesskey="c" title="快捷键 Alt + C" class="btn  c-cyan" href="javascript:;"><i class="fa fa-plus"></i>&nbsp;新增</a>';
        html += '<a id="btnRemove" accesskey="x" title="快捷键 Alt + X" class="btn  c-green" href="javascript:;"><i class="fa fa-remove"></i>&nbsp;删除</a>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<table id="sample_1" class="table table-striped table-bordered table-hover">';
        html += '<thead>';
        html += '<tr>';
        html += '<th class="table-checkbox" style="background: none; padding-right:8px;cursor:default;"><input type="checkbox" class="group-checkable" title="全选/反选"></th>';
        html += '<th data-name="AttachDisName">文件名称</th>';
        html += '<th data-name="Extension">文件类型</th>';
        html += '<th data-name="AttachSize">文件大小</th>';
        html += '<th data-name="CreateTime">上传时间</th>';
        html += '<th data-name="AttachRemark">备注</th>';
        html += '<th>操作</th>';
        html += '</tr>';
        html += '</thead>';
        html += '<tbody><tr class="odd gradeX"><td valign="top" colspan="19" class="dataTables_empty">请先进行查询</td></tr></tbody>';
        html += '</table>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        return html;
    }

    //});

    return filelist;

});


