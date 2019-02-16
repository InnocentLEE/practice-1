(function (root, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function ($) {
            return (root.Toastr = factory($));
        });
    }
    else {
        root.Toastr = root.Toastr || factory(root.jQuery);
    }

}(this, function ($) {
    'use strict';

    var defaults = {
        closeButton: true,
        positionClass: "toast-bottom-right",
        showDuration: 500,
        hideDuration: 800,
        timeOut: 3000,
        extendedTimeOut: 100,
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut"
    };

    return {
        success: function (title, message, isIframe, option) {
            showToastr('success', title, message, isIframe, option);
        },

        info: function (title, message, isIframe, option) {
            showToastr('info', title, message, isIframe, option);
        },

        warning: function (title, message, isIframe, option) {
            showToastr('warning', title, message, isIframe, option);
        },

        error: function (title, message, isIframe, option) {
            showToastr('error', title, message, isIframe, option);
        }
    };

    function showToastr(type, title, message, isIframe, option) {
        if (isIframe) {
            window.parent.Toastr[type](title, message, false, option);
        }
        else {
            $.extend(true, toastr.options, defaults, option);
            toastr[type](message, title);
            $(toastr.getContainer()).css({
                'font-size': '18px',
                'line-height': '45px'
            });
        }
    }
}));