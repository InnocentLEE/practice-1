define(['/Modules/Config/conwin.main.js'], function () {
    require(['jquery', 'popdialog', 'tipdialog', 'toast', 'helper', 'common', 'tableheadfix', 'system', 'userinfo' , 'echarts', 'selectcity', 'searchbox', 'customtable', 'bootstrap-datepicker.zh-CN', 'permission'],
    function ($, popdialog, tipdialog, toast, helper, common, tableheadfix, system,userinfo,echarts) {
        var userInfo = helper.GetUserInfo();
        var organizationType = null;
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
            helper.Ajax("008808800093", userInfo.organId, function (result) {
                if ($.type(result) == "string") {
                    result = helper.StrToJson(result);
                }
                var publicresponse = result.publicresponse;
                var resultArray = result.body;
                if (publicresponse.statuscode != 0) {
                    tipdialog.errorDialog('查询出错');
                    return false;
                }else {
                    var myChart = echarts.init(document.getElementById('main'));
                    var option = {
                        title : {
                            text: '购票方式占比',
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            data: ['客运站购票','网站购票','app购票','小程序购票','公众号购票']
                        },
                        series : [
                            {
                                name: '购票方式占比',
                                type: 'pie',
                                radius : '55%',
                                center: ['50%', '60%'],
                                data:[
                                    {value:resultArray[0], name:'客运站购票'},
                                    {value:resultArray[1], name:'网站购票'},
                                    {value:resultArray[2], name:'app购票'},
                                    {value:resultArray[3], name:'小程序购票'},
                                    {value:resultArray[4], name:'公众号购票'}
                                ],
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    };
                    myChart.setOption(option);
                }
            }, false);
        };
        initPage();
    });
});