define(['jquery', 'bootstrap-toastr'], function ($, toastr) {
    var jtoast = {};
    var defaults = {
        closeButton: false,
        positionClass: "toast-bottom-right",
        showDuration: 500,
        hideDuration: 800,
        timeOut: 1200,
        extendedTimeOut: 0,
        containerId: '',

        iconClasses: {
            success: 'toast-success'
        },
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
        toastType: 1 //默认是蓝底右下角提示框
    };

    jtoast.success = function (message, option) {
        if ($("#toast-container").length == 0) {
            showToastr('success', '', message, false, option);
        }
    }

    jtoast.message = function (message, callback, option) {
        if ($("#toast-container").length == 0) {
            showToastr('success', '', message, false, option);
            if (typeof callback == 'function') {
                var newoption = $.extend({}, defaults, option);
                window.setTimeout(callback, newoption.timeOut);
            }
        }
    }

    ///当前只提供成功提示的方法。
   /* jtoast.info = function (title, message, isIframe, option) {
        showToastr('info', title, message, isIframe, option);
    }

    jtoast.warning = function (title, message, isIframe, option) {
        showToastr('warning', title, message, isIframe, option);
    }

    jtoast.error = function (title, message, isIframe, option) {
        showToastr('error', title, message, isIframe, option);
    }*/

    function showToastr(type, title, message, isIframe, option) {
        if (option == undefined) {
            option = new Object();
            option.onShown = '';
            option.onHidden = '';
        }
        if (option.toastType == 2) {
            option.positionClass = "toast-top-center";
        } else {
            option.positionClass = "toast-bottom-right";
        }
        option.containerId = "toast-container";
        if (isIframe) {
            window.parent.toastr[type](title, message, false, option);
        }
        else {
            $.extend(true, toastr.options, defaults, option);
            toastr[type](message, title);
            if (toastr.options.toastType == 1) {
                $("#toast-container .toast").css({
                    "width": "300px",
                    "font-size": "24px",
                    "line-height": "100px",
                    "text-align": "center",
                    "background-color": "#269abc",
                });
                $("#toast-container .toast").removeClass('toast-success');
                $(".toast-message").css('margin-right', '30px');
                $(".toast-message").html('<div style="display: inline;"><i class="icon-check" style="font-size:20px;"></i></div>' + message);
                return;
            }
            if (toastr.options.toastType == 2) {
                $("#toast-container").css("opacity", "0.5");
                $("#toast-container .toast").css({
                    "width": "320px",
                    "font-size": "24px",
                    "line-height": "110px",
                    "text-align": "center",
                    "background-color": "#000000",
                    "color": '#fff',
                });
                $('.toast-top-center').css('top', '120px');

                $("#toast-container .toast").removeClass('toast-success');
                $(".toast-message").css('margin-right', '30px');
                $(".toast-message").html('<div style="display: inline;"><i class="icon-check" style="font-size:20px;"></i></div>' + message);
                return;
            }

        }
    }

    return jtoast;
});
