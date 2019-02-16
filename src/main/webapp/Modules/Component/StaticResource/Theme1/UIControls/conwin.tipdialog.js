define(['jquery','helper', 'bootstrap','bootbox' ], function ($,h, bs,bootbox) {
    var warning = {};
    var defaults = {
        sureBtnColor: "#5cb85c",
        cancelBtnColor: "#ececec",
    }

    //confirm
    warning.confirm = function (message, callbackFn) {
        var box = bootbox.confirm({
            message: message,
            title: "提示",
            buttons: {
                confirm: {
                    label: "确定",
                    className: "sure",
                    callback: callbackFn
                },
                cancel: {
                    label: "取消",
                    className: "btn-default"
                }
            },
            callback: callbackFn
        });
        $('.bootbox-close-button').html('');
        $('.bootbox-close-button').attr('style', "width:15px;height:15px;opacity:1");
//$('.modal-dialog')
      //IE8的媒体类型下width会100%	
        if (h.BrowserVersion.browser == "IE" && h.BrowserVersion.version == 8) {
            box.find('.modal-dialog').css({ 'width': '600', 'marginLeft': 'auto', 'marginRight': 'auto' });
        }
        $('.sure').css({"background-color":defaults.sureBtnColor,"color":"#ffffff"});
        $('.btn-default').css({ "background-color": defaults.cancelBtnColor, "color": "#999999", "border": "1px solid #d7d7d7" });
        return box;
    }

    //提示信息
    //msgStr:String
    warning.alertMsg = function (message, callbackFn) {
        var alertMsg = bootbox.dialog({
            message:message,
            title: "提示",
            buttons: {
                Cancel: {
                    label: "关闭",
                    className: "cancel",
                    callback: callbackFn
                }
            }
        });
        //IE8的媒体类型下width会100%	
        if (h.BrowserVersion.browser == "IE" && h.BrowserVersion.version == 8) {
            alertMsg.find('.modal-dialog').css({ 'width': '600', 'marginLeft': 'auto', 'marginRight': 'auto' });
        }
        $('.bootbox-close-button').html('');
        $('.bootbox-close-button').attr('style', "width:15px;height:15px;opacity:1");
        $('.cancel').css({"background-color":defaults.sureBtnColor,"color":"#ffffff"});
        $(".modal-backdrop").css("z-index", "10049");
        return alertMsg;
    }

    warning.errorDialog =function (message) {
        var errorDialog = bootbox.dialog({
            message: message,
            title: "提示",
            buttons: {
                Cancel: {
                    label: "关闭",
                    className: "cancel"
                }
            }
        });
       //IE8的媒体类型下width会100%	
        if (h.BrowserVersion.browser == "IE" && h.BrowserVersion.version == 8) {
            errorDialog.find('.modal-dialog').css({ 'width': '600', 'marginLeft': 'auto', 'marginRight': 'auto' });
        }
        $('.bootbox-close-button').html('');
        $('.bootbox-close-button').attr('style', "width:15px;height:15px;opacity:1");
        $('.cancel').css({"background-color":defaults.sureBtnColor,"color":"#ffffff"});

        return errorDialog;
    }

    return warning;
});



