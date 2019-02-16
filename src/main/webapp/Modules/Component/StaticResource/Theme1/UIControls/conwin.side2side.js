define([
    'jquery',
    'helper',
    'datatables',
    'dataTables.bootstrap'
], function($, helper) {
    'use strict';
    /**
     * 数据变化类
     */
    function Changedata(table) {
        this.table = table;
        this.AddData = new Array();
        this.RemoveData = new Array();
    };

    /**
     * 数据交换
     * @param {*} src 
     * @param {*} des 
     * @param {*} data 
     */
    function _dataExchange(src, des, data) {
        var aindex = src.AddData.contains(data);
        if (aindex != -1) {
            src.AddData.remove(aindex);
        } else {
            src.RemoveData.push(data);
        }
        var rindex = des.RemoveData.contains(data)
        if (rindex != -1) {
            des.RemoveData.remove(rindex);
        } else {
            des.AddData.push(data);
        }
    }

    /**
     * 数组判断元素是否包含，若包含返回下标，若不包含返回-1
     */
    Array.prototype.contains = function(obj) {  
        var i = this.length;  
        while (i--) {    
            if (this[i] === obj) {      
                return i;    
            }  
        }  
        return -1;
    }

    /**
     * @param {Number} dx
     * 数组移除元素，dx为下标
     */
    Array.prototype.remove = function(dx) {  
        if (isNaN(dx) || dx > this.length) { return false; }  
        this.splice(dx, 1);
    }

    function checkAction(e, table, _this) {
        if (!$(e.target).hasClass('select-ignore') && $(e.target).parents('.select-ignore').length <= 0) {
            if (!$(e.target).is('input[type="checkbox"]')) {
                $('.checkboxes', $(_this)).trigger('click');
                //$.uniform.update();
            }
            $(_this).toggleClass('selected', $('.checkboxes', $(_this)).prop('checked'));
        }
        if ($('.checkboxes:checked', table).length == $('.checkboxes', table).length) {
            $('.group-checkable', table).attr("checked", true);
            $('.group-checkable', table).parent('span').addClass('checked');
        } else {
            $('.group-checkable', table).attr("checked", false);
            $('.group-checkable', table).parent('span').removeClass('checked');
        }
    }


    $.fn.SideToSide = function(option) {
        var sideToSide = {}

        $(this).each(function(i, item) {
            var opt = {},
                table1option = {},
                table2option = {};
            $.extend(table1option, TableOption, option.table1);
            $.extend(table2option, TableOption, option.table2);
            opt = $.extend($.fn.SideToSide.defaults, option);
            var $item = $(item);
            var table1 = $(table1option.flag, $item);
            table1.data('login', table1option.login);
            var table2 = $(table2option.flag, $item);
            table2.data('login', table2option.login);
            table1option.columns = opt.columns;
            table2option.columns = opt.columns;
            if (!opt.islocal) {
                table1option.serverSide = true;
                table2option.serverSide = true;
            }
            table1option.ajax = buildGetData(table1option.getdata, table1);
            table2option.ajax = buildGetData(table2option.getdata, table2);
            // table1option.drawCallback = drawCallback;
            // table2option.drawCallback = drawCallback;
            var datatable1 = table1.DataTable(table1option);
            datatable1.getSelection = getSelection;
            //datatable1.customAjax = function() { return buildGetData(table1option.getdata, datatable1, table1); }
            sideToSide.table1 = datatable1;

            var datatable2 = table2.DataTable(table2option);
            datatable2.getSelection = getSelection;
            //datatable2.customAjax = function() { return buildGetData(table2option.getdata, datatable2, table2); }
            sideToSide.table2 = datatable2;

            var table1ChangeData = new Changedata(table1);
            var table2ChangeData = new Changedata(table2);
            //确认
            $(opt.confirmBtn.flag, $item).on('click', function(e) {
                e.preventDefault();
                if ($.isFunction(opt.confirmBtn.action)) {
                    opt.confirmBtn.action(table1ChangeData, table2ChangeData);
                }
                sideToSide.reset();
            });
            //表二数据至表一
            $(opt.stofBtn.flag, $item).on('click', function(e) {
                e.preventDefault();
                var $tr = orderSelection(datatable2);
                if ($tr.length == 0)
                    return
                var rows = datatable2.rows($tr);  
                var rowsdata = rows.data();  
                if ($.isFunction(opt.stofBtn.action)) {
                    opt.stofBtn.action(rowsdata);
                } else {
                    for (var i = 0; i < rowsdata.length; i++) {
                        var rowdata = rowsdata[i];
                        _dataExchange(table2ChangeData, table1ChangeData, rowdata);
                    }   
                    var allrows = datatable1.rows();
                    var allrowsdata = allrows.data();
                    allrows.remove();
                    datatable1.rows.add(rowsdata);
                    datatable1.rows.add(allrowsdata).draw();
                    var info = datatable2.page.info();
                    var temp = rows.remove().page.info();
                    var page = (info.page + 1) > temp.pages ? (temp.pages - 1) : info.page
                        //datatable1.rows.add(rowsdata).draw();
                    rows.page(page).draw(false);
                }
            });
            //表一数据至表二
            $(opt.ftosBtn.flag, $item).on('click', function(e) {
                e.preventDefault();
                var $tr = orderSelection(datatable1);
                if ($tr.length == 0)
                    return
                var rows = datatable1.rows($tr);  
                var rowsdata = rows.data();     

                if ($.isFunction(opt.ftosBtn.action)) { 
                    opt.ftosBtn.action(rowsdata); 
                } else {
                    for (var i = 0; i < rowsdata.length; i++) {
                        var rowdata = rowsdata[i];
                        _dataExchange(table1ChangeData, table2ChangeData, rowdata);
                    }   
                    var allrows = datatable2.rows();
                    var allrowsdata = allrows.data();
                    allrows.remove();
                    datatable2.rows.add(rowsdata);
                    datatable2.rows.add(allrowsdata).draw();
                    var info = datatable1.page.info();
                    var temp = rows.remove().page.info();
                    var page = (info.page + 1) > temp.pages ? (temp.pages - 1) : info.page
                        //datatable1.rows.add(rowsdata).draw();
                    rows.page(page).draw(false);
                }
            });

            ///页面显示数变化
            // $('table', $item).on('length.dt', function(e, settings, len) {    
            //     console.log('New page length: ' + len);
            // });
            //页面发生变化
            // $('table', $item).on('page.dt', function(e, settings) {       

            //     $('#pageInfo').html('Showing page: ' + info.page + ' of ' + info.pages);
            // });
            //表格绘制事件
            $('table', $item).on('draw.dt', function() {    
                $('.checkboxes', this).attr("checked", false);
                $('.group-checkable', this).attr("checked", false);
                $('.group-checkable', this).parent('span').removeClass('checked');
            });
            table1.find('tbody').on('click', 'tr', function(e) {
                checkAction(e, table1, this);
            });
            table2.find('tbody').on('click', 'tr', function(e) {
                checkAction(e, table2, this);
            });
            sideToSide.reset = function() {
                table1ChangeData = new Changedata(table1);
                table2ChangeData = new Changedata(table2);
            };
            //重载数据
            sideToSide.reload = function(table) {
                table.settings()[0].isInitial = true;
                table.settings()[0].oLanguage.sEmptyTable = '查不到结果';
                table.ajax.reload();
            };
            //刷新当前页面数据
            sideToSide.refresh = function(table) {
                table.settings()[0].isInitial = true;
                table.settings()[0].oLanguage.sEmptyTable = '查不到结果';
                table.ajax.reload(null, false);
            }

            if (helper.BrowserVersion.browser == "IE" && parseInt(helper.BrowserVersion.version) == 8) {
                $('.group-checkable', $item).live('change', function(e) {
                    //e.preventDefault();
                    var table = $(this).parents('table');
                    $('.checkboxes', table).prop('checked', $(this).prop('checked'));
                    //$.uniform.update();
                    $('.checkboxes', table).parents('tr').toggleClass('selected', $(this).prop('checked'));
                });

            } else {
                //表格数据全选或反选
                $('.group-checkable', $item).on('change', function(e) {
                    //e.preventDefault();
                    var table = $(this).parents('table');
                    $('.checkboxes', table).prop('checked', $(this).prop('checked'));
                    //$.uniform.update();
                    $('.checkboxes', table).parents('tr').toggleClass('selected', $(this).prop('checked'));
                });
            }

            /**
             * 返回function(data, callback, settings),用于datatable数据获取
             * @param {*} getdata 
             * @param {*} datatable 
             * @param {*} table 
             */
            function buildGetData(getdata, table) {
                var conf = $.extend({
                    url: '',
                    data: null,
                    method: getdata.type || 'GET',
                    cache: false
                }, getdata);
                var dataFunction = null;
                if ($.isFunction(conf.data.body)) {
                    dataFunction = conf.data.body;
                }
                var publicrequest = conf.data.publicrequest;
                return function(data, callback, settings) {
                    if (settings.isInitial) {
                        var token = "";
                        if (table.data('login')) {
                            token = helper.GetToken();
                            if (token == "" || helper.IsTokenTimeOut()) {
                                helper.Login();
                                return;
                            }
                            table.data("token", token);
                        }
                        dataFunction(data);
                        conf.data = {};
                        conf.data.body = data;
                        conf.headers.token = token;
                        conf.data.publicrequest = publicrequest;
                        conf.data.publicrequest.requesttime = helper.DateFormat(new Date(), "yyyyMMddHHmmssfff");
                        conf.data.publicrequest.reqid = helper.NewGuid();
                        conf.data = { '': JSON.stringify(conf.data) };
                        conf.success = function(json) {
                            if ( typeof  json  === 'string') {
                                json = JSON.parse(json);
                            }
                            if (json.publicresponse.statuscode == 0) {
                                json = { data: json.body.items || [], iTotalRecords: (json.body.items || '').length, iTotalDisplayRecords: json.body.totalcount || 0 };
                            } else {
                                json = { data: [], iTotalRecords: 0, iTotalDisplayRecords: 0 };
                            }
                            //settings.oApi._fnCallbackFire(settings, null, 'xhr', [settings, json]);
                            callback(json);
                        }
                        $.ajax(conf);
                    } else {
                        var json = { data: [], iTotalRecords: 0, iTotalDisplayRecords: 0 };
                        //settings.oApi._fnCallbackFire(settings, null, 'xhr', [settings, json]);
                        callback(json);
                    }
                }
            }
            if ($.isFunction(opt.afterInitail)) {
                opt.afterInitail(sideToSide);
            }
        })

        /**
         * 获取选中项
         * @param {boolean} isDetail 
         */
        function getSelection(isDetail) {
            var result = new Array();
            var $tr = orderSelection(this)
            var rows = this.rows($tr);  
            var rowsdata = rows.data();   
            for (var index = 0; index < rowsdata.length; index++) {
                var element = rowsdata[index];
                result.push(element);
            }
            return result;
        }

        /**
         * jquery选择选中项时出现倒序的情况，这个方法整理顺序
         * @param {DataTables.Api} table 
         */
        function orderSelection(table) {
            var result = [];
            var $tr = table.$('input:checked').parents('tr')
            for (var index = $tr.length - 1; index >= 0; index--) {
                var element = $tr[index];
                result.push(element);
            }
            $.extend($tr, result);
            return $tr;
        }
        return sideToSide;
    };
    /**
     * 默认参数
     */
    $.fn.SideToSide.defaults = {
        table1: "",
        table2: "",
        columns: "",
        islocal: false,
        afterInitail: "",
        confirmBtn: {
            flag: "",
            action: null,
        },
        stofBtn: {
            flag: "",
            action: null,
        },
        ftosBtn: {
            flag: "",
            action: null,
        },
        Mode: "",
    }
    var TableOption = {
        "login": true,
        "data": [],
        "getdata": "",
        "processing": true, //加载数据时候是否显示进度条
        "serverSide": false, //是否从服务加载数据 
        "filter": false, //过滤功能
        "sort": false,
        "ordering": false, //排序
        "pageLength": 10, // default records per page，
        "lengthMenu": [
            [10, 20, 50, 100, 200],
            [10, 20, 50, 100, 200]
        ],
        "language": {
            "aria": {
                "sortAscending": ":升序",
                "sortDescending": ":降序"
            },
            "processing": "读取中",
            "emptyTable": "请先进行查询",
            "info": "第 _START_ 到 _END_ 共 _TOTAL_ 条",
            "infoEmpty": "",
            "infoFiltered": "", //"(从 _MAX_ 条数)",
            "lengthMenu": "显示 _MENU_ 条目",
            "search": "搜索:",
            "zeroRecords": "找不到结果",
            "paginate": {
                "previous": "<",
                "next": ">",
                "last": "<<",
                "first": ">>"
            }
        },
        "dom": '<"datatable_filter"f>r<"table-scrollable"t><"row"<"col-md-2 col-sm-12"l><"col-md-3 col-sm-12"i><"col-md-7 col-sm-12 pagnav"p>>',
        "searchInput": null,
        "searchButton": null,
        "pagingType": "bootstrap_full_number",
    }
    return $.fn.SideToSide;
});