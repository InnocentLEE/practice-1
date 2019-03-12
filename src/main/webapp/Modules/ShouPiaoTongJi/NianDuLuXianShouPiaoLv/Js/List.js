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
                loadCharts({});
            });

            //重置
            $("#btnReset").click(function (e) {
                e.preventDefault();
                $('#Route').val('');
                $('#Route').text('请选择');
                resetChoose();
            });
            
            function loadCharts() {
                helper.Ajax("008808800090", $('#Route').val(), function (result) {
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
                        option.title.text = "路线【"+$('#Route').find("option:selected").text().trim()+"】年度售票率";
                        option.series[0].itemStyle = { normal: {label : {show: true}}};
                        myChart.setOption(option);
                    }
                }, false);
/*
                var option = {
                    title: {
                        text: '年度售票统计',
                        x:'center',
                        y:'top',
                    },
                    xAxis: {
                        type: 'category',
                        data: ['2018-01', '2018-02', '2018-03', '2018-04', '2018-05', '2018-06', '2018-07','2018-08', '2018-09', '2018-10', '2018-11', '2018-12', '2018-13', '2018-14','2018-15', '2018-16', '2018-17', '2018-18', '2018-19', '2018-20', '2018-21']
                    },
                    yAxis: {
                        type: 'value',
                        data: ['0', '20', '40', '60', '80', '100']
                    },
                    series: [{
                        data: [25.55, 59.11, 87.12, 39.55, 88.55, 99.51, 71, 25.55, 59.11, 87.12, 39.55, 88.55, 99.51, 71, 25.55, 59.11, 87.12, 39.55, 88.55, 99.51, 71],
                        type: 'line'
                    }]
                };
                */

            }
        };

        
        initPage();
    });
});