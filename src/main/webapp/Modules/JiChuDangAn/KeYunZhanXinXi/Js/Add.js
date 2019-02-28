define(['/Modules/Config/conwin.main.js'], function () {
    require(['jquery', 'popdialog', 'tipdialog', 'toast', 'helper', 'common', 'formcontrol', 'prevNextpage', 'tableheadfix', 'system', 'selectcity', 'selectCity2', 'filelist', 'metronic', 'customtable', 'bootstrap-datepicker.zh-CN', 'bootstrap-datetimepicker.zh-CN'],
        function ($, popdialog, tipdialog, toast, helper, common, formcontrol, prevNextpage, tableheadfix, system, selectcity,selectCity2, filelist, Metronic, fileupload) {
            common.AutoFormScrollHeight('#Form1');
            $('.date-picker').datepicker({ format: 'yyyy-mm-dd', autoclose: true, language: 'zh-CN' });
            formcontrol.initial();

            var userInfo = helper.GetUserInfo();
            $("#Province").change(function(){
                var province = $("#Province").val();
                $("#City").empty();
                var arr = helper.getCity(province);
                // 循环动态添加option
                $("#City").append("<option value=''>"+"请选择"+"</option>");
                for (var i = 0; i < arr.length ; i++) {
                    $("#City").append("<option value='"+arr[i]+"'>"+arr[i]+"</option>");
                }
            });

            var initPage = function () {
                common.AutoFormScrollHeight('#Form1');
                formcontrol.initial();
                //保存
                $('#saveBtn').on('click', function (e) {
                    e.preventDefault();
                    var flags = true;
                    var msg = '';
                    var fromData = $('#Form1').serializeObject();
                    if ($.trim(fromData.UnitName) == '') {
                        msg += "单位名称 是必填项<br/>";
                    }
                    if ($.trim(fromData.Province) == '') {
                        msg += "辖区省 是必填项<br/>";
                    }
                    if ($.trim(fromData.City) == '') {
                        msg += "辖区市 是必填项<br/>";
                    }
                    if ($.trim(fromData.BusinessType) == '') {
                        msg += "经济类型 是必填项<br/>";
                    }
                    if ($.trim(fromData.PermitWord) == '') {
                        msg += "经营许可证字 是必填项<br/>";
                    }
                    if ($.trim(fromData.PermitNum) == '') {
                        msg += "经营许可证号 是必填项<br/>";
                    }
                    if ($.trim(fromData.PermitDate) == '') {
                        msg += "经营许可证有效期 是必填项<br/>";
                    }
                    if ($.trim(fromData.Address) == '') {
                        msg += "地址 是必填项<br/>";
                    }
                    if ($.trim(fromData.Name) == '') {
                        msg += "联系人姓名 是必填项<br/>";
                    }
                    if ($.trim(fromData.IdCard) == '') {
                        msg += "联系人身份证号 是必填项<br/>";
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
            };
            //保存
            function save() {
                var jsonData1 = $('#Form1').serializeObject();
                for (var key in jsonData1) {
                    jsonData1[key] = jsonData1[key].replace(/\s/g, "");
                }
                console.log(JSON.stringify(jsonData1));
                //调用新增接口
                helper.Ajax("008808800030", jsonData1, function (data) {
                    if ($.type(data) == "string") {
                        data = helper.StrToJson(data);
                    }
                    if (data.publicresponse.statuscode == 0) {
                        toast.success("创建成功");
                        setTimeout(function () { window.location.href = "List.html"; }, 2000);
                    }
                    else {
                        tipdialog.alertMsg(data.publicresponse.message);
                    }
                }, false);
            };
            initPage();
        });


});
