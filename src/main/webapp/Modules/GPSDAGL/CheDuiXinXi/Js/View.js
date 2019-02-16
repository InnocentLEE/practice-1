define(['/Modules/Config/conwin.main.js'], function () {
    require(['jquery', 'popdialog', 'tipdialog', 'toast', 'helper', 'common', 'formcontrol', 'prevNextpage', 'tableheadfix', 'system', 'selectcity', 'filelist', 'fileupload', 'metronic', 'customtable', 'bootstrap-datepicker.zh-CN', 'bootstrap-datetimepicker.zh-CN'],
        function ($, popdialog, tipdialog, toast, helper, common, formcontrol, prevNextpage, tableheadfix, system, selectcity, filelist, fileupload) {
            var initPage = function () {
                //初始化页面样式
                initlizableLianXiRenTable();
                //common.AutoFormScrollHeight('#Form1');
                common.AutoFormScrollHeight('#Form1', function (hg) {
                    var boxHeight = hg - $('.portlet-title').outerHeight(true) - $('.nav-tabs').outerHeight(true) - 245;
                    var me = $(".scroller", '#Form1').eq(0);
                    me.parent().css('height', boxHeight);
                    me.css('height', boxHeight);
                });
                common.AutoFormScrollHeight('#LianXiXinXi', function (hg) {
                    var boxHeight = hg - $('.portlet-title').outerHeight(true) - $('.nav-tabs').outerHeight(true) - 245;
                    var me = $(".scroller");
                    me.parent().css('height', boxHeight);
                    me.css('height', boxHeight);
                });
                common.AutoFormScrollHeight('#Form2');
                formcontrol.initial();

                //翻页控件
                var ids = window.parent.document.getElementById('hdIDS').value;
                prevNextpage.initPageInfo(ids.split(','));
                prevNextpage.bindPageClass();
                //初始化子表
                //关闭
                $('#btnclose').click(function () {
                    popdialog.closeIframe();
                });
                //上一条
                $('#prevBtn').click(function (e) {
                    e.preventDefault();
                    prevNextpage.prev();
                    updateData();
                    //updateTag();
                });
                //下一条
                $('#nextBtn').click(function (e) {
                    e.preventDefault();
                    prevNextpage.next();
                    updateData();
                    //updateTag();
                });
                $('#tab2').on('click', function () {
                    $("#tb_lianXiRenTable").CustomTable("reload");
                });
                updateData();
                //个性化代码块

                //region
                //endregion
            };
            //绑定基本信息数据方法
            function updateData() {
                var id = prevNextpage.PageInfo.IDS[prevNextpage.PageInfo.Index];
                getPingTaiDaiLiShang(id, function (serviceData) {
                    if (serviceData.publicresponse.statuscode == 0) {
                        //updateTag();
                        fillFormData(serviceData.body);

                    } else {
                        tipdialog.errorDialog("请求数据失败");
                    }
                });
            };
            //主表-刷新数据
            function updateData() {
                var id = prevNextpage.PageInfo.IDS[prevNextpage.PageInfo.Index];
                getXianLuXinXi(id, function (serviceData) {
                    if (serviceData.publicresponse.statuscode == 0) {
                        fillFormData(serviceData.body);
                    } else {
                        tipdialog.errorDialog("请求数据失败");
                    }
                });
            };
            //主表-获取主表数据
            function getXianLuXinXi(id, callback) {
                //调用获取单条信息接口
                helper.Ajax("003300300033", id, function (resultdata) {
                    if (typeof callback == 'function') {
                        callback(resultdata);
                    }
                }, false);
            };
            //主表-绑定主表数据
            function fillFormData(resource) {
                $('#Form1').find('input[name],select[name],textarea[name]').each(function (i, item) {
                    $(item).val('');
                    var tempValue = resource[$(item).attr('name')];
                    if (tempValue != undefined) {
                        if ($(item).hasClass('datetimepicker')) {
                            tempValue = tempValue.substr(11, 5);
                        }
                        if ($(item).hasClass('datepicker')) {
                            tempValue = tempValue.substr(0, 10);
                        }
                        //TODO: 赋值
                        $(item).val(tempValue.toString() == '' ? '' : tempValue);
                    } else {
                        $(item).val('');
                    }
                });
                $('#Form1').find('.form-control-static').each(function (i, item) {
                    $(item).html('');
                    var index = $(item).attr('for');
                    var tempValue = resource[index];
                    if (tempValue != undefined) {
                        //TODO: 赋值
                        if ($(item).hasClass('datetimepicker')) {
                            tempValue = tempValue.substr(11, 5);
                        }
                        if ($(item).hasClass('datepicker')) {
                            tempValue = tempValue.substr(0, 10);
                        }
                        $(item).html(tempValue == '' ? '' : tempValue);
                    } else {
                        $(item).html('');
                    }
                });
                $('#Id').val(resource.Id);
                //区域
                if ($('#CheDuiBiaoZhiId').val() != '') {
                    var url = helper.Route('00000080004', '1.0', system.ServerAgent) + '?id=' + $('#CheDuiBiaoZhiId').val();
                    $('#imgUpLoad').attr("src", url);
                }
                else {
                    $('#imgUpLoad').attr("src", '../../Component/Img/NotPic.jpg');
                }
                $("#jigoumingcheng").html($("#JiGouMingCheng").val());
                var val = $("#YouXiaoZhuangTai").val();
                if (val == "1") {
                    $("#YouXiaoZhuangTaiInput").html("正常营业");
                    $("#zhuangtai").html("正常营业");

                } else {
                    $("#YouXiaoZhuangTaiInput").html("合约到期");
                    $("#zhuangtai").html("合约到期");
                }
                $("#fuzeren").html($("#FuZheRen").val());
                $("#fuzerendianhua").html($("#FuZheRenDianHua").val());

                if ($("#ShenHeZhuangTai").val() == 1) {
                    $("#ShenHeZhuangTaiInput").html("待提交")
                }
                else if ($("#ShenHeZhuangTai").val() == 2) {
                    $("#ShenHeZhuangTaiInput").html("待审核")
                }
                else if ($("#ShenHeZhuangTai").val() == 3) {
                    $("#ShenHeZhuangTaiInput").html("审核通过")
                }
                else if ($("#ShenHeZhuangTai").val() == 4) {
                    $("#ShenHeZhuangTaiInput").html("审核不通过")
                }

            };
            //主表-更新tab状态
            function updateTag() {
                $('#tab1').parent('li').addClass('active');
                $('#JiChuXinXi').addClass('active in');
                $('#tab3').parent('li').removeClass('active');
                $('#FuJian').removeClass('active in');
            };
   

            //初始化联系人表格
            function initlizableLianXiRenTable() {
                $("#tb_lianXiRenTable").CustomTable({
                    ajax: helper.AjaxData("003300300009",
                        function (data) {
                            var pageInfo = { Page: data.start / data.length + 1, Rows: data.length };
                            for (var i in data) {
                                delete data[i];
                            }
                            var para = new Object();
                            para["BenDanWeiOrgCode"] = $("#BenDanWeiOrgCode").val();
                            pageInfo.data = para;
                            $.extend(data, pageInfo);
                        }, null),
                    single: false,
                    //filter: true,
                    ordering: true, /////是否支持排序
                    "dom": 'fr<"table-scrollable"t><"row"<"col-md-2 col-sm-12 pagination-l"l><"col-md-3 col-sm-12 pagination-i"i><"col-md-7 col-sm-12 pagnav pagination-p"p>>',
                    columns: [
                        //{
                        //    render: function (data, type, row) {
                        //        return '<input type=checkbox class=checkboxes />';
                        //    }
                        //},
                        { data: 'LianXiRen' },
                        {
                            data: 'LeiBie',
                            render: function (data, type, row, meta) {
                                var value;
                                if (data == "1") {
                                    value = "企业法人";
                                }
                                if (data == "2") {
                                    value = "本地负责人";
                                }
                                if (data == "3") {
                                    value = "其他";
                                }
                                return value;
                            }
                        },
                        { data: 'ShenFenZheng' },
                        { data: 'ShouJiHaoMa' },
                        { data: 'GuDingDianHua' },
                        { data: 'YouXiang' }
                    ],
                    pageLength: 10,
                    "fnDrawCallback": function (oSettings) {
                        tableheadfix.ResetFix();
                    }
                });
            };

            //子表-初始化分页信息
            var tabPageInfo = tabPage();
            //子表-分页
            function tabPage() {
                var tabPageInfo = {};
                tabPageInfo.bindPageClass = function () {
                    var currentPageInfo = tabPageInfo.PageInfo;
                    if (currentPageInfo.HasNext) {
                        $('#nextTabBtn').removeClass('disabled');
                        $('#nextTabBtn').removeClass('c-gray-btn');
                        $('#nextTabBtn').removeAttr('disabled');
                        $('#nextTabBtn').addClass('c-green');
                        $('#nextTabBtn').children(':first').removeClass('m-icon-gray');
                        $('#nextTabBtn').children(':first').addClass('m-icon-white');
                    } else {
                        $('#nextTabBtn').addClass('disabled');
                        $('#nextTabBtn').addClass('c-gray-btn');
                        $('#nextTabBtn').attr("disabled", "disabled");
                        $('#nextTabBtn').removeClass('c-green');
                        $('#nextTabBtn').children(':first').addClass('m-icon-gray');
                        $('#nextTabBtn').children(':first').removeClass('m-icon-white');
                    }
                    if (currentPageInfo.HasPrev) {
                        $('#prevTabBtn').removeClass('disabled');
                        $('#prevTabBtn').removeClass('c-gray-btn');
                        $('#prevTabBtn').removeAttr('disabled');
                        $('#prevTabBtn').addClass('c-green');
                        $('#prevTabBtn').children(':first').removeClass('m-icon-gray');
                        $('#prevTabBtn').children(':first').addClass('m-icon-white');
                    } else {
                        $('#prevTabBtn').addClass('disabled');
                        $('#prevTabBtn').addClass('c-gray-btn');
                        $('#prevTabBtn').attr("disabled", "disabled");
                        $('#prevTabBtn').removeClass('c-green');
                        $('#prevTabBtn').children(':first').addClass('m-icon-gray');
                        $('#prevTabBtn').children(':first').removeClass('m-icon-white');
                    }
                };
                //分页信息
                tabPageInfo.PageInfo = {
                    IDS: [],
                    Index: 0,
                    PageSize: 0,
                    HasPrev: false,
                    HasNext: false
                };
                //初始化子页面记录数据
                tabPageInfo.initPageInfo = function (ids) {
                    tabPageInfo.PageInfo.IDS = ids;
                    tabPageInfo.PageInfo.Index = 0;
                    tabPageInfo.PageInfo.PageSize = ids.length;
                    tabPageInfo.PageInfo.HasNext = ids.length > 1;
                    tabPageInfo.PageInfo.HasPrev = false;
                };
                //计算分页信息
                tabPageInfo.calculatePage = function (tag) {
                    if (tag == undefined)
                        return tabPageInfo.PageInfo;
                    //标识
                    if (tag > 0) {
                        tabPageInfo.PageInfo.Index++;
                    }
                    else {
                        tabPageInfo.PageInfo.Index--;
                    }
                    tabPageInfo.PageInfo.HasNext = tabPageInfo.PageInfo.PageSize > (tabPageInfo.PageInfo.Index + 1);
                    tabPageInfo.PageInfo.HasPrev = tabPageInfo.PageInfo.Index > 0;
                    return tabPageInfo.PageInfo;
                };
                tabPageInfo.next = function () {
                    tabPageInfo.calculatePage(1);
                    tabPageInfo.bindPageClass();
                };
                tabPageInfo.prev = function () {
                    tabPageInfo.calculatePage(-1);
                    tabPageInfo.bindPageClass();
                };
                return tabPageInfo;
            }
            //个性化代码块
            //region
            //endregion
            initPage();
        });
});