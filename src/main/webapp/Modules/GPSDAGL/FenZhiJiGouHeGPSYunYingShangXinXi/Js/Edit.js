define(['/Modules/Config/conwin.main.js'], function () {
    require(['jquery', 'popdialog', 'tipdialog', 'toast', 'helper', 'common', 'formcontrol', 'prevNextpage', 'tableheadfix', 'system', 'selectcity', 'selectCity2', 'filelist', 'fileupload', 'metronic', 'customtable', 'bootstrap-datepicker.zh-CN', 'bootstrap-datetimepicker.zh-CN'],
        function ($, popdialog, tipdialog, toast, helper, common, formcontrol, prevNextpage, tableheadfix, system, selectcity, selectCity2, filelist, fileupload) {
            //模块初始化
            var initPage = function () {
                //初始化页面样式
                common.AutoFormScrollHeight('#Form1', function (hg) {
                    var boxHeight = hg - $('.portlet-title').outerHeight(true) - $('.nav-tabs').outerHeight(true) - 245;
                    var me = $(".scroller", '#Form1').eq(0);
                    me.parent().css('height', boxHeight);
                    me.css('height', boxHeight);
                });
                // common.AutoFormScrollHeight('#Form1');
                common.AutoFormScrollHeight('#Form2');
                common.AutoFormScrollHeight('#LianXiXinXi', function (hg) {
                    var boxHeight = hg - $('.portlet-title').outerHeight(true) - $('.nav-tabs').outerHeight(true) - 245;
                    var me = $(".scroller");
                    me.parent().css('height', boxHeight);
                    me.css('height', boxHeight);
                });
                //初始化checkbox
                formcontrol.initial();
                //翻页控件
                var ids = window.parent.document.getElementById('hdIDS').value;
                prevNextpage.initPageInfo(ids.split(','));
                prevNextpage.bindPageClass();

                //关闭
                $('#btnclose').click(function () {
                    tipdialog.confirm("确定关闭？", function (r) {
                        if (r) {
                            parent.window.$("#btnSearch").click();
                            popdialog.closeIframe();
                        }
                    });
                });

                //上一条
                $('#prevBtn').click(function (e) {
                    e.preventDefault();
                    prevNextpage.prev();
                    updateData();
                });

                //下一条
                $('#nextBtn').click(function (e) {
                    e.preventDefault();
                    prevNextpage.next();
                    updateData();
                });

                $('#saveBtn').on('click', function (e) {
                    e.preventDefault();
                    var flags = true;
                    var msg = '';
                    var fromData = $('#Form1').serializeObject();
                    fromData.YouXiaoZhuangTai = $('#YouXiaoZhuangTai').val();
                    fromData.ShiFouKaiTongTongJiQuanXian = $('#ShiFouKaiTongTongJiQuanXian').val();
                    //调用新增接口
                    if ($.trim(fromData.JiGouMingCheng) == '') {
                        msg += "机构名称 是必填项<br/>";
                    }
                    if ($.trim(fromData.YingYeZhiZhaoHao) == '' && $.trim(fromData.TongYiSheHuiXinYongDaiMa) == '') {
                        msg += "营业执照号和统一社会信用代码 必填一个<br/>";
                    }
                    if ($.trim(fromData.JingYingQuYu) == '') {
                        msg += "经营区域 是必选项<br/>";
                    }
                    if ($.trim(fromData.YouXiaoZhuangTai) == '') {
                        msg += "有效状态 是必填项<br/>";
                    }
                    if ($.trim(fromData.YouBian) != '') {
                        if (!new RegExp('^[1-9][0-9]{5}$').test($.trim(fromData.YouBian))) {
                            msg += "邮编 格式不正确<br/>";
                        }
                    }
                    if (msg != '') {
                        flags = false;
                        tipdialog.alertMsg(msg);
                    }
                    if (flags) {
                        save();
                    }
                });

                $('#tab2').on('click', function () {
                    $("#tb_lianXiRenTable").CustomTable("reload");
                });

                $("#ShiFouKaiTongTongJiQuanXian").click(function () {
                    if ($(this).is(":checked")) {
                        $(this).val("true");
                    } else {
                        $(this).val("false");
                    }
                });

                $("select#HeZuoFangShi").change(function () {
                    selectTongJiQuYu();
                });

                updateData();
                imageLoad();

                selectCity2.initSelectView($('#JingYingQuYu'));
                var userInfo = helper.GetUserInfo();
                if (userInfo.OrganizationType == "0") {
                    $('#add').click(function (e) {
                        e.preventDefault();
                        selectCity2.showSelectCity();
                    });
                }
                else {
                    var orgManageArea = helper.GetUserInfo().OrganizationManageArea;
                    if (typeof orgManageArea != "undefined" || orgManageArea != '') {
                        var manageArea = orgManageArea.split('|');
                        $('#add').click(function (e) {
                            e.preventDefault();
                            selectCity2.showSelectCity(manageArea);
                        });
                    }
                    else {
                        $('#add').click(function (e) {
                            e.preventDefault();
                            selectCity2.showSelectCity();
                        });
                    }
                }
                initlizableLianXiRenTable();
            };

            function initTopFuZeRenXinXi(lianXiRenData) {
                if (lianXiRenData == "" || lianXiRenData == null) {
                    $("#fuzeren").html("");
                    $("#fuzerendianhua").html("");
                }
                else {
                    $("#fuzeren").html(lianXiRenData.LianXiRen);
                    $("#fuzerendianhua").html(lianXiRenData.ShouJiHaoMa);
                }
            };

            function selectTongJiQuYu() {
                var heZuoFangSi = $("#HeZuoFangShi option:selected").val();
                if (heZuoFangSi == 2) {
                    $("#Allow").hide();
                } else {
                    $("#Allow").show();
                }
                if ($('#ShiFouKaiTongTongJiQuanXian').val() == "true") {
                    $("#ShiFouKaiTongTongJiQuanXian").click();
                }
            }

            //主表-更新tab状态
            function updateTag() {
                $('#tab1').parent('li').addClass('active');
                $('#JiChuXinXi').addClass('active in');
                $('#tab2').parent('li').removeClass('active');
                $('#LianXiXinXi').removeClass('active in');
                $('#tab3').parent('li').removeClass('active');
                $('#FuJianDangAn').removeClass('active in');
            };

            //取单个分支机构信息接口
            function getPingTaiDaiLiShang(id, callback) {
                helper.Ajax("003300300015", id, function (resultdata) {
                    if (typeof callback == 'function') {
                        callback(resultdata);
                    }
                }, false);
            };

            //绑定基本信息数据方法
            function updateData() {
                var id = prevNextpage.PageInfo.IDS[prevNextpage.PageInfo.Index];
                getPingTaiDaiLiShang(id, function (serviceData) {
                    if (serviceData.publicresponse.statuscode == 0) {
                        fillFormData(serviceData.body);
                        $("#tb_lianXiRenTable").CustomTable("reload");
                    } else {
                        tipdialog.errorDialog("请求数据失败");
                    }
                });
            };

            function imageLoad() {
                $('#imgUpLoad').fileupload({
                    businessId: $('#Id').val(),
                    multi: false,
                    timeOut: 20000,
                    allowedContentType: 'png|jpg|jpeg|tif|gif|pdf',
                    callback: function (data) {
                        $("#FenZhiJiGouBiaoZhiId").val(data.FileId);
                        $('#' + data.FileId + 'View').hide();
                        $('#' + data.FileId + 'Delete').hide();
                        $('#divImgUpLoad').append("<img id='imgUpLoad' src='" + helper.Route('00000080004', '1.0', system.ServerAgent) + '?id=' + data.FileId + "' style='width:200px;height:200px;float:left;padding:6px;' />");
                        imageLoad();
                    }
                });
            };

            //初始化记录
            function fillFormData(resource) {
                $('#Form1').find('input[name],select[name],textarea[name]').each(function (i, item) {
                    $(item).val('');
                    var tempValue = resource[$(item).attr('name')];
                    if (tempValue != undefined) {
                        //TODO: 赋值
                        $(item).val(tempValue.toString() == '' ? '' : tempValue);
                    } else {
                        $(item).val('');
                    }
                });

                if ($('#FenZhiJiGouBiaoZhiId').val() != '') {
                    var url = helper.Route('00000080004', '1.0', system.ServerAgent) + '?id=' + $('#FenZhiJiGouBiaoZhiId').val();
                    $('#imgUpLoad').attr("src", url);
                } else {
                    $('#imgUpLoad').attr("src", '../../Component/Img/NotPic.jpg');
                }

                if ($("#YouXiaoZhuangTai").val() == 1) {
                    $("#zhuangtai").html("正常营业");
                }
                else {
                    $("#zhuangtai").html("合约到期");
                }
                if ($("#YouXiaoZhuangTai").val() == 1) {
                    $("#YXZT").val("正常营业");
                }
                else {
                    $("#YXZT").val("合约到期");
                }
                selectCity2.setData(resource['JingYingQuYu']);

                if ($('#ShiFouKaiTongTongJiQuanXian').val() == "true") {
                   // $("#ShiFouKaiTongTongJiQuanXian").click();
                    if ($('#ShiFouKaiTongTongJiQuanXian').attr('checked') == "checked") {
                      
                    }
                    else {
                        $("#ShiFouKaiTongTongJiQuanXian").click();
                    }
                   
                }
                else {
                    if ($('#ShiFouKaiTongTongJiQuanXian').attr('checked') == "checked") {
                        $("#ShiFouKaiTongTongJiQuanXian").click();
                    }
                }

                if ($('#HeZuoFangShi').val() == "1") {
                    $("#Allow").show();
                }
                else {
                    $("#Allow").hide();
                }

                $("#jigoumingcheng").html($("#JiGouMingCheng").val());
                $("#fuzeren").html($("#FuZheRen").val());
                $("#fuzerendianhua").html($("#FuZheRenDianHua").val());
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
                        {
                            render: function (data, type, row) {
                                return '<input type=checkbox class=checkboxes />';
                            }
                        },
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

            //主表-保存
            function save() {
                //TODO:数据校验
                var jsonData1 = $('#Form1').serializeObject();
                jsonData1.YouXiaoZhuangTai = $('#YouXiaoZhuangTai').val();
                jsonData1.ShiFouKaiTongTongJiQuanXian = $('#ShiFouKaiTongTongJiQuanXian').val();
                for (var key in jsonData1) {
                    jsonData1[key] = jsonData1[key].replace(/\s/g, "");
                }
                //调用修改接口
                helper.Ajax("003300300018", jsonData1, function (data) {
                    if ($.type(data) == "string") {
                        data = helper.StrToJson(data);
                    }
                    if (data.publicresponse.statuscode == 0) {
                        if (data.body) {
                            toast.success("档案修改成功");
                            setTimeout(function () { window.location.reload(false); }, 2000);
                        }
                        else {
                            tipdialog.alertMsg("档案修改失败");
                        }
                    }
                    else {
                        tipdialog.alertMsg(data.publicresponse.message);
                    }
                }, false);
            };

            //子表-初始化分页信息
            var tabPageInfo = tabPage();
            //子表-初始化校验信息
            var tabButtonInfo = tabButton();
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

            //子表-必填项校验
            function tabButton() {
                var button = {};
                var defaults = {};
                ///初始化
                button.initial = function (elemt, options) {
                    var param;
                    var message = '';
                    var additionMsg = '';
                    var focusId = undefined;
                    param = $.extend({}, defaults, options);
                    return button.checkItem(elemt, message, additionMsg, focusId, param);
                }
                ///提交驗證
                button.checkItem = function (elemt, message, additionMsg, focusId, param) {
                    $(elemt).find('input[name],select[name],textarea[name]').each(function (i, item) {
                        if (!Check(item)) {
                            if (item.nodeName == 'SELECT') {
                                if ($(item).val() == '') {
                                    message += getControlLabel(item).replace('*', '') + getControlDescription(item) + '<br />';
                                    $(item).parent('div').addClass('data-box-red');
                                } else {
                                    $(item).parent('div').removeClass('data-box-red');
                                }
                            } else {
                                if (item.type == 'radio' || item.type == 'checkbox') {
                                    var temp = getControlLabelByName(item.name).replace('*', '');
                                    if (message.indexOf(temp) == -1) {
                                        var ra = $(':' + item.type + ':checked');
                                        var len = ra.length;
                                        if (len == 0) {
                                            message += temp + getControlDescription(item) + '<br />';
                                            $(item).parent('div').addClass('data-box-red');
                                            $(item).parent('div').css({
                                                'float': 'left',
                                                'padding': '3px 12px 3px 8px'
                                            });
                                        } else {
                                            $(item).parent('div').removeClass('data-box-red');
                                            $(item).parent('div').css('float', '');
                                        }
                                    }
                                } else {
                                    var temp = getControlLabel(item).replace('*', '');
                                    if ($(item).val() != '' && $(item).attr('data-cwvalid') != undefined) {
                                        additionMsg += "请输入正确的" + temp + '<br />';
                                    } else {
                                        $(item).addClass('data-box-red');
                                        message += temp + getControlDescription(item) + '<br />';
                                    }
                                }
                            }
                            if (focusId == undefined) {
                                focusId = $(item).attr('id');
                            }
                        }
                    });
                    message += additionMsg;
                    if (message != '') {
                        if (focusId != undefined) {
                            tipdialog.errorDialog(message);
                        }
                        $('#TipModal').on('hidden.bs.modal', function () {
                            $('#' + focusId).focus();
                        });
                        return false;
                    } else {
                        return true;
                    }
                }

                ///檢查必填項
                function Check(item) {
                    var vaild = $(item).data("cwvalid");
                    if (vaild != null) {
                        var inputValue = $.trim($(item).val());
                        if (inputValue.length == 0) {
                            if (vaild.required == true) {
                                return false;
                            }
                        }
                        else {
                            if (vaild.regx != undefined) {
                                var regx = new RegExp(vaild.regx);
                                if (!regx.test(inputValue)) {
                                    return false;
                                }
                            }
                            if (vaild.minlength != undefined && inputValue.length < vaild.minlength) {
                                return false;
                            }
                            if (vaild.maxlength != undefined && inputValue.length > vaild.maxlength) {
                                return false;
                            }
                        }
                        return true;
                    }
                    return true;
                };

                function getControlLabel(control) {
                    return $('label[for=' + control.id + ']').text();
                }

                function getControlLabelByName(name) {
                    return $('label[for=' + name + ']').text();
                }

                function getControlDescription(control) {
                    var description = '是必填项';
                    if (!(control instanceof jQuery)) {
                        control = $(control);
                    }
                    var elementType = control.prop('nodeName');
                    switch (elementType) {
                        case 'INPUT':
                            inputType = $(control).attr('type');
                            description = getInputDescription(inputType);
                            break;
                        case 'SELECT':
                            description = '是必选项';
                            break;
                        case 'TEXTAREA':
                            description = '是必填项';
                            break;
                        default:
                            break;
                    }
                    return description;
                }

                function getInputDescription(inputType) {
                    var description = '';
                    switch (inputType) {
                        case 'checkbox':
                            description = '是必选项';
                            break;
                        case 'radio':
                            description = '是必选项';
                            break;
                        case 'hidden':
                            description = '是必填项';
                            break;
                        case 'number':
                            description = '是必填项';
                            break;
                        case 'password':
                            description = '是必填项';
                            break;
                        case 'text':
                            description = '是必填项';
                            break;
                        default:
                            break;
                    }
                    return description;
                }

                function getButtonByParam(option) {
                    var html = '<label class="control-label col-xs-4 col-sm-2"> &nbsp;' + option.labelName + '</label>' + '<div class="col-xs-8 col-sm-8"> ';
                    for (var i = 0; i < option.buttonObject.length; i++) {
                        html += '<button id="' + option.buttonObject[i].buttonId + '" class="btn ' + option.buttonObject[i].triggerBtn + '" style="line-height: 0; width:' + option.width + '; height: ' + option.height + '; color:' + option.fontColor + '; font-size: ' + option.fontSize + '; background-color: ' + option.btncolor.one + '"> <i class="fa fa-save"></i>' + option.buttonObject[i].btnValue + '</button>';
                    }
                    html += '</div>';
                    $('.button-init').append(html);
                }
                return button;
            }

        
            //-------------弹框新增方法star--------------
            $('#btnCreate').on('click', function (e) {
                e.preventDefault();
                popdialog.showModal({
                    'url': '../LianXiRenXinXi/LianXiRenAdd.html',
                    'width': '900px',
                    'showSuccess': initAddLianXiRen
                });
            });

            function initAddLianXiRen() {
                formcontrol.initial();
                $('#AddZiBiaoSure').on('click', function (e) {
                    e.preventDefault();
                    var code = $('#BenDanWeiOrgCode').val();
                    var jsonData1 = $('#SelectForm').serializeObject();
                    jsonData1.BenDanWeiOrgCode = code;
                    if (!CheckSubmit(jsonData1)) {

                        return;
                    }
                    if (tabButtonInfo.initial('#SelectForm')) {
                        addZiBiaoGuanXi0(jsonData1, function () {
                            if (jsonData1.LeiBie == "2") {
                                initTopFuZeRenXinXi(jsonData1);
                            }
                            $('#tab2').click();
                            popdialog.closeModal();
                        });
                    }
                });
            };

            function addZiBiaoGuanXi0(array, callback) {
                helper.Ajax("003300300010", array, function (data) {
                    if (data.body) {
                        toast.success("新增成功");
                        if (typeof callback == 'function') {
                            callback();
                        }
                    }
                    else {
                        tipdialog.alertMsg(data.publicresponse.message);
                    }
                }, false);
            };

            //-------------弹框新增方法end--------------

            //-------------弹框修改方法star--------------
            $('#btnEdit').on('click', function (e) {
                e.preventDefault();
                var rows = $("#tb_lianXiRenTable").CustomTable('getSelection'), ids = [];
                if (rows == undefined) {
                    tipdialog.errorDialog('请选择需要修改的记录');
                    return false;
                }
                if (rows.length > 1) {
                    tipdialog.errorDialog('每次只能修改一条记录');
                    return false;
                }
                //TODO:编写逻辑
                $(rows).each(function (i, item) {
                    ids.push(item.data.Id);
                });
                $('#SelectData').val(ids.join(','));
                popdialog.showModal({
                    'url': '../LianXiRenXinXi/LianXiRenEdit.html',
                    'width': '900px',
                    'showSuccess': initEditLianXiRen
                });
            });

            function initEditLianXiRen() {
                formcontrol.initial();
                //翻页控件
                tabPageInfo.initPageInfo($('#SelectData').val().split(','));
                tabPageInfo.bindPageClass();
                viewZiBiaoGuanXi0();
                //上一条
                $('#prevTabBtn').click(function (e) {
                    e.preventDefault();
                    tabPageInfo.prev();
                    viewZiBiaoGuanXi0();
                });
                var leiBie = $('#LeiBie').val();

                $('#EditZiBiaoSure').on('click', function (e) {
                    e.preventDefault();
                    var jsonData1 = $('#SelectForm').serializeObject();
                    jsonData1.Id = tabPageInfo.PageInfo.IDS[tabPageInfo.PageInfo.Index];
                    jsonData1.BenDanWeiOrgCode = $('#BenDanWeiOrgCode').val();
                    if (!CheckSubmit(jsonData1)) {

                        return;
                    }
                    if (tabButtonInfo.initial('#SelectForm')) {
                        editZiBiaoGuanXi0(jsonData1, function () {
                            if (jsonData1.LeiBie == "2") {
                                initTopFuZeRenXinXi(jsonData1);
                            }
                            else {
                                if ($('#preLeiBie').val() == "2") {
                                    if (jsonData1.LeiBie != "2") {
                                        initTopFuZeRenXinXi();
                                    }
                                }
                            }
                            $('#tab2').click();
                            popdialog.closeModal();
                        });
                    }
                });
            }

            function viewZiBiaoGuanXi0() {
                //TODO: 添加逻辑
                var pageId = tabPageInfo.PageInfo.IDS[tabPageInfo.PageInfo.Index];
                helper.Ajax("003300300013", pageId, function (resultdata) {
                    if (resultdata.publicresponse.statuscode == 0) {
                        var resource = resultdata.body;
                        $('#QueryAddZiBiao').find('.form-control-static').each(function (i, item) {
                            var index = $(item).attr('for');
                            var tempValue = resource[index];
                            if (tempValue != undefined) {
                                $(item).html(tempValue == '' ? '' : tempValue);
                            } else {
                                $(item).html('');
                            }
                        });
                        $('#QueryAddZiBiao').find('input[name],select[name],textarea[name]').each(function (i, item) {
                            var tempValue = resource[$(item).attr('name')];
                            if (tempValue != undefined) {
                                //TODO: 赋值
                                $(item).val(tempValue.toString() == '' ? '' : tempValue);
                            } else {
                                $(item).val('');
                            }
                        });
                        $('#preLeiBie').val($('#LeiBie').val());

                    } else {
                        tipdialog.errorDialog("请求数据失败");
                    }
                }, false);
            }

            function editZiBiaoGuanXi0(arry, callback) {
                //TODO: 添加逻辑
                helper.Ajax("003300300011", arry, function (data) {
                    if (data.body) {
                        toast.success("保存成功");
                        if (typeof callback == 'function') {
                            callback();
                        }
                    }
                    else {
                        tipdialog.alertMsg(data.publicresponse.message);
                    }
                }, false);
            };
            //-------------弹框修改方法end--------------

            //-------------删除方法star----------------
            $('#btnDel').on('click', function (e) {
                e.preventDefault();
                var rows = $("#tb_lianXiRenTable").CustomTable('getSelection'), ids = [];
                if (rows == undefined) {
                    tipdialog.errorDialog('请选择需要操作的行');
                    return false;
                }
                var isDeleteFaRen = false;
                $(rows).each(function (i, item) {
                    if (item.data.LeiBie == "2") {
                        isDeleteFaRen = true;
                    }
                    ids.push(item.data.Id);
                });
                tipdialog.confirm("确定要删除选中的记录？", function (r) {
                    if (r) {
                        helper.Ajax("003300300012", ids, function (data) {
                            if (data.body) {
                                if (isDeleteFaRen) {
                                    initTopFuZeRenXinXi();
                                }
                                $('#tab2').click();
                                toast.success("删除成功");
                            }
                            else {
                                tipdialog.alertMsg(data.publicresponse.message);
                            }
                        }, false);
                    }
                });
            });
            //-------------删除方法end----------------
            initPage();


            function CheckSubmit(jsonData1) {
                var msg = '';
                if (jsonData1.LianXiRen == '') {
                    msg += '联系人不能为空<br/>';
                }
                if (jsonData1.ShenFenZheng == '') {
                    msg += '身份证不能为空<br/>';
                }

                if (ValidIdentityCardNumber(jsonData1.ShenFenZheng) == false) {
                    msg += '身份证号码格式不正确';
                }
                if (msg != '') {
                    tipdialog.alertMsg(msg);
                    return false;
                } else {
                    return true
                }


            };
            function ValidIdentityCardNumber(idCard) {

                //idCard = $.trim(idCard.replace(/ /g, ""));              
                idCard = $.trim(idCard);
                if (idCard.length == 15) {
                    /*return isValidityBrithBy15IdCard(idCard) == true ? '' : '身份证格式不正确<br />';*/       //进行15位身份证的验证   
                    if (isValidityBrithBy15IdCard(idCard)) {
                        return true;
                    } else {
                        //tipdialog.alertMsg("身份证号码格式不正确");
                        return false;
                    }
                } else if (idCard.length == 18) {
                    var a_idCard = idCard.split("");                // 得到身份证数组   
                    if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) {   //进行18位身份证的基本验证和第18位的验证
                        return true;
                    } else {
                        //tipdialog.alertMsg("身份证号码格式不正确");
                        return false;
                    }
                } else {
                    //tipdialog.alertMsg("身份证号码格式不正确");
                    return false;
                }
            }

            function isValidityBrithBy18IdCard(idCard18) {
                var year = idCard18.substring(6, 10);
                var month = idCard18.substring(10, 12);
                var day = idCard18.substring(12, 14);
                var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
                // 这里用getFullYear()获取年份，避免千年虫问题   
                if (temp_date.getFullYear() != parseFloat(year)
                    || temp_date.getMonth() != parseFloat(month) - 1
                    || temp_date.getDate() != parseFloat(day)) {
                    return false;
                } else {
                    return true;
                }
            }
            function isValidityBrithBy15IdCard(idCard15) {
                var year = idCard15.substring(6, 8);
                var month = idCard15.substring(8, 10);
                var day = idCard15.substring(10, 12);
                var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
                // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法   
                if (temp_date.getYear() != parseFloat(year)
                    || temp_date.getMonth() != parseFloat(month) - 1
                    || temp_date.getDate() != parseFloat(day)) {
                    return false;
                } else {
                    return true;
                }
            }
            function isTrueValidateCodeBy18IdCard(a_idCard) {
                var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];    // 加权因子   
                var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];            // 身份证验证位值.10代表X   
                var sum = 0;                             // 声明加权求和变量   
                if (a_idCard[17].toLowerCase() == 'x') {
                    a_idCard[17] = 10;                    // 将最后位为x的验证码替换为10方便后续操作   
                }
                for (var i = 0; i < 17; i++) {
                    sum += Wi[i] * a_idCard[i];            // 加权求和   
                }
                valCodePosition = sum % 11;                // 得到验证码所位置   
                if (a_idCard[17] == ValideCode[valCodePosition]) {
                    return true;
                } else {
                    return false;
                }
            }













        });
});