define(['/Modules/Config/conwin.main.js', '/Modules/GPSDAGL/CheLiangDangAn/Config/config.js'], function () {
    require(['jquery', 'popdialog', 'tipdialog', 'toast', 'helper', 'common', 'formcontrol', 'prevNextpage', 'tableheadfix', 'system', 'selectcity', 'filelist', 'fileupload', 'btn', 'metronic', 'customtable', 'bootstrap-datepicker.zh-CN', 'bootstrap-datetimepicker.zh-CN'],
        function ($, popdialog, tipdialog, toast, helper, common, formcontrol, prevNextpage, tableheadfix, system, selectcity, filelist, fileupload, btn) {

            var CheJi = false;
            var FuWu = false;
            var ZD = false;
            var orgSIMKaHao = '';
            var orgSIMXLH = '';
            var UserInfo = helper.GetUserInfo(); //用户信息
            var XiaQuXian = "";
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
                selectCity();
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

                    if (window.parent.document.getElementById('ISAnZhuangZhongDuan').value.trim() != "") {
                        //保存车机服务
                        if (!CheJi) {
                            tipdialog.errorDialog('请先保存车辆车机属性!');
                            return;
                        }
                        //保存服务信息
                        if (!FuWu) {
                            tipdialog.errorDialog('请先保存车辆服务信息!');
                            return;
                        }
                        //保存终端安装信息
                        if (!ZD) {
                            tipdialog.errorDialog('请先保存车辆终端安装信息!');
                            return;
                        }
                        window.parent.document.getElementById('ISAnZhuangZhongDuan').value == "";
                        //跳转到收费记录页面

                        tipdialog.confirm("您已完成终端安装，是否新增收费记录？", function (r) {
                            if (r) {
                                window.parent.document.getElementById('ISAnZhuangZhongDuan').value = "";
                                gotoShouFei($("#Id").val());
                            } else {
                                window.parent.document.getElementById('ISAnZhuangZhongDuan').value = "";
                                //parent.window.$("#btnSearch").click();
                                popdialog.closeIframe();
                            }
                        });
                        window.parent.document.getElementById('ISAnZhuangZhongDuan').value = "";
                    } else {
                        //parent.window.$("#btnSearch").click();
                        popdialog.closeIframe();
                    }

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




                $("#CheZhuLeiXing").on("change", function () {
                    if ($(this).val() == "1") {
                        //企业所有
                        $("#GeRenCheZhuMingCheng").attr("disabled", "disabled");
                        $("#GeRenCheZhuMingCheng").val("");
                        $("#btnSetYeHu").show();

                    } else {
                        //个人所有
                        $("#GeRenCheZhuMingCheng").removeAttr("disabled");
                        $("#JingYingXuKeZhengHao").val("");
                        $("#QiYeMingCheng").val("");
                        $("#QiYeOrgCode").val("");
                        $("#QiYeID").val("");
                        $("#btnSetYeHu").hide();
                    }
                });


                $('#XingShiZHengSaoMiaoJian').fileupload({ multi: false });

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
                            fileupload.rebindFileButtonEdit(['XingShiZHengSaoMiaoJianId']);
                            if (data["XingShiZHengSaoMiaoJianId"]) {
                                $("#XingShiZHengSaoMiaoJian").remove();
                            }

                        }
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
                    if (UserInfo.OrganizationType.toString() != "4") {
                        $(".form-1").hide();
                    }
                    var CheliangId = prevNextpage.PageInfo.IDS[prevNextpage.PageInfo.Index];

                    GetData("003300300049", CheliangId, function (data) {
                        if (data) {
                            fillFormData(data, "Form4");
                            $("#CheZhuLeiXing").trigger("change");
                        }
                    })
                });

                //车辆车机属性
                $('#tab5').on('click', function () {
                    var CheliangId = prevNextpage.PageInfo.IDS[prevNextpage.PageInfo.Index];
                    $("#SIMXuLieHao").css("border", "1px solid #e5e5e5");
                    GetData("003300300050", CheliangId, function (data) {
                        if (data) {
                            fillFormData(data, "Form5");
                            orgSIMKaHao = $("#SIMKaHao").val();
                            orgSIMXLH = $("#SIMXuLieHao").val();

                        } else {
                            var YunYingShangMingCheng = UserInfo.OrganizationName;
                            $("#YunYingShangMingCheng").val(YunYingShangMingCheng);
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

                //选择业户
                $("#btnSetYeHu").on('click', function (e) {
                    e.preventDefault();
                    popdialog.showModal({
                        'url': 'YeHu.html',
                        'width': '1200px',
                        'showSuccess': GetYeHu
                    });
                });

                //选择gps运营商和分公司
                $("#btnSetYunYingShang").on('click', function (e) {
                    e.preventDefault();
                    popdialog.showModal({
                        'url': 'YunYingShang.html',
                        'width': '1200px',
                        'showSuccess': GetYunYingShang
                    });
                });

                //选择车队
                $("#btnSetCheDui").on('click', function (e) {
                    e.preventDefault();
                    popdialog.showModal({
                        'url': 'CheDui.html',
                        'width': '1200px',
                        'showSuccess': GetCheDui
                    });
                });

                /**
                **保存
                **/

                //修改车辆基本信息
                $('#btnSave1').on('click', function () {

                    //必填项校验
                    if (!btn.initial({ Id: "Form1" })) {
                        return;
                    }
                    var Data = $("#Form1").serializeObject();
                    //保存数据

                    Data["Id"] = $("#Id").val();
                    Data["ChePaiHao"] = $("#ChePaiHao").val().toUpperCase();

                    GetData("003300300059", Data, function (data) {
                        toast.success("保存成功!");
                    });
                });

                //车辆详细信息修改
                $('#btnSave2').on('click', function () {

                    //必填项校验
                    if (!btn.initial({ Id: "Form2" })) {
                        return;
                    }

                    var Data = $("#Form2").serializeObject();
                    Data["Id"] = $("#Id").val();
                    //数据校验部分

                    //var s = ["3", "4", "8"];
                    //if (s.indexOf($("#CheLiangZhongLei").val()) >= 0) {
                    //    if (!Data["DunWei"]) {
                    //        tipdialog.errorDialog('吨位为必填项!');
                    //        return;
                    //    }
                    //}
                    if (CheckSubmit(Data) == false) {
                        return;
                    };


                    GetData("003300300060", Data, function (data) {
                        toast.success("保存成功!");
                    })
                });

                //车辆数据上报设置修改
                $('#btnSave3').on('click', function () {

                    //先判断是否保存了车辆基础信息
                    var CheliangId = $("#Id").val();
                    if (CheliangId.toString().trim() == "") {
                        tipdialog.errorDialog('请先保存车辆基础信息!');
                        return;
                    }
                    var list = [];
                    var Data = $("#Form3").serializeObject();
                    Data["CheliangId"] = CheliangId;

                    if (Data.IsZhuanWangShuJu == "1") {
                        list.push({ CheliangId: Data["CheliangId"], ShuJuShangBaoLeiXing: 1 });
                    }

                    if (Data.IsShangChuanYunZhenWang == "1") {
                        list.push({ CheliangId: Data["CheliangId"], ShuJuShangBaoLeiXing: 2 });
                    }
                    if (Data.IsBaoFeiCheLiang == "1") {
                        list.push({ CheliangId: Data["CheliangId"], ShuJuShangBaoLeiXing: 3 });
                    }

                    //保存数据
                    GetData("003300300061", { CheliangId: CheliangId, list: list }, function (data) {
                        toast.success("保存成功!");
                    })
                });

                //修改车辆业户信息
                $('#btnSave4').on('click', function () {

                    //先判断是否保存了车辆基础信息
                    var CheliangId = $("#Id").val();
                    if (CheliangId.toString().trim() == "") {
                        tipdialog.errorDialog('请先保存车辆基础信息!');
                        return;
                    }

                    //必填项校验
                    if (!btn.initial({ Id: "Form4" })) {
                        return;
                    }
                    var Data = $("#Form4").serializeObject();

                    if (Data["CheZhuLeiXing"] == "1") {
                        //业户类型为企业时 企业名称 经营许可证号为必填项
                        if (Data["QiYeMingCheng"] == undefined || Data["QiYeMingCheng"].trim() == "") {
                            tipdialog.errorDialog('企业名称为必填项!');
                            return;
                        }
                        //if (Data["JingYingXuKeZhengHao"] == undefined || Data["JingYingXuKeZhengHao"].trim() == "") {
                        //    tipdialog.errorDialog('经营许可证号为必填项!');
                        //    return;
                        //}
                    } else {
                        //业户类型为个人时 车主名称 为必填项
                        if (Data["GeRenCheZhuMingCheng"] == undefined || Data["GeRenCheZhuMingCheng"].trim() == "") {
                            tipdialog.errorDialog('个人车主名称为必填项!');
                            return;
                        }
                    }

                    Data["CheliangId"] = CheliangId;
                    //保存数据
                    GetData("003300300105", Data, function (data) {
                        toast.success("保存成功!");

                    })
                });

                //修改车辆车机属性

                $("input[name='SIMKaHao']").blur(
                    function () {
                        helper.Ajax('003300300144', { SIMKaHao: $("#SIMKaHao").val() }, function (data) {
                            if (data.body.biaoZhi == true) {
                                tipdialog.errorDialog('当前SIM卡号已被使用，请确认!');
                                //清除SIM考号和序列号
                                if (orgSIMKaHao != data.body.simKaHao) {
                                    $("#SIMKaHao").val('');
                                    $("#SIMXuLieHao").val('');
                                } else {
                                    $("#SIMKaHao").val(data.body.simKaHao);
                                    $("#SIMXuLieHao").val(data.body.simXuLieHao);
                                }

                            }
                            if (data.body.biaoZhi == false) {
                                if (data.body.simKaHao) {
                                    $("#SIMKaHao").val(data.body.simKaHao);
                                    $("#SIMXuLieHao").val(data.body.simXuLieHao);
                                } else {
                                    $("#SIMKaHao").val();
                                    $("#SIMXuLieHao").val('');
                                }
                            }
                            if (data.body.wuxiaobiaozhi == true) {
                                tipdialog.errorDialog('当前SIM卡号为无效卡，请确认!');
                                $("#SIMKaHao").val(orgSIMKaHao);
                                $("#SIMXuLieHao").val(orgSIMXLH);
                            }
                            //} else {
                            //    $("#SIMKaHao").val();
                            //    $("#SIMXuLieHao").val('');
                            //}
                        }, false);
                    }//fun

                );

                $('#btnSave5').on('click', function () {

                    if ($("#ZhongDuanLeiXing").val().trim() == "") {
                        tipdialog.errorDialog('请先安装终端!');
                        return;
                    }

                    //先判断是否保存了车辆基础信息
                    var CheliangId = $("#Id").val();
                    if (CheliangId.toString().trim() == "") {
                        tipdialog.errorDialog('请先保存车辆基础信息!');
                        return;
                    }

                    //必填项校验
                    if (!btn.initial({ Id: "Form5" })) {
                        return;
                    }
                    var Data = $("#Form5").serializeObject();

                    Data["CheliangId"] = CheliangId;

                    var reg = /^[0-9]*$/;
                    if (!reg.test(Data["M1"])) {
                        tipdialog.errorDialog('M1必须为数字!');
                        return;
                    }

                    if (!reg.test(Data["IA1"])) {
                        tipdialog.errorDialog('IA1必须为数字!');
                        return;
                    }

                    if (!reg.test(Data["IC1"])) {
                        tipdialog.errorDialog('IC1必须为数字!');
                        return;
                    }
                    if ($("#ShiFouAnZhuangShiPingZhongDuan").val() == "true") {
                        if ($("#ShiPingTouGeShu").val() == "" || $("#ShiPingTouGeShu").val() == undefined) {
                            tipdialog.errorDialog('视频头个数必填!');
                            return;

                        }

                    }

                    if (CheckSubmitfrm5(Data) == false) {
                        return;
                    };

                    var servicecode;
                    //判断是否是安装终端
                    //if (window.parent.document.getElementById('ISAnZhuangZhongDuan').value.trim() == "") {
                    //    servicecode = "003300300062";
                    //} else {
                    servicecode = "003300300062";
                    //  }
                    var yysmc = $("#YunYingShangMingCheng").val();
                    Data["YunYingShangMingCheng"] = yysmc;
                    //传入原来的SIM卡号
                    Data["OrgSIMKaHao"] = orgSIMKaHao;

                    //保存数据
                    GetData(servicecode, Data, function (data) {
                        //if (data.body) {
                        CheJi = true;
                        toast.success("保存成功!");
                        orgSIMKaHao = $("#SIMKaHao").val();
                        orgSIMXLH = $("#SIMXuLieHao").val();

                        //} else {
                        //    tipdialog.errorDialog("当前的SIM卡号已被" + data.mes + "绑定");
                        //}

                    })
                });

                //修改车辆服务信息
                $('#btnSave6').on('click', function () {

                    if ($("#ZhongDuanLeiXing").val().trim() == "") {
                        tipdialog.errorDialog('请先安装终端!');
                        return;
                    }

                    //先判断是否保存了车辆基础信息
                    var CheliangId = $("#Id").val();
                    if (CheliangId.toString().trim() == "") {
                        tipdialog.errorDialog('请先保存车辆基础信息!');
                        return;
                    }

                    //必填项校验
                    if (!btn.initial({ Id: "Form6" })) {
                        return;
                    }
                    var Data = $("#Form6").serializeObject();

                    Data["CheliangId"] = CheliangId;
                    //保存数据

                    var servicecode;
                    //判断是否是安装终端
                    //if (window.parent.document.getElementById('ISAnZhuangZhongDuan').value.trim() == "") {
                    //    servicecode = "003300300063";
                    //} else {
                    servicecode = "003300300057";

                    //}

                    GetData(servicecode, Data, function (data) {
                        FuWu = true;
                        toast.success("保存成功!");
                    })
                });

                //修改车辆终端安装信息
                $('#btnSave7').on('click', function () {

                    if ($("#ZhongDuanLeiXing").val().trim() == "") {
                        tipdialog.errorDialog('请先安装终端!');
                        return;
                    }

                    //先判断是否保存了车辆基础信息
                    var CheliangId = $("#Id").val();
                    if (CheliangId.toString().trim() == "") {
                        tipdialog.errorDialog('请先保存车辆基础信息!');
                        return;
                    }

                    //必填项校验
                    if (!btn.initial({ Id: "Form7" })) {
                        return;
                    }
                    var Data = $("#Form7").serializeObject();

                    Data["CheliangId"] = CheliangId;

                    var servicecode;
                    //判断是否是安装终端
                    //if (window.parent.document.getElementById('ISAnZhuangZhongDuan').value.trim() == "") {
                    //    servicecode = "003300300064";
                    //} else {
                    servicecode = "003300300058";
                    // }

                    //保存数据
                    GetData(servicecode, Data, function (data) {
                        ZD = true;
                        toast.success("保存成功!");
                    })
                });



                updateData();
                //个性化代码块

                $("#ShiFouAnZhuangShiPingZhongDuan").on("change", function () {
                    if ($(this).val() == "true") {
                        $("#ShiPingTouGeShu").removeAttr("disabled");

                    } else {
                        $("#ShiPingTouGeShu").val("");
                        $("#ShiPingTouGeShu").attr("disabled", "disabled");

                    }
                });



                //修改车牌号

                //$("#btnXiuGaiChePaiHao").on('click', function (e) {
                //    e.preventDefault();
                //    popdialog.showModal({
                //        'url': 'XiuGaiChePaiHao.html',
                //        'width': '500px',
                //       'showSuccess': GetChePaiHaoMa
                //    });
                //});


                //region
                //endregion
            };


            //企业弹框
            function GetYeHu() {
                InitYeHu();
                $('#btnSearchYeHu').click(function (e) {
                    e.preventDefault();
                    $("#YeHu").CustomTable("reload");
                });
                //确定
                $('#btnYeHuXuanZe').on('click', function (e) {
                    e.preventDefault();
                    var rows = $("#YeHu").CustomTable('getSelection'),
                        ids = [];
                    if (rows == undefined) {
                        tipdialog.errorDialog('请选择业户信息');
                        return false;
                    }

                    if (rows.length != 1) {
                        tipdialog.errorDialog('仅可选择一个业户');
                        return false;
                    }

                    $("#JingYingXuKeZhengHao").val(rows[0].data.JingYingXuKeZhengHao);
                    $("#QiYeMingCheng").val(rows[0].data.YeHuMingCheng);
                    $("#QiYeOrgCode").val(rows[0].data.BenDanWeiOrgCode);
                    $("#QiYeID").val(rows[0].data.Id);
                    $('.close').trigger('click');
                });

            }
            //GPS运营商和分公司弹框
            function GetYunYingShang() {
                InitYunYingShang();
                $('#btnSearchYunYingShang').click(function (e) {
                    e.preventDefault();
                    $("#YUNYINGSHANG").CustomTable("reload");
                    //$("#QiYeMingCheng").val('');
                });
                //确定
                $('#btnYunYingShangXuanZe').on('click', function (e) {
                    e.preventDefault();
                    var rows = $("#YUNYINGSHANG").CustomTable('getSelection'),
                        ids = [];
                    if (rows == undefined) {
                        tipdialog.errorDialog('请选择运营商信息');
                        return false;
                    }

                    if (rows.length != 1) {
                        tipdialog.errorDialog('仅可选择一个运营商');
                        return false;
                    }

                    //$("#JingYingXuKeZhengHao").val(rows[0].data.JingYingXuKeZhengHao);
                    //debugger;
                    $("#JiGouMingCheng").val(rows[0].data.JiGouMingCheng);
                    $("#YunYingShangOG").val(rows[0].data.BenDanWeiOrgCode);
                    //$("#QiYeID").val(rows[0].data.Id);
                    $('#close1').trigger('click');
                });

            }
            //车队弹框
            function GetCheDui() {
                InitCheDui();
                $('#btnSearchCheDui').click(function (e) {
                    e.preventDefault();
                    $("#CheDui").CustomTable("reload");
                });
                //确定
                $('#btnYeHuCheDui').on('click', function (e) {
                    e.preventDefault();
                    var rows = $("#CheDui").CustomTable('getSelection'),
                        ids = [];
                    if (rows == undefined) {
                        tipdialog.errorDialog('请选择需要车队信息');
                        return false;
                    }
                    if (rows.length != 1) {
                        tipdialog.errorDialog('仅可选择一个业户');
                        return false;
                    }
                    $("#CheDuiMingCheng").val(rows[0].data.JiGouMingCheng);
                    $("#CheDuiID").val(rows[0].data.Id);
                    $("#CheDuiOrgCode").val(rows[0].data.BenDanWeiOrgCode);
                    $('.close').trigger('click');
                });
            }

            //企业列表初始化
            function InitYeHu() {
                $("#YeHu").CustomTable({
                    ajax: helper.AjaxData("003300300071", ///"00020003"为接口服务地址，需要在/Config/conwin.system.js中配置
                        function (data) {
                            var pageInfo = {
                                Page: data.start / data.length + 1,
                                Rows: data.length
                            };
                            for (var i in data) {
                                delete data[i];
                            }
                            var para = {
                                YeHuMingCheng: $("#ZiBiao_QiYeMingCheng").val(),
                                JiGouMingCheng: $("#JiGouMingCheng").val(),//传不修改运营商时，的运营商名称
                                YunYingShangOG: $("#YunYingShangOG").val(),
                                //0121ttYunYingShangOG1: $("#YunYingShangOG1").val(),
                                ChePaiHao: $("#ChePaiHao").val(),
                                ChePaiYanSe: $("#ChePaiYanSe").val()
                            };
                            pageInfo.data = para;
                            $.extend(data, pageInfo);
                        }, null),
                    single: false,
                    filter: true,
                    ordering: true, /////是否支持排序
                    "dom": 'fr<"table-scrollable"t><"row"<"col-md-2 col-sm-12 pagination-l"l><"col-md-3 col-sm-12 pagination-i"i><"col-md-7 col-sm-12 pagnav pagination-p"p>>',
                    columns: [{
                        render: function (data, type, row) {
                            return '<input type=checkbox class=checkboxes />';
                        }
                    },
                    { data: 'YeHuMingCheng' },
                    { data: 'JingYingXuKeZhengHao' }
                    ],
                    pageLength: 10,
                    "fnDrawCallback": function (oSettings) {
                        tableheadfix.ResetFix();
                        $('#YeHu_wrapper .table-scrollable').css({ 'height': '350px', 'overflow-y': 'auto' });

                    }
                });
                //   tableheadfix.InitFix(system.OnlyTableFix);
            };
            //Gps运营商和分公司列表初始化
            function InitYunYingShang() {
                $("#YUNYINGSHANG").CustomTable({
                    ajax: helper.AjaxData("003300300130", ///"00020003"为接口服务地址，需要在/Config/conwin.system.js中配置
                        function (data) {
                            var pageInfo = {
                                Page: parseInt(data.start / data.length + 1),
                                // Page: data.start / data.length + 1,
                                Rows: data.length
                            };
                            for (var i in data) {
                                delete data[i];
                            }
                            //debugger;
                            var para = {
                                JiGouMingCheng: $("#ZiBiao_YUNYINGSHANGMINGCHENG").val(),
                                QiYeOrgCode: $("#QiYeOrgCode").val()//传企业的组织代码
                            };
                            pageInfo.data = para;
                            $.extend(data, pageInfo);
                        }, null),
                    single: false,
                    filter: false,
                    ordering: false, /////是否支持排序
                    "dom": 'fr<"table-scrollable"t><"row"<"col-md-2 col-sm-12 pagination-l"l><"col-md-3 col-sm-12 pagination-i"i><"col-md-7 col-sm-12 pagnav pagination-p"p>>',
                    columns: [{
                        data: 'Id',
                        render: function (data, type, row) {
                            return '<input type=checkbox class=checkboxes />';
                        }
                    },
                    { data: 'JiGouMingCheng' },
                    ],
                    pageLength: 10,
                    "fnDrawCallback": function (oSettings) {
                        tableheadfix.ResetFix();
                        $('#YUNYINGSHANG_wrapper .table-scrollable').css({ 'height': '450px', 'overflow-y': 'auto' });
                    }
                });
                //  tableheadfix.InitFix(system.OnlyTableFix);
            };

            //车队列表初始化
            function InitCheDui() {
                $("#CheDui").CustomTable({
                    ajax: helper.AjaxData("003300300072", ///"00020003"为接口服务地址，需要在/Config/conwin.system.js中配置
                        function (data) {
                            var pageInfo = {
                                Page: data.start / data.length + 1,
                                Rows: data.length
                            };
                            for (var i in data) {
                                delete data[i];
                            }
                            var para = {
                                JiGouMingCheng: $("#JiGouMingCheng").val()
                            };
                            pageInfo.data = para;
                            $.extend(data, pageInfo);
                        }, null),
                    single: false,
                    filter: true,
                    ordering: true, /////是否支持排序
                    "dom": 'fr<"table-scrollable"t><"row"<"col-md-2 col-sm-12 pagination-l"l><"col-md-3 col-sm-12 pagination-i"i><"col-md-7 col-sm-12 pagnav pagination-p"p>>',
                    columns: [{
                        render: function (data, type, row) {
                            return '<input type=checkbox class=checkboxes />';
                        }
                    },
                    { data: 'JiGouMingCheng' }

                    ],
                    pageLength: 10,
                    "fnDrawCallback": function (oSettings) {
                        tableheadfix.ResetFix();

                    }
                });
                //   tableheadfix.InitFix(system.OnlyTableFix);
            };

            //绑定基本信息数据方法
            function updateData() {
                var id = prevNextpage.PageInfo.IDS[prevNextpage.PageInfo.Index];
                var CheliangId = prevNextpage.PageInfo.IDS[prevNextpage.PageInfo.Index];
                GetData("003300300046", CheliangId, function (data) {
                    fillFormData(data, "Form1");
                    $("#Id").val(data["Id"]);

                    $("#XiaQuShi").trigger("change");

                    //var selectedOption = $("#XiaQuXian").find("option");
                    //$(selectedOption).each(function (i, item) {
                    //    if (item.value == data["XiaQuXian"]) {
                    //        $(item).html(data["XiaQuXian"]);
                    //    }
                    //})

                    XiaQuXian = data["XiaQuXian"];



                    if (window.parent.document.getElementById('ISAnZhuangZhongDuan').value.trim() != "") {
                        $('#tab5').trigger('click');
                    }
                });

                GetData("003300300050", CheliangId, function (data) {
                    if (data) {
                        fillFormData(data, "Form5");
                    }

                })
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
                    var UserInfo = helper.GetUserInfo();
                    if (UserInfo.OrganizationType == 4) {

                    }
                    if ($(item).attr('name') == "ShiFouAnZhuangShiPingZhongDuan") {
                        if (!resource[$(item).attr('name')]) {
                            $("#ShiPingTouGeShu").attr("disabled", "disabled");
                        }

                    }
                    if (tempValue != undefined) {
                        if ($(item).hasClass('datetimepicker')) {
                            tempValue = tempValue.substr(11, 5);
                        }
                        if ($(item).hasClass('datepicker')) {
                            tempValue = tempValue.substr(0, 10);
                        }
                        //debugger;
                        //TODO: 赋值
                        $(item).val(tempValue.toString() == '' ? '' : tempValue.toString());

                    }//tt
                    /*else {
                        $(item).val('');
                        if ($(item).attr('name') == "YunYingShangMingCheng") {
                            if (resource[$(item).attr('name')] == null) {
                                var yunYingShangMingCheng = UserInfo.OrganizationName;
                                $(item).val(yunYingShangMingCheng);
                            }

                        }//tt

                    }*/
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

            //级联城市下拉框
            function selectCity() {
                var defaultOption = '<option value="" selected="selected">请选择</option>';
                $('#XiaQuShi, #XiaQuXian').empty().append(defaultOption);

                var data = { "Province": "广东" };///todo:初始化省份
                ///调用接口初始化城市下拉框
                selectcity.setXiaQu('00000020005', data, '#XiaQuShi', function () {
                    var XiaQuShi = UserInfo.OrganizationManageArea;
                    XiaQuShi = XiaQuShi.replace(/广东/g, "");
                    var list = XiaQuShi.split("|");
                    $("#XiaQuShi").find("option").each(function (index, item) {
                        if (list.indexOf($(item).val()) < 0 && $(item).val() != "") {
                            $(item).remove();
                        }
                    });
                }, 'GetCityList', 'CityName');

                $('#XiaQuShi').on("change", function () {
                    $('#XiaQuXian').empty().append(defaultOption);
                    var data = { "City": $(this).val() };
                    if ($(this).val() != '') {
                        ///调用接口初始化区县下拉框
                        selectcity.setXiaQu('00000020006', data, '#XiaQuXian', function () {
                            $("#XiaQuXian").val(XiaQuXian);
                        }, 'GetDistrictList', 'DistrictName');
                    }
                });

                $('#XiaQuXian').change(function () {
                    var data = { "District": $(this).val() };
                });
            }


            //跳转到收费页面
            function gotoShouFei(id) {
                if (id == null || id == undefined) {
                    id = ''
                }
                $("#hdTag").val(id);
                popdialog.showIframe({
                    'url': '/modules/gpsdagl/cheliangshoufeijilu/Add.html',
                    head: false
                });

                //  window.location.href = '/modules/gpsdagl/cheliangshoufeijilu/list.html?type=1&id=' + id;
            }
            var setdate = function () { };

            //个性化代码块
            //region
            //endregion
            initPage();
            function CheckSubmit(Data) {
                var msg = "";
                var re = /^[0-9]+.?[0-9]*$/;

                var paiQiLiang = Data["PaiQiLiang"];
                if (paiQiLiang != "") {

                    if (!re.test(paiQiLiang)) {
                        msg += "排气量输入的不是数字，请输入数字!<br/>";
                    }
                }
                var zongZhiLiang = Data["ZongZhiLiang"];
                if (zongZhiLiang != "") {

                    if (!re.test(zongZhiLiang)) {
                        msg += "总质量输入的不是数字，请输入数字!<br/>";
                    }
                }
                var CheGao = Data["CheGao"];
                if (CheGao != "") {

                    if (!re.test(CheGao)) {
                        msg += "车高输入的不是数字，请输入数字!<br/>";
                    }
                }
                var CheChang = Data["CheChang"];
                if (CheChang != "") {

                    if (!re.test(CheChang)) {
                        msg += "车长输入的不是数字，请输入数字!<br/>";
                    }
                }
                var CheKuan = Data["CheKuan"];
                if (CheKuan != "") {

                    if (!re.test(CheKuan)) {
                        msg += "车宽输入的不是数字，请输入数字!<br/>";
                    }
                }
                var ZuoWei = Data["ZuoWei"];
                if (ZuoWei != "") {

                    if (!re.test(ZuoWei)) {
                        msg += "座位输入的不是数字，请输入数字!<br/>";
                    }
                }
                //var DunWei = Data["DunWei"];
                //if (DunWei != "") {

                //    if (!re.test(DunWei)) {
                //        msg += "吨位输入的不是数字，请输入数字!<br/>";
                //    }
                //}

                if (msg != "") {
                    tipdialog.errorDialog(msg);
                    return false;
                } else {
                    return true
                }
            }
            function CheckSubmitfrm5(Data) {
                var msg = "";
                var re = /^[0-9]*[1-9][0-9]*$/;
                var ZuiGaoSuDu = Data["ZuiGaoSuDu"];
                if (ZuiGaoSuDu != "") {

                    if (!re.test(ZuiGaoSuDu)) {
                        msg += "最高速度输入的不是正整数，请输入正整数!<br/>";
                    }
                }
                var ZuiDiSuDu = Data["ZuiDiSuDu"];
                if (ZuiDiSuDu != "") {

                    if (!re.test(ZuiDiSuDu)) {
                        msg += "最低速度输入的不是正整数，请输入正整数!<br/>";
                    }
                }
                //var ShangXianDuanKou = Data["ShangXianDuanKou"];
                //if (ShangXianDuanKou != "") {
                //    if (!re.test(ShangXianDuanKou)) {
                //        msg+="上线端口输入的不是正整数，请输入正整数!<br/>"
                //    }
                //}

                //var ZhongDuanHao = Data["ZhongDuanHao"];
                //if (ZhongDuanHao != "") {

                //    if (!re.test(ZhongDuanHao)) {
                //        msg += "终端号只能是正整数!<br/>";
                //    }
                //}

                //var IMEIKaHao = Data["IMEIKaHao"];
                //if (IMEIKaHao != "") {

                //    if (!re.test(IMEIKaHao)) {
                //        msg += "IMEIKaHao只能是正整数!<br/>";
                //    }
                //}
                var SIMKaHao = Data["SIMKaHao"];
                if (SIMKaHao != "") {
                    var re1 = /^\d{11,15}$/;
                    if (!re1.test(SIMKaHao)) {
                        msg += "SIM卡号应该只允许为11位到15位数字!<br/>";
                    }
                }
                if (msg != "") {
                    tipdialog.errorDialog(msg);
                    return false;
                } else {
                    return true
                }
            }


            //function GetChePaiHaoMa() {
            //    $("#ChePaiHaoMa").val($("#ChePaiHao").val());
            //    $('#btnXiuGaiChePaiXuZe').on('click', function (e) {
            //        e.preventDefault();
            //        var CheliangId = $("#ChePaiHaoMa").val();

            //        $('.close').trigger('click');
            //    });
            //}

        });
});