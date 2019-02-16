define(['/Modules/Config/conwin.main.js', '/Modules/GPSDAGL/CheLiangDangAn/Config/config.js', '/Modules/GPSDAGL/CheLiangShouFeiJiLu/Js/Config/config.js'], function () {
    require(['jquery', 'popdialog', 'tipdialog', 'toast', 'helper', 'common', 'tableheadfix', 'system', 'selectcity', 'UserConfig', 'searchbox', 'customtable', 'bootstrap-datepicker.zh-CN', 'permission', 'fileupload2'],
        function ($, popdialog, tipdialog, toast, helper, common, tableheadfix, system, selectcity, UserConfig,fileupload2) {
            var initPage = function () {
              
                $(".date-picker").datepicker();
                //初始化table
                initlizableTable();
                //查询
                $('#btnSearch').click(function (e) {
                    e.preventDefault();
                    if ($("#ChePaiHao").val().trim() != "" && $("#ChePaiHao").val().trim().length < 3) {
                        tipdialog.errorDialog('请输入合法的车牌号码（至少三位）');
                        return;
                    }
                    $("#tb_CheLiangXinXi").CustomTable("reload");
                });
                //重置
                $("#btnReset").click(function (e) {
                    e.preventDefault();
                    $('.searchpanel-form').find('input[type=text]:not(:disabled), select:not(:disabled)').val('');
                });
                //新增
                $("#btnAdd").click(function (e) {
                    e.preventDefault();
                    //TODO:编写逻辑
                    popdialog.showIframe({
                        'url': 'Add.html',
                        head: false
                    });
                });
                //修改
                $("#btnEdit").click(function (e) {
                    e.preventDefault();

                    var rows = $("#tb_CheLiangXinXi").CustomTable('getSelection'),
                        ids = [];
                    if (rows == undefined) {
                        tipdialog.errorDialog('请选择需要查看的行');
                        return false;
                    }
                    if (rows.length > 1) {
                        tipdialog.errorDialog('只能选择单行数据!');
                        return false;
                    }
                    $(rows).each(function (i, item) {
                        ids.push(item.data.Id);
                    });
                    $('#hdIDS').val(ids.join(','));
                    //TODO:编写逻辑
                    popdialog.showIframe({
                        'url': 'Edit.html',
                        head: false
                    });
                });
                //复选框的控制
                //$('#tb_CheLiangXinXi').on('change','.sorting_1 .checkboxes', function (e) {
                //          $('#CheLiangExport').removeAttr('disabled');
                //    $('.sorting_1 .checkboxes').parent().each(function(i,item){

                //       if($(item).attr('class') == "checked") {
                //            $('#CheLiangExport').attr('disabled', 'disabled');
                //       }
                //    })

                //});

                // $('#tb_CheLiangXinXi').on('change','.group-checkable', function (e) {
                //    if ($(e.currentTarget).parent().attr('class') == "checked") {
                //        $('#CheLiangExport').attr('disabled', 'disabled');
                //    } else {
                //        $('#CheLiangExport').removeAttr('disabled');
                //    }

                //});

                //删除
                $('#btnDel').on('click', function (e) {
                    e.preventDefault();
                    var flag = true;
                    var rows = $("#tb_CheLiangXinXi").CustomTable('getSelection'),
                        ids = [];
                    if (rows == undefined) {
                        tipdialog.errorDialog('请选择需要删除的行!');
                        return false;
                    }
                    if (rows.length > 1) {
                        tipdialog.errorDialog('只能选择一行!');
                        return;
                    }
                    $(rows).each(function (i, item) {

                        if (item.data.ZhongDuanAnZhangZhunTai == "已安装") {
                            flag = false;
                            return;
                        }
                        ids.push(item.data.Id);
                    });

                    if (!flag) {
                        //tipdialog.errorDialog('不能选择已安装终端的车辆!');
                        tipdialog.errorDialog('不能删除已安装终端的车辆!');
                        return;
                    }

                    //编写逻辑
                    tipdialog.confirm("确定要删除选中的记录？", function (r) {
                        if (r) {
                            //调停用接口
                            helper.Ajax("003300300043", {
                                Id: ids[0]
                            }, function (data) {
                                if (data.body) {
                                    toast.success("删除成功");
                                    $("#tb_CheLiangXinXi").CustomTable("reload");
                                } else {
                                    tipdialog.errorDialog('删除失败！' + data.publicresponse.message);
                                }
                            }, false);
                        }
                    });
                });
                //查看
                $('#btnView').on('click', function (e) {
                    e.preventDefault();
                    var rows = $("#tb_CheLiangXinXi").CustomTable('getSelection'),
                        ids = [];
                    if (rows == undefined) {
                        tipdialog.errorDialog('请选择需要查看的行');
                        return false;
                    }

                    if (rows.length > 1) {
                        tipdialog.errorDialog('只能选择一行!');
                        return;
                    }

                    //TODO:编写逻辑
                    $(rows).each(function (i, item) {
                        ids.push(item.data.Id);
                    });
                    $('#hdIDS').val(ids.join(','));
                    popdialog.showIframe({
                        'url': 'View.html',
                        head: false
                    });
                });
                //停用
                $('#btnDisable').on('click', function (e) {
                    e.preventDefault();
                    var flag = false;
                    var rows = $("#tb_CheLiangXinXi").CustomTable('getSelection'),
                        ids = [];
                    if (rows == undefined) {
                        tipdialog.errorDialog('请选择需要停用的行!');
                        return false;
                    }
                    if (rows.length > 1) {
                        tipdialog.errorDialog('只能选择一行!');
                        return;
                    }
                    $(rows).each(function (i, item) {
                        if (item.data.ZhuangTai == 4) {
                            tipdialog.errorDialog('已是停用状态！');
                            flag = true;
                            return;
                        }
                        ids.push(item.data.Id);
                    });

                    if (flag) {
                        return;
                    }

                    //编写逻辑
                    tipdialog.confirm("确定要停用选中的记录？", function (r) {
                        if (r) {
                            //调停用接口
                            helper.Ajax("003300300044", {
                                Id: ids[0],
                                "ZhuangTai": 4
                            }, function (data) {
                                if (data.body) {
                                    toast.success("停用成功");
                                    $("#tb_CheLiangXinXi").CustomTable("reload");
                                } else {
                                    tipdialog.errorDialog('停用失败！' + data.publicresponse.message);
                                }
                            }, false);
                        }
                    });
                });
                //启用
                $('#btnUse').on('click', function (e) {
                    var flag = false;
                    e.preventDefault();
                    var rows = $("#tb_CheLiangXinXi").CustomTable('getSelection'),
                        ids = [];
                    if (rows == undefined) {
                        tipdialog.errorDialog('请选择需要启用的行');
                        return false;
                    }
                    if (rows.length > 1) {
                        tipdialog.errorDialog('只能选择一行!');
                        return;
                    }
                    $(rows).each(function (i, item) {
                        if (item.data.ZhuangTai == 3) {
                            tipdialog.errorDialog('已是启用状态！');
                            flag = true;
                            return;
                        }
                        ids.push(item.data.Id);
                    });

                    if (flag) {
                        return;
                    }

                    $(rows).each(function (i, item) {
                        ids.push(item.data.Id);
                    });
                    //TODO:编写逻辑
                    tipdialog.confirm("确定要启用选中的记录？", function (r) {
                        if (r) {
                            //TODO:调作废接口
                            helper.Ajax("003300300044", {
                                Id: ids[0],
                                "ZhuangTai": 3
                            }, function (data) {
                                if (data.body) {
                                    toast.success("启用成功");
                                    $("#tb_CheLiangXinXi").CustomTable("reload");
                                } else {
                                    tipdialog.errorDialog('启用失败' + data.publicresponse.message);
                                }
                            }, false);
                        }
                    });
                });
                //安装终端
                $('#btnInstall').click(function (e) {
                    e.preventDefault();

                    var rows = $("#tb_CheLiangXinXi").CustomTable('getSelection'),
                        ids = [];
                    if (rows == undefined) {
                        tipdialog.errorDialog('请选择需要安装终端的行');
                        return false;
                    }

                    $(rows).each(function (i, item) {
                        ids.push(item.data.Id);
                    });
                    if (ids.length > 1) {
                        tipdialog.errorDialog('只能选择一行!');
                        return;
                    }

                    if (rows[0].data.ZhuangTai == 4) {
                        tipdialog.errorDialog('停用的车辆不能安装终端!');
                        return;
                    }


                    helper.Ajax("003300300107", { Id: ids[0] }, function (data) {

                        if (data.body) {
                            //编写逻辑
                            tipdialog.confirm("车辆已安装终端是否重新安装？", function (r) {
                                if (r) {
                                    popdialog.showModal({
                                        'url': 'SearchCarList.html',
                                        'width': '1200px',
                                        'showSuccess': initInstall
                                    });
                                }
                            });
                        }
                        else {
                            popdialog.showModal({
                                'url': 'SearchCarList.html',
                                'width': '1200px',
                                'showSuccess': initInstall
                            });
                        }

                    }, false);



                });

                //分配监控
                $('#btnFPJK').click(function (e) {
                    e.preventDefault();
                    popdialog.showIframe({
                        'url': 'FPJK.html',
                        head: false
                    });
                });


                //删除白名单
                $("#DelWhiteList").on("click", function (e) {
                    helper.PageLogin();
                    var rows = $("#tb_CheLiangXinXi").CustomTable('getSelection');

                    if (rows == undefined) {
                        tipdialog.errorDialog('请选择需要删除白名单的行');
                        return false;
                    }

                    if (rows.length > 1) {
                        tipdialog.errorDialog('只能选择一行!');
                        return;
                    };
                    var data = {
                        Data: {
                            RegistrationNo: rows[0].data.ChePaiHao,
                            RegistrationNoColor: rows[0].data.ChePaiYanSe
                        }
                    };


                    var data = {
                        Id: $("Id").val(),
                        ChePaiHao: rows[0].data.ChePaiHao,
                        ChePaiYanSe: rows[0].data.ChePaiYanSe
                    };

                    helper.Ajax("003300300070", data, function (result) {

                        if (result.body) {
                            $('btnDisable').trigger('click');
                            toast.success("删除白名单成功");
                            setTimeout(function () { $("#tb_CheLiangXinXi").CustomTable("reload"); }, 2000);
                        } else {
                            if (result.publicresponse.message.toString() == "该车已删除白名单") {
                                setTimeout(function () { $("#tb_CheLiangXinXi").CustomTable("reload"); }, 1000);
                                tipdialog.errorDialog("该车已删除白名单");
                                return;
                            }
                            tipdialog.errorDialog('删除白名单失败' + result.publicresponse.message);
                        }
                    }, true);

                    //UserConfig.Ajax("US0202014", data, function (resutl) {
                    //    if (resutl.ErrorCode == 0) {
                    //        if (rows[0].ZhuangTai != 3) {
                    //            helper.Ajax("003300300073", { "Id": rows[0].data.Id }, function (result) {

                    //                if (result.body) {
                    //                    $('btnDisable').trigger('click');
                    //                    toast.success("删除白名单成功");
                    //                } else {
                    //                    tipdialog.errorDialog('删除白名单失败' + data.publicresponse.message);
                    //                }
                    //            });
                    //        };
                    //    } else {
                    //        tipdialog.errorDialog(resutl.ErrorMessage);
                    //    }
                    //});
                });

                //办理业务
                $('#btnBusiness').click(function (e) {
                    e.preventDefault();
                    var rows = $("#tb_CheLiangXinXi").CustomTable('getSelection'),
                        ids = [];
                    if (rows == undefined) {
                        tipdialog.errorDialog('请选择需要业务办理的行');
                        return false;
                    }

                    $(rows).each(function (i, item) {
                        ids.push(item.data.Id);
                    });
                    if (ids.length > 1) {
                        tipdialog.errorDialog('只能选择一行!');
                        return;
                    }

                    if (rows[0].data.ZhuangTai == 4) {
                        //tipdialog.errorDialog('不能选择停用的车辆!');
                        tipdialog.errorDialog('停用的车辆不能进行业务办理!');
                        return;
                    }

                    var CheLiangIDObj = ids[0];
                    //校验车辆是否符合办理业务条件
                    var mess = "";
                    var banLiBiaoZhi = false;
                    helper.PageLogin();
                    //同步车辆信息               
                     Metronic.blockUI({ animate: true });
                    var tts = TongBuXinXiDaoDiShi(CheLiangIDObj);
                    //CheckCarInfoRight
                    helper.Ajax('003300300073', CheLiangIDObj,
                        {
                            async: false, success: function (data) {
                                data = JSON.parse(data);
                                if (data.body) {
                                    //// 获取车辆上报所需信息 GetCarInfoFromID
                                    helper.Ajax('003300300074', CheLiangIDObj,
                                        {
                                            async: false, success: function (data) {
                                               data = JSON.parse(data);
                                                if (data.body) {
                                                    banLiBiaoZhi = true;
                                                    // mess='1';

                                                } else {

                                                    mess = '获取车辆信息发生错误，上报失败!<br/>';
                                                }
                                            }
                                        }
                                        , false);
                                } else {
                                    if (data.publicresponse.message != '') {
                                        mess = data.publicresponse.message.indexOf('校验失败') != -1 ? data.publicresponse.message+'<br/>' : '车辆信息不完整!<br/>';
                                    } else {
                                        mess = '车辆信息不完整!<br/>';
                                    }
                                }

                            }

                        }, false);
                    if (banLiBiaoZhi == true) {
                        //生成证明资料Create
                        helper.Ajax('003300300096', { 'CheLiangID': CheLiangIDObj },
                            {
                                async: false, success: function (data) {
                                    data = JSON.parse(data);
                                    if (data.body) {

                                        mess = '业务办理成功!<br/>'
                                      

                                    }
                                    else {

                                        mess = '业务办理失败!<br/>';
                                    }
                                }
                            }
                            , false);
                    }
                   
                    tipdialog.errorDialog(mess + tts);
                    setTimeout(function () { $("#tb_CheLiangXinXi").CustomTable("reload"); }, 1000);
                });//btnBusiness


                function TongBuXinXiDaoDiShi(CheLiangIDObj) {
                    var mess = '';
                    helper.Ajax('003300300140', CheLiangIDObj,
                        {
                            async: false, success: function (data) {
                              data = JSON.parse(data);
                                if (data.body == true) {
                                     mess = '同步成功!'
                                } else {
                                    if (data.publicresponse.message == "该辖区不需要同步") {
                                        mess = '该辖区市不需要同步!'
                                    } else {
                                         mess = '同步失败!' + data.publicresponse.message
                                    }
                                }
                            }
                        }, false);
                    return mess;
                }

                //车辆导出
                 $("#CheLiangExport").on('click', function (e) {
                    e.preventDefault();
                    var params = $('#tb_CheLiangXinXi').DataTable().ajax.params();
                    if (params != undefined) {
                        //params.data.TongJiRiQiQi = $("#TongJiRiQiQi").val();
                        //params.data.TongJiRiQiZhi = $("#TongJiRiQiZhi").val();
                        helper.Ajax('003300300129', params.data, function (data) {
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
                    } else {
                        tipdialog.errorDialog('请先查询');
                    }
                });

            };
            //其他按钮操作
            //  $("#CheLiangOtherBtnCaoZuo").on('click', function (e) {
            //    e.preventDefault();
            //    popdialog.showModal({
            //        'url': 'OtherBtnPage.html',
            //        'width': '350px',                     
            //        'showSuccess': GetOtherBtnPage
            //    });
            //});



             // function GetOtherBtnPage(){
                  //$(".date-picker").datepicker();
               //车辆收费处理
               $("#CheLiangShouFeiChuLi").on('click', function (e) {
                e.preventDefault();
                    e.preventDefault();
                    var flag = true;
                    var rows = $("#tb_CheLiangXinXi").CustomTable('getSelection'),
                        ids = [];
                    if (rows == undefined) {
                        tipdialog.errorDialog('请选择需要收费的行!');
                        return false;
                    }
                //$(rows).each(function (i, item) {
                //    ids.push(item.data.Id);
                //});
                $(rows).each(function (i, item) {

                    if (item.data.ZhongDuanAnZhangZhunTai == "未安装") {
                        flag = false;
                        return;
                    }
                    ids.push(item.data.Id);
                });

                if (!flag) {
                    tipdialog.errorDialog('未安装终端的车辆不能进行收费!');
                    return;
                }



                  if(ids.length==1){
                      gotoShouFei(ids);
                   }else{
                        gotoPingLiangShouFei(ids);
                    }
                  
            });
                 // }//end
                //导入
                $('#CheLiangImport').fileupload({
                    businessId:$('#Id').val(),
                    multi:false,
                    timeOut:20000,
                    allowedContentType:'xlsx|xls',
                    modelUrl:'车辆导入模板.xls',
                    callback: function (data) {
                        $('#import-btn').attr('disabled', false);
                        $('#import-btn').click(function (e) {
                            e.preventDefault();
                            popdialog.closeModal();
                            var FileID = data.FileId;
                            if ($.isEmptyObject(FileID) || FileID == '') {
                                tipdialog.errorDialog('请先上传文件!');
                                return;
                            }
                            helper.Ajax('003300300146', FileID, function (data) {
                                if (data.body.statuscode == 200) {
                                    //var json = response.data.result;
                                    var json = data.body.result;
                                    var html = '';
                                    html += '<div class="modal-dialog">';
                                    html += '<div class="modal-content">';
                                    html += '<div class="modal-header">';
                                    html += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>';
                                    html += '<h4 class="modal-title">导入数据</h4>';
                                    html += '</div>';
                                    html += '<div class="modal-body">';
                                    html += "<p>完成：成功添加 " + json["SuccessCount"] + " 条记录</p>";
                                    html += '<p>失败: ' + json.ErrorLists.length + ' 条记录</p>';
                                    $.each(json.ErrorLists, function (i, item) {
                                        html += '<p style="font- size:10px;">车牌号: ' + item.ChePaiHao + " 增加失败。错误信息:" + item.ErrorMsg + "</p>";
                                    });

                                    html += '</div>';
                                    html += '</div>';
                                    html += '</div>'
                                    popdialog.showModalHtml({
                                        'html': html,
                                        'width': 'normal'
                                    });
                                } else {
                                    tipdialog.errorDialog('导入失败,模板内容格式或网络发生错误，请检查后重试!');
                                }
                            }, false);

                        });
                    }
                });

            
            //跳转到收费页面
            function gotoShouFei(ids) {
                $("#hdTag").val(ids);
                popdialog.showIframe({
                    'url': '/modules/gpsdagl/cheliangshoufeijilu/Add.html',
                    head: false
                });
            }
            //跳转到批量收费记录页面
            function gotoPingLiangShouFei(ids) {
                $("#hdTag").val(ids);
                popdialog.showIframe({
                    'url': '/modules/gpsdagl/cheliangshoufeijilu/PiLiangShouFeiList.html',
                    head: false
                });
            }
            
        


            function GetData(ServiceCode, data, callback) {
                helper.Ajax(ServiceCode, data, function (resultdata) {
                    if (typeof callback == 'function') {
                        if (typeof (resultdata) == "string") {
                            resultdata = JSON.parse(resultdata);
                        }
                        if (resultdata.publicresponse.statuscode == 0) {
                            callback(resultdata.body);
                        } else {
                            tipdialog.errorDialog(resultdata.publicresponse.message);
                        }

                    }
                }, false);
            }
            //上报车辆数据到外部接口
            function outputDataToGpsApi(data, CarId) {
                //Todo

                UserConfig.Ajax('US0202015', { Data: data }, function (resutl) {
                    if (resutl.IsSuccess) {
                        console.log('上报成功');
                        helper.Ajax('003300200158', { 'CheLiangID': CarId }, function (data) {
                            if (data.body) {
                                toast.success('业务办理成功!');
                            }
                            else {
                                tipdialog.errorDialog('业务办理失败!');
                            }
                        }, false);
                    } else {
                        tipdialog.errorDialog(resutl.ErrorMessage);
                    }
                });
            }

            //终端子表初始化
            function initInstall() {
                initlizableZDTable();
                $('#btnSearchZhongDuan').click(function (e) {
                    e.preventDefault();
                    $("#tb_Template_zd").CustomTable("reload");
                });
                //确定
                $('#btnXuanZe').on('click', function (e) {
                    e.preventDefault();
                    var rows = $("#tb_Template_zd").CustomTable('getSelection'),
                        ids = [];
                    if (rows == undefined) {
                        tipdialog.errorDialog('请选择至少一行');
                        return false;
                    }
                    //TODO:编写逻辑
                    $(rows).each(function (i, item) {
                        ids.push(item.data.Id);
                    });
                    $('#hdIDS').val(ids.join(','));
                    if (ids.length != 1) {
                        tipdialog.errorDialog('仅可选择一个终端');
                    } else {
                        var CarRows = $("#tb_CheLiangXinXi").CustomTable('getSelection'),
                            CarIds = [];
                        if (CarRows == undefined) {
                            tipdialog.errorDialog('请选择需要安装终端的行');
                            return false;
                        }

                        $(CarRows).each(function (i, item) {
                            CarIds.push(item.data.Id);
                        });
                        var carId = CarIds[0];
                        //传入终端配置表的数据
                        var zdObj = {
                            'CheLiangID': carId,
                            'ZhongDuanID': ids[0]
                        };
                        //写入数据。
                        helper.Ajax("003300300045", zdObj, function (data) {
                            if (data.body) {
                                $('.close').trigger('click');
                                toast.success("安装终端信息保存成功");
                                $("#ISAnZhuangZhongDuan").val("true");
                                $('#btnEdit').trigger('click');
                                //tipdialog.confirm("创建成功，请进一步完善其他信息。是否新增收费记录？", function (r) {
                                //    if (r) {
                                //        window.location.href = '/modules/gpsdagl/cheliangshoufeijilu/list.html?type=1';
                                //        $('#btnCreate').trigger('click');
                                //    }
                                //});
                            } else {
                                tipdialog.errorDialog('选择失败');

                            }
                        }, false);
                    }
                });
            }

            //终端子表
            function initlizableZDTable() {
                $("#tb_Template_zd").CustomTable({
                    ajax: helper.AjaxData("003300300075", ///"00020003"为接口服务地址，需要在/Config/conwin.system.js中配置
                        function (data) {
                            var pageInfo = {
                                Page: data.start / data.length + 1,
                                Rows: data.length
                            };
                            for (var i in data) {
                                delete data[i];
                            }
                            //var para = $('.searchpanel-form').serializeObject();
                            //$('.searchpanel-form').find('[disabled]').each(function (i, item) {
                            //    para[$(item).attr('name')] = $(item).val();
                            //});
                            //pageInfo.data = para;
                            //$.extend(data, pageInfo);
                            //默认查询出启用状态的终端
                            var para = {
                                'ZhongDuanLeiXing': $('#zd_ZhongDuanLeiXing').val(),
                                'SheBeiXingHao': $('#zd_SheBeiXingHao').val(),
                                'ShengChanChangJia': $('#zd_ShengChanChangJia').val(),
                                'ZhuangTai': '1'
                            };
                            pageInfo.data = para;
                            $.extend(data, pageInfo);
                        }, null),
                    single: false,
                    filter: false,
                    ordering: true, /////是否支持排序
                    "dom": 'fr<"table-scrollable"t><"row"<"col-md-2 col-sm-12 pagination-l"l><"col-md-3 col-sm-12 pagination-i"i><"col-md-7 col-sm-12 pagnav pagination-p"p>>',
                    columns: [{
                        render: function (data, type, row) {
                            return '<input type=checkbox class=checkboxes />';
                        }
                    },
                    {
                        data: 'SheBeiXingHao'
                    },
                    {
                        data: 'ShengChanChangJia'
                    },
                    {
                        data: 'ChangJiaBianHao'
                    },
                    {
                        data: 'XingHaoBianMa'
                    },
                    {
                        data: 'ZhongDuanBianMa'
                    },
                    {
                        data: 'ShiYongCheXing'
                    },
                    {
                        data: 'DingWeiMoKuai'
                    },
                    {
                        data: 'TongXunMoShi'
                    },
                    {
                        data: 'GuoJianPiCi'
                    }
                    ],
                    pageLength: 10,
                    "fnDrawCallback": function (oSettings) {
                        tableheadfix.ResetFix();

                    }
                });
                //tableheadfix.InitFix(system.OnlyTableFix);
            }

            //列表初始化
            function initlizableTable() {
                $("#tb_CheLiangXinXi").CustomTable({
                    ajax: helper.AjaxData("003300300042", ///"00020003"为接口服务地址，需要在/Config/conwin.system.js中配置
                        function (data) {
                            var pageInfo = {
                                Page: parseInt(data.start / data.length + 1),
                                Rows: data.length
                            };
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
                    columns: [{
                        render: function (data, type, row) {
                            return '<input type=checkbox class=checkboxes />';
                        }
                    },
                    { data: 'ChePaiHao' },
                    { data: 'ChePaiYanSe' },
                    {
                        data: 'CheLiangZhongLei',
                        render: function (data, type, row) {
                            switch (data) {
                                case 1:
                                    return "客运班车";
                                    break;
                                case 2:
                                    return "旅游包车";
                                    break;
                                case 3:
                                    return "危险货运";
                                    break;
                                case 4:
                                    return "重型货车";
                                    break;
                                case 5:
                                    return "公交客运";
                                    break;
                                case 6:
                                    return "出租客运";
                                    break;
                                case 7:
                                    return "教练员车";
                                    break;
                                case 8:
                                    return "普通货运";
                                    break;
                                case 9:
                                    return "其它车辆";
                                    break;
                                default:
                                    return "";
                            }
                        }
                    },
                    {
                        data: 'GeRenCheZhuMingCheng', render: function (data, type, row) {
                            if (row.GeRenCheZhuMingCheng) {
                                return row.GeRenCheZhuMingCheng;
                            } else {
                                return row.QiYeMingCheng;
                            }
                        }
                    },
                    {
                        data: 'GuFeiCheLiang',
                        render: function (data, type, row) {
                            if (data) {
                                return "是";
                            } else {
                                return "否";
                            }
                        }
                    },
                    {
                        data: 'ZhuanWangShuJu',
                        render: function (data, type, row) {
                            if (data) {
                                return "是";
                            } else {
                                return "否";
                            }
                        }
                    },
                    {
                        data:'FuWuJieZhiRiQi',
                        render: function(data,type,row) {
                            var nowTime = new Date();
                            var endTime = new Date(new Date().setMonth(new Date().getMonth() + 1));
                            if (data == undefined || data == null || data.toString().trim() == "") {
                                return "";
                            } else {
                               data= new Date(data.toString());
                                if (data > endTime) {
                                    return "正常";
                                }
                                else if (data >= nowTime) {
                                    return "预警";
                                }
                                else  {
                                    return "过期";
                                }
                             
                            }

                        }
                    },
                    {
                        data: 'ZuiJinDingWeiShiJian',
                        render: function (data, type, row) {
                            if (!data) {
                                return "";
                            } else {
                                return data.replace(/T/g, " ");
                                //return new Date(data.toString()).Format("yyyy-MM-dd HH:mm:ss");
                            }
                        }
                    },
                    {
                        data: 'ZuiJinDingWeiShiJian',
                        render: function (data, type, row) {
                            if (data == undefined || data == null || data.toString().trim() == "") {
                                return "离线";
                            } else {
                                if ((new Date() - new Date(data.toString())) / 1000 / 3600 <= 2) {
                                    return "在线";
                                } else {
                                    return "离线"
                                }
                            }

                        }
                    },
                    {
                        data: 'YeWuBanLiZhuangTai',
                        render: function (data, type, row) {
                            if (data) {
                                switch (data) {
                                    case 1: return "未办理"; break;
                                    case 2: return "已办理"; break;
                                    case 3: return "已取消"; break;
                                    default:
                                }
                            }
                        }
                    }, //需要调用静风的接口
                    { data: 'ZhongDuanAnZhangZhunTai' },
                    {
                        data: 'ZhuangTai',
                        render: function (data, type, row) {
                            switch (data) {
                                case 3:
                                    return "营运";
                                    break;
                                case 4:
                                    return "停用";
                                    break;
                                default:
                                    return "";
                            }
                        }
                    }
                    ],
                    pageLength: 10,
                    "fnDrawCallback": function (oSettings) {
                        $("#tb_CheLiangXinXi_filter").css("z-index", "1000");
                        tableheadfix.ResetFix();
                    }
                });
                tableheadfix.InitFix(system.OnlyTableFix);
            };
            //个性化代码块
            //region
            //endregion
            initPage();

        });
});