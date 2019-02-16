/**
 * Created by zengtao on 2018/7/25. 级联省市选择控件
 */

define(['jquery', 'helper','selectcity'], function ($, helper, selectcity) {

    var Selector = {};
    var selectProvince="";
    var alreadyProValue="广东";
    var nowTime = "";

    //初始化方法

    Selector.initSelectView = function (items) {
        var views ='<div class="btn-group select_city" style="min-width:300px">' +
            '<select class="select_province" style="position: relative;right: 180px;">' +
            '</select>' +
            '<input class="btn btn-sm btn-default" name="showInput" style="border-color: #b1adad;text-align: left;height: 23px;position: relative;left: 160px;" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">' +
            '</input>' +
            '</div>';
        items.append($(views));

        items.children('.select_city').find('.select_province').change(function(){
             var selectProvince = $(this).select();
             alreadyProValue = selectProvince["0"].value;
             $(this).next().val("");
             $(this).next().nextAll().remove();
             setXiaQuShi('00000020005', { "Province": alreadyProValue }, ($(this).parent('.select_city')), 'GetCityList', 'CityName');
        });

        //获取各省信息
        selectcity.setXiaQu('00000020004', {}, '.select_province', 'GetProvinceList', 'Key', 'Key', '广东');


        setXiaQuShi('00000020005', { "Province": alreadyProValue }, (items.children('.select_city')), 'GetCityList', 'CityName');
    }

    //获取辖区市
    function setXiaQuShi(servercode, data, control, operation, textfield, valuefield, selectvalue) {
        $(control).children('.selectedCity').remove();
        //调接口前判断cookie里是否有值
            helper.Ajax(servercode, data, function(json) {
                if (json.publicresponse.statuscode == '0') {
                    var result = json.body;
                    //写入cookie

                    if (result.length > 0) {
                        var optionStr = '<div class="dropdown-menu hold-on-click pull-left selectedCity" style="min-width: 515px;left: 160px;">' +
                            '<label style="padding-top: 20px;padding-left: 20px;margin-bottom: -10px;font-size: 16px"><input type="checkbox" class="allInput"/>全部</label><hr/><div><div class="row">';
                        $(result).each(function(i, item) {
                            if (selectvalue != undefined && selectvalue == item[valuefield]) {
                                optionStr += '<label class="col-xs-4" style="margin-left: 20px;width: 150px;font-size: 16px;"><input class="content-group-checkable" name="proinput" value="'+item[valuefield]+'"style="margin-right: 7px;" type="checkbox"/>'+item[valuefield]+'</label>';
                            } else {
                                optionStr += '<label class="col-xs-4" style="margin-left: 20px;width: 150px;font-size: 16px;"><input class="content-group-checkable" name="proinput" value="'+item.Key+'" style="    margin-right: 7px;" type="checkbox"/>'+item.Key+'</label>';
                            }
                        });
                        optionStr = optionStr +'</div><hr style="margin-top: 5px"/><div style="width: 100%;margin: auto;text-align: center;margin-bottom: 10px"><a class="btn btn-success btn-pro-con" style="margin-right: 20px;">确定</a><a class="btn c-yellow btn-pro-clear" ">清除</a></div></div></div>';


                        $(control).append(optionStr);

                        $(".content-group-checkable").uniform();
                        $(".allInput").uniform();

                        $('<style>.dropdown-menu.pull-left:before{right:450px!important}</style>').appendTo('head');

                        $(control).find('.btn-pro-con').click(function (e) {
                            $(this).parent().parent().parent().parent().find('input[name= "showInput"]').val("");
                            var alreadyValue="";
                            $(this).parent().prev().prev().find('span[class= "checked"]').each(function(index,item){
                                alreadyValue = alreadyValue +$(item).find('input').val()+"," ;
                            })
                            alreadyValue = alreadyValue.substring(0,alreadyValue.length-1);
                            $(this).parent().parent().parent().parent().find('input[name= "showInput"]').val(alreadyValue);
                            $(this).parent().parent().parent().parent().removeClass('open');
                        });

                        $(control).find('.allInput').click(function () {
                            if($(this).is(":checked")){
                                $(this).parent().parent().parent().next().next().find('input[name= "proinput"]').each(function (index,items) {
                                    $(items).parent().addClass("checked");
                                });
                            }else{
                                $(this).parent().parent().parent().next().next().find('input[name= "proinput"]').each(function (index,items) {
                                    $(items).parent().removeClass("checked");
                                });
                            }
                        });

                        $(control).find('.btn-pro-clear').click(function (e) {
                            $(this).parent().prev().prev().find('span[class= "checked"]').each(function (index,items) {
                                $(items).removeClass("checked");
                            });
                            $(this).parent().parent().parent().parent().find('input[name= "showInput"]').val("");
                            $(this).parent().parent().prev().prev().find('input').parent().removeClass("checked");
                        })

                        $(control).find('input[name= "proinput"]').click(function () {
                            if($(this).parent().parent().parent().parent().find('span[class = "checked"]').length==result.length){
                                $(this).parent().parent().parent().parent().parent().prev().prev().find('input').parent().addClass("checked");
                            }else{
                                $(this).parent().parent().parent().parent().parent().prev().prev().find('input').parent().removeClass("checked");
                            }
                        });

                        if (operation && $.isFunction(operation)) {
                            operation();
                        }
                    } else {
                        warning.alertMsg(json.msg);
                    }
                }
            }, false);
        }
    return Selector;
});