define(['jquery', 'helper', 'bootstrap', 'bootbox'], function ($, h, bs, bootbox) {
    var warning = {
    };
    var defaults = {
        sureBtnColor: "#01A4A4",
        cancelBtnColor: "#e9edf2",
    }
    //confirm
    warning.confirm = function (message, callbackFn) {
        var box = bootbox.confirm({
            buttons: {
                confirm: {
                    label: '确定',
                    className: 'btn-sure'
                },
                cancel: {
                    label: '取消',
                    className: 'btn-default'
                }
            },
            title: "提示",
            message: message,
            callback: callbackFn,

        });

        //IE8的媒体类型下width会100%	
        if (h.BrowserVersion.browser == "IE" && h.BrowserVersion.version == 8) {
            box.find('.modal-dialog').css({ 'width': '600', 'marginLeft': 'auto', 'marginRight': 'auto' });
        }
        $('.btn-sure').css("background-color", defaults.sureBtnColor);
        $('.btn-default').css("background-color", defaults.cancelBtnColor);
        return box;
    }

    //提示信息
    //msgStr:String
    warning.alertMsg = function (message, callbackFn) {
        var result = bootbox.dialog({
            message: message,
            title: "提示",
            buttons: {
                Cancel: {
                    label: "关闭",
                    className: "gray",
                    callback: callbackFn
                }
            }
        });
        $(".modal-backdrop").css("z-index", "10049");
        return result;
    }

    warning.errorDialog = function (message) {
        return bootbox.dialog({
            message: message,
            title: "提示",
            buttons: {
                Cancel: {
                    label: "关闭",
                    className: "gray"
                }
            }
        });
    }

    return warning;
});



