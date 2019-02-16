define(['/Modules/Config/conwin.main.js'], function () {
    require(['jquery', 'popdialog', 'tipdialog', 'toast', 'helper', 'common', 'formcontrol', 'prevNextpage', 'tableheadfix', 'system', 'selectcity', 'filelist', 'fileupload', 'metronic', 'customtable', 'bootstrap-datepicker.zh-CN', 'bootstrap-datetimepicker.zh-CN'],
        function ($, popdialog, tipdialog, toast, helper, common, formcontrol, prevNextpage, tableheadfix, system, selectcity, filelist, fileupload) {
            var initPage = function () {
           
                //初始化页面样式
                common.AutoFormScrollHeight('#Form1');
                common.AutoFormScrollHeight('#Form2');
                common.AutoFormScrollHeight('#Form3');
                common.AutoFormScrollHeight('#Form4');
                common.AutoFormScrollHeight('#Form5');
                common.AutoFormScrollHeight('#Form6');
                common.AutoFormScrollHeight('#Form7');
                formcontrol.initial();
                //时间控件
                $('.datepicker').datepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    autoclose: true //选中之后自动隐藏日期选择框
                });
                $('.datetimepicker').datetimepicker({
                    language: 'zh-CN',
                    startView: 1,
                    maxView: 0,
                    format: 'hh:ii',
                    autoclose: true //选中之后自动隐藏日期选择框
                });
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
                    updateTag();
                });
                //下一条
                $('#nextBtn').click(function (e) {
                    e.preventDefault();
                    prevNextpage.next();
                    updateData();
                    updateTag();
                });

                //车辆详细信息
                $('#tab2').on('click', function () {
                    var CheliangId = prevNextpage.PageInfo.IDS[prevNextpage.PageInfo.Index];
                    GetData("003300300047", CheliangId, function (data) {
                        var fileId1 = $("#XingShiZHengSaoMiaoJianId").val();
                        if (fileId1) {
                            $("#" + fileId1 + "View").remove();
                        }
                        if (data) {
                            fillFormData(data, "Form2");
                        }
                        fileupload.rebindFileButtonView(['XingShiZHengSaoMiaoJianId']);

                    })
                });
                //车辆数据上报设置
                $('#tab3').on('click', function () {
                    var CheliangId = prevNextpage.PageInfo.IDS[prevNextpage.PageInfo.Index];
                    GetData("003300300048", CheliangId, function (data) {
                        if (data) {
                            fillFormData(data, "Form3");
                        }

                    })
                });
                //车辆业户信息
                $('#tab4').on('click', function () {
                    var CheliangId = prevNextpage.PageInfo.IDS[prevNextpage.PageInfo.Index];
                    GetData("003300300049", CheliangId, function (data) {
                        if (data) {
                            fillFormData(data, "Form4");
                        }

                    })
                });

                //车辆车机属性
                $('#tab5').on('click', function () {
                    var CheliangId = prevNextpage.PageInfo.IDS[prevNextpage.PageInfo.Index];
                    GetData("003300300050", CheliangId, function (data) {
                        if (data) {
                            fillFormData(data, "Form5");
                        }
                    })
                });

                //车辆服务信息
                $('#tab6').on('click', function () {
                    var CheliangId = prevNextpage.PageInfo.IDS[prevNextpage.PageInfo.Index];
                    GetData("003300300051", CheliangId, function (data) {
                        if (data) {
                            fillFormData(data, "Form6");
                        }
                    })
                });

                //车辆终端安装信息
                $('#tab7').on('click', function () {
                    var CheliangId = prevNextpage.PageInfo.IDS[prevNextpage.PageInfo.Index];
                    GetData("003300300052", CheliangId, function (data) {
                        if (data) {
                            fillFormData(data, "Form7");
                        }
                    })
                });
                updateData();
                //个性化代码块

                //region
                //endregion
            };


            //绑定基本信息数据方法
            function updateData() {
                var id = prevNextpage.PageInfo.IDS[prevNextpage.PageInfo.Index];
                var CheliangId = prevNextpage.PageInfo.IDS[prevNextpage.PageInfo.Index];
                GetData("003300300046", CheliangId, function (data) {
                    fillFormData(data, "Form1");
                });
            };




            /**
             * 根据服务编号获取数据
             * @param {string} ServiceCode 服务编号
             * @param {object} data  body数据
             * @param {function} callback 回调函数
             */
            function GetData(ServiceCode, data, callback) {
                helper.Ajax(ServiceCode, data, function (resultdata) {
                    if (typeof callback == 'function') {
                        if (typeof (resultdata) == "string") {
                            resultdata = JSON.parse(resultdata);
                        }
                        if (resultdata.publicresponse.statuscode == 0) {
                            callback(resultdata.body);
                        } else {
                            tipdialog.errorDialog('获取数据失败!' + resultdata.publicresponse.message);
                        }

                    }
                }, false);
            }



            /**
             * form表单数据填充
             * @param {JSON} resource 数据源
             * @param {string} Id form控件的Id 
             */
            function fillFormData(resource, Id) {

                $('#' + Id).find('input[name],select[name],textarea[name]').each(function (i, item) {
                    var tempValue = resource[$(item).attr('name')];
                   
                    if (tempValue != undefined) {
//if (!!tempValue) {
                        if ($(item).hasClass('datetimepicker')) {
                            tempValue = tempValue.substr(11, 5);
                        }
                        if ($(item).hasClass('datepicker')) {
                            tempValue = tempValue.substr(0, 10);
                        }
                        //TODO: 赋值
                        $(item).val(tempValue.toString() == '' ? '' : tempValue.toString());
                    } else {
                        if ($(item).attr('name') == "ShiFouKaiTongJianKongFuWu" || $(item).attr('name') == "ShiFouKaiTongShouJiChaChe"){
                            $(item).val('');
                        }
                        
                    }
                });

                //设置下拉框的值
                if ($(this).siblings("select").length) {
                    var selectedOption = $(this).siblings("select").find("option");
                    $(selectedOption).each(function (i, item0) {
                       if (item0.value == tempValue) {
                            $(item).html(item0);
                        }
                    })
                };


            };


            var setdate = function () { };

            //个性化代码块
            //region
            //endregion
            initPage();
        });
});