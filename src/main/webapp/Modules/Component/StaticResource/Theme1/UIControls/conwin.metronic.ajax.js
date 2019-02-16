(function (root, factory) {

    "use strict";
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(require("jquery"));
    } else {
        root.MetronicAjax = factory(root.jQuery);
        $.extend(Metronic, root.MetronicAjax);
    }

}(this, function init($, undefined) {

    "use strict";

    function beforeSend(settings) {
        return function () {
            Metronic.setAssetsPath('/Scripts/assets/');
            Metronic.blockUI({
                boxed: true,
                message: settings.handleText || '处理中...',
                target: settings.target
            });
            if (typeof settings.beforeSend === 'function') {
                settings.beforeSend.call();
            }
        }
    }

    function always(settings) {
        return function () {
            if (typeof settings.always === 'function') {
                settings.always();
            }
            Metronic.unblockUI(settings.target);
        }
    }

    var exports = {};

    exports.ajax = function (option) {
        var settings = {};
        settings = $.extend(settings, option);
        settings.beforeSend = beforeSend(option);

        $.ajax(settings).always(always(settings));
    }

    return exports;
}));