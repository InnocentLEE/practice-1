/**
 * Created by zh.huang on 2017/2/20. 级联城市选择控件
 */

define(['jquery', 'helper', 'tipdialog'], function($, helper, warning) {

    var Selector = {};

    ///正式请求方法
    Selector.setXiaQu = function(servercode, data, control, operation, textfield, valuefield, selectvalue) {
        helper.Ajax(servercode, data, function(json) {
            if (json.publicresponse.statuscode == '0') {
                var result = json.body;
                valuefield = valuefield || textfield;
                if (result.length > 0) {
                    var optionStr = '<option value="">请选择</option>';
                    $(result).each(function(i, item) {
                        if (selectvalue != undefined && selectvalue == item[valuefield]) {
                            optionStr += '<option value="' + item[valuefield] + '" selected="selected">' + item[textfield] + '</option>';
                        } else {
                            optionStr += '<option value="' + item.Key + '">' + item.Key + '</option>';
                        }
                    });
                    $(control).empty().append(optionStr);
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