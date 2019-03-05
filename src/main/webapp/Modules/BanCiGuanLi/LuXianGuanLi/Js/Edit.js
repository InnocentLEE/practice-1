define(['/Modules/Config/conwin.main.js'], function () {
    require(['jquery', 'popdialog', 'tipdialog', 'toast', 'helper', 'common', 'formcontrol', 'prevNextpage', 'tableheadfix', 'system', 'selectcity', 'filelist', 'fileupload', 'selectCity2', 'metronic', 'customtable', 'bootstrap-datepicker.zh-CN', 'bootstrap-datetimepicker.zh-CN'],
        function ($, popdialog, tipdialog, toast, helper, common, formcontrol, prevNextpage, tableheadfix, system, selectcity, filelist, fileupload, selectCity2) {
            var userInfo = helper.GetUserInfo();
        //模块初始化
            var initPage = function () {
                //初始化页面样式
               common.AutoFormScrollHeight('#Form1', function (hg) {
                    var boxHeight = hg - $('.portlet-title').outerHeight(true) - $('.nav-tabs').outerHeight(true) - 100;
                    var me = $(".scroller", '#Form1').eq(0);
                    me.parent().css('height', boxHeight);
                    me.css('height', boxHeight);
                });
                $('.date-picker').datepicker({ format: 'yyyy-mm-dd', autoclose: true, language: 'zh-CN' });
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
                    if ($.trim(fromData.CarNum) == '') {
                        msg += "车牌号码 是必填项<br/>";
                    }
                    if ($.trim(fromData.CarType) == '') {
                        msg += "车牌颜色 是必填项<br/>";
                    }
                    if ($.trim(fromData.LicenceRegistDate) == '') {
                        msg += "行驶证注册日期 是必填项<br/>";
                    }
                    if ($.trim(fromData.LicencePublishDate) == '') {
                        msg += "行驶证发证日期 是必填项<br/>";
                    }
                    if ($.trim(fromData.ErweiDate) == '') {
                        msg += "二维日期 是必填项<br/>";
                    }
                    if ($.trim(fromData.ErweiDateNext) == '') {
                        msg += "下次二维日期 是必填项<br/>";
                    }
                    if ($.trim(fromData.PermitNum) == '') {
                        msg += "道路运输证号 是必填项<br/>";
                    }
                    if ($.trim(fromData.LicenceAddress) == '') {
                        msg += "行驶证地址 是必填项<br/>";
                    }
                    if (msg != '') {
                        flags = false;
                        tipdialog.alertMsg(msg);
                    }
                    if (flags) {
                        save();
                    }
                });

                updateData();
            };
            //取单个代理商信息接口
            function getKeCheXinXi(id, callback) {
                helper.Ajax("008808800062", id, function (resultdata) {
                    if (typeof callback == 'function') {
                        callback(resultdata);
                    }
                }, false);
            };

            //绑定基本信息数据方法
            function updateData() {
                var id = prevNextpage.PageInfo.IDS[prevNextpage.PageInfo.Index];
                getKeCheXinXi(id, function (serviceData) {
                    if (serviceData.publicresponse.statuscode == 0) {
                        fillFormData(serviceData.body);
                    } else {
                        tipdialog.errorDialog("请求数据失败");
                    }
                });
            };

            function fillFormData(resource) {
                resource.LicenceRegistDate = resource.LicenceRegistDateValue;
                resource.LicencePublishDate = resource.LicencePublishDateValue;
                resource.ErweiDate = resource.ErweiDateValue;
                resource.ErweiDateNext = resource.ErweiDateNextValue;
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
                        if ($(item).hasClass('long-to-date')) {
                            tempValue = helper.LongDateToDate(tempValue);
                        }
                        $(item).html(tempValue == '' ? '' : tempValue);
                    } else {
                        $(item).html('');
                    }
                });
                $('#Id').val(resource.Id);
            };

            //主表-保存
            function save() {
                var jsonData1 = $('#Form1').serializeObject();
                for (var key in jsonData1) {
                    jsonData1[key] = jsonData1[key].replace(/\s/g, "");
                }
                jsonData1.UnitId = userInfo.organId;
                jsonData1.UnitName = userInfo.organizationName;
                jsonData1.OrgType = userInfo.organizationType;
                //调用新增接口
                helper.Ajax("008808800063", jsonData1, function (data) {
                    if ($.type(data) == "string") {
                        data = helper.StrToJson(data);
                    }
                    if (data.publicresponse.statuscode == 0) {
                        toast.success("保存成功");
                        setTimeout(function () {
                            window.location.href = "List.html";
                            parent.window.$("#btnSearch").click();
                            parent.window. $("#tb_Template").CustomTable("reload");
                            }, 2000);
                    }
                    else {
                        tipdialog.alertMsg(data.publicresponse.message);
                    }
                }, false);
            };
            initPage();
        });
});