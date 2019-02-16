; (function ($, window, document, undefined) {
    $.fn.extend({
        cascade: function (options) {
            $.conwin.cascade(this, $.extend($.conwin.cascade.defaults, options));
        },
        firecascade: function (callbackfn) {
            if (typeof callbackfn == 'function') {
                $.conwin.firecallback = callbackfn;
            }
            this.change();
            return true
        }
    });

    $.conwin = {};
    $.conwin.firecallback = undefined;
    $.conwin.cascade = function ($this, options, ischange, callbackfn) {
        $.ajax({
            url: encodeURI(options.url),
            type: 'Get',
            dataType: 'JSON',
            success: function (jsonArray) {
                var optionStr = '<option value="">请选择</option>';
                $(jsonArray).each(function (i, item) {
                    optionStr += '<option value="' + item[options.valuefield] + '">' + item[options.textfield] + '</option>';
                });
                //dom绑定
                $this.empty().append(optionStr);
                //级联子对象
                if (options.childrens.length > 0) {
                    $this.on('change', function () {
                        var newValue = $this.val();
                        $(options.childrens).each(function (index, item) {
                            var tempUrl = item.url + newValue, $thisTemp = $("#" + item.targetname);
                            $.conwin.cascade($thisTemp, $.extend({
                                url: '',
                                textfield: 'Key',
                                valuefield: 'Value',
                                childrens: []
                            }, item, { url: tempUrl }), true);
                        });
                    });
                }
                //change触发
                if (ischange && typeof $.conwin.firecallback == 'function') {
                    $.conwin.firecallback();
                    $.conwin.firecallback = undefined;
                }
                //
                if (typeof options.callbackfn == 'function') {
                    options.callbackfn();
                }
                return true;
            }
        });
    };
    $.conwin.cascade.defaults = {
        url: '',
        targetname: '',
        textfield: 'Key',
        valuefield: 'Value',
        callbackfn: undefined,
        childrens: []
    };
})(jQuery, window, document);