define(['/Modules/Config/conwin.main.js'], function () {
    require(['jquery', 'popdialog', 'tipdialog', 'toast', 'helper', 'common', 'tableheadfix', 'system', 'userinfo' , 'echarts', 'selectcity', 'searchbox', 'customtable', 'bootstrap-datepicker.zh-CN', 'permission'],
    function ($, popdialog, tipdialog, toast, helper, common, tableheadfix, system,userinfo,echarts) {
        var userInfo = helper.GetUserInfo();
        var organizationType = null;
        helper.Ajax("008808800076", userInfo.organId, function (result) {
            if ($.type(result) == "string") {
                result = helper.StrToJson(result);
            }
            var publicresponse = result.publicresponse;
            var body = result.body;
            if (publicresponse.statuscode == 0) {
                var reResult = [];
                reResult.push({ id: "QingXuanZeBiaoZhiId", text: "请选择" });
                for (var i = 0; i < result.body.length; i++) {
                    reResult.push({ id: body[i].Id, text: body[i].Item });
                }
                $("#Route").searchbox({
                    data: reResult
                });
            };
        }, false);
        $("#Route").change(function(){
            var routeId = $("#Route").val();
            helper.Ajax("008808800091", routeId, function (result) {
                if ($.type(result) == "string") {
                    result = helper.StrToJson(result);
                }
                var publicresponse = result.publicresponse;
                var body = result.body;
                if (publicresponse.statuscode == 0) {
                    $("#Year").empty();
                    // 循环动态添加option
                    $("#Year").append("<option value=''>"+"请选择"+"</option>");
                    for (var i = 0; i < result.body.length; i++) {
                        $("#Year").append("<option value='"+body[i]+"'>"+body[i]+"</option>");
                    }
                };
            }, false);
        });
        function resetChoose() {
            helper.Ajax("008808800076", userInfo.organId, function (result) {
                if ($.type(result) == "string") {
                    result = helper.StrToJson(result);
                }
                var publicresponse = result.publicresponse;
                var body = result.body;
                if (publicresponse.statuscode == 0) {
                    var reResult = [];
                    reResult.push({ id: "QingXuanZeBiaoZhiId", text: "请选择" });
                    for (var i = 0; i < result.body.length; i++) {
                        reResult.push({ id: body[i].Id, text: body[i].Item });
                    }
                    $("#Route").searchbox({
                        data: reResult
                    });
                };
            }, false);
        }
        if(userInfo.organizationType == "0"){
            organizationType = "平台运营商";
        }
        if(userInfo.organizationType == "1"){
            organizationType = "省级监管部门";
        }
        if(userInfo.organizationType == "2"){
            organizationType = "市级监管部门";
        }
        if(userInfo.organizationType == "3"){
            organizationType = "客运站";
        }
        if(userInfo.organizationType == "4"){
            organizationType = "客运企业";
        }
        if(userInfo.organizationType == "5"){
            organizationType = "客运车队";
        }
        $(".popedom").text(userInfo.organizationName+" ["+organizationType+"] - "+userInfo.organProvince + userInfo.organCity);
        console.log(userInfo);
        var initPage = function () {
            //查询
            $('#btnSearch').click(function (e) {
                e.preventDefault();
                if($('#Route').val()=='' || $('#Route').val() == 'QingXuanZeBiaoZhiId'){
                    tipdialog.errorDialog('请选择路线');
                    return false;
                }
                if($('#Year').val()==''){
                    tipdialog.errorDialog('请选择年份');
                    return false;
                }
                loadCharts({});
            });

            //重置
            $("#btnReset").click(function (e) {
                e.preventDefault();
                $('#Route').val('');
                $('#Route').text('请选择');
                $("#Year").empty();
                $("#Year").append("<option value=''>"+"请选择"+"</option>");
                resetChoose();
            });
            
            function loadCharts() {
                helper.Ajax("008808800092", {'RouteId':$('#Route').val(),'Year':$('#Year').val()}, function (result) {
                    if ($.type(result) == "string") {
                        result = helper.StrToJson(result);
                    }
                    var publicresponse = result.publicresponse;
                    var option = result.body;
                    if (publicresponse.statuscode != 0) {
                        tipdialog.errorDialog('查询出错');
                        return false;
                    }else {
                        var myChart = echarts.init(document.getElementById('main'));
                        console.log(JSON.stringify(option));
                        option.title.text = "路线【"+$('#Route').find("option:selected").text().trim()+"】"+$('#Year').val()+"年月度售票率";
                        option.series[0].itemStyle = { normal: {label : {show: true}}};
                        myChart.setOption(option);
                    }
                }, false);
            }
        };

        
        initPage();
    });
});