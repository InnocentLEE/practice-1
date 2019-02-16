define(['/Modules/Config/conwin.main.js'], function () {
    require(['jquery', 'popdialog', 'tipdialog', 'toast', 'helper', 'common', 'formcontrol', 'prevNextpage', 'tableheadfix', 'system', 'selectcity', 'selectCity2', 'filelist', 'metronic', 'customtable', 'bootstrap-datepicker.zh-CN', 'bootstrap-datetimepicker.zh-CN'],
        function ($, popdialog, tipdialog, toast, helper, common, formcontrol, prevNextpage, tableheadfix, system, selectcity,selectCity2, filelist, Metronic, fileupload) {
            var userInfo = helper.GetUserInfo();
            var initPage = function () {
                var tabFlag = false;
                common.AutoFormScrollHeight('#Form1');
                $('.date-picker').datepicker({ format: 'yyyy-mm-dd', autoclose: true, language: 'zh-CN' });
                formcontrol.initial();
                initData();
                //保存
                $('#saveBtn').on('click', function (e) {
                    e.preventDefault();
                    var flags = true;
                    var msg = '';
                    var fromData = $('#Form1').serializeObject();
                    fromData.YouXiaoZhuangTai =$('#YouXiaoZhuangTai').val();
                    if ($.trim(fromData.YeHuMingCheng) == '') {
                        msg += "机构名称 是必填项<br/>";
                    }
                    if ($.trim(fromData.JingYingQuYu) == '') {
                        msg += "经营区域 是必填项<br/>";
                    }
                    if ($.trim(fromData.XiaQuSheng) == '') {
                        msg += "公司属地辖区省 是必选项<br/>";
                    }
                    if ($.trim(fromData.XiaQuShi) == '') {
                        msg += "公司属地辖区市 是必选项<br/>";
                    }
                    if ($.trim(fromData.YouXiaoZhuangTai) == '') {
                        msg += "有效状态 是必选项<br/>";
                    }
                    if ($.trim(fromData.JingYingXuKeZhengZi) == '') {
                        msg += "经营许可证字 是必填项<br/>";
                    }
                    if ($.trim(fromData.JingYingXuKeZhengHao) == '') {
                        msg += "经营许可证号 是必填项<br/>";
                    }
                    //if ($.trim(fromData.JingYingXuKeZhengYouXiaoZhuangTai) == '') {
                    //    msg += "经营许可证有效状态 是必选项<br/>";
                    //}
                    if ($.trim(fromData.JingYingXuKeZhengYouXiaoQi) == '') {
                        msg += "经营许可证有效期 是必填项<br/>";
                    }
                    if (msg != '') {
                        flags = false;
                        tipdialog.alertMsg(msg);
                    }
                    if (flags) {
                        save();
                    }
                });
                //关闭
                $('#btnclose').click(function () {
                    tipdialog.confirm("确定关闭？", function (r) {
                        if (r) {
                            parent.window.$("#btnSearch").click();
                            popdialog.closeIframe();
                        }
                    });
                });
               
                //tab2
                $('#tab2').click(function (e) {
                    if ($('#tab3').parent('li').hasClass('active')) {
                        e.preventDefault();
                    } else {
                        if (!tabFlag) {
                            tipdialog.alertMsg('请先保存基础信息!', function () {
                                $('#tab2').parent('li').removeClass('active');
                                $('#tab1').parent('li').addClass('active');
                                $('#LianXiXinXi').removeClass('active in');
                                $('#JiChuXinXi').addClass('active in');
                            });
                            if ($('.bootbox-body').html() == '请先保存基础信息!') {
                                $('.bootbox-close-button').click(function () {
                                    $('#tab2').parent('li').removeClass('active');
                                    $('#tab1').parent('li').addClass('active');
                                    $('#LianXiXinXi').removeClass('active in');
                                    $('#JiChuXinXi').addClass('active in');
                                });
                            }
                        } else {
                            $('#LianXiXinXi').addClass('active in');
                            $('#JiChuXinXi').removeClass('active in');
                        }
                    }
                });
                //region
                initArea();
                selectCity2.initSelectView($('#JingYingQuYu'));

              
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
                //endregion
            };

            function InitQuYu() {

            };


            //初始化表单数据
            function initData() {
                $('#Id').val(helper.NewGuid());
            };


            //保存
            function save() {
                //TODO: 校验数据
                var jsonData1 = $('#Form1').serializeObject();
                jsonData1.YouXiaoZhuangTai = $('#YouXiaoZhuangTai').val();
                for (var key in jsonData1) {
                    jsonData1[key] = jsonData1[key].replace(/\s/g, "");
                }
                //调用新增接口
                helper.Ajax("003300300025", jsonData1, function (data) {
                    if ($.type(data) == "string") {
                        data = helper.StrToJson(data);
                    }
                    if (data.publicresponse.statuscode == 0) {
                        if (data.body) {
                            toast.success("创建成功，请进一步完善其他信息");
                            window.parent.document.getElementById('hdIDS').value = jsonData1.Id;
                            setTimeout(function () { window.location.href = "Edit.html"; }, 2000);
                        }
                        else {
                            tipdialog.alertMsg("创建失败");
                        }
                    }
                    else {
                        tipdialog.alertMsg(data.publicresponse.message);
                    }
                }, false);
            };
            //初始化辖区
            var initArea = function () {
                var defaultOption = '<option value="" selected="selected">请选择</option>';
                $('#KongGuGongSiSuoZaiXiaQuSheng,#KongGuGongSiSuoZaiXiaQuShi').empty().append(defaultOption);
                //$('#XiaQuShi').empty().append(defaultOption);
                ///调用接口初始化城市下拉框
                $('#KongGuGongSiSuoZaiXiaQuSheng').change(function () {
                    $('#KongGuGongSiSuoZaiXiaQuShi').empty().append(defaultOption);
                    var data = { "Province": $(this).val() };
                    if ($(this).val() != '') {
                        ///调用接口初始化区县下拉框
                        selectcity.setXiaQu('00000020005', data, '#KongGuGongSiSuoZaiXiaQuShi', 'GetCityList', 'CityName');
                    }
                });
                //$('#XiaQuSheng').change(function () {
                //    $('#XiaQuShi').empty().append(defaultOption);
                //    var data = { "Province": $(this).val() };
                //     if ($(this).val() != '') {
                //        ///调用接口初始化区县下拉框
                //        selectcity.setXiaQu('00000020005', data, '#XiaQuShi', 'GetCityList', 'CityName');
                //     }
                //});
             
                selectcity.setXiaQu('00000020004', {}, '#KongGuGongSiSuoZaiXiaQuSheng', 'GetProvinceList', 'Key', 'Key', '广东');
                selectcity.setXiaQu('00000020005', { "Province": $('#KongGuGongSiSuoZaiXiaQuSheng').val() }, '#KongGuGongSiSuoZaiXiaQuShi', 'GetCityList', 'CityListName');
                //selectcity.setXiaQu('00000020004', {}, '#XiaQuSheng', 'GetProvinceList', 'Key', 'Key', '广东');
                
                selectcity.setXiaQu('00000020005', { "Province": "广东" }, '#XiaQuShi', function () {
                    var XiaQuShi = userInfo.OrganizationManageArea;
                    if (XiaQuShi!="") {
                        XiaQuShi = XiaQuShi.replace(/广东/g, "");
                        var list = XiaQuShi.split("|");
                        $("#XiaQuShi").find("option").each(function (index, item) {
                            if (list.indexOf($(item).val()) < 0 && $(item).val() != "") {
                                $(item).remove();
                            }
                        });
                    }
                   
                }, 'GetCityList', 'CityListName');
                
                $('#KongGuGongSiSuoZaiXiaQuSheng').val('广东');
                $('#KongGuGongSiSuoZaiXiaQuSheng').change();
                 $('#XiaQuSheng').val('广东');
                //$('#XiaQuSheng').change();
            };

            //endregion
            initPage();
        });


});
