define([
    'jquery','select2','select2cn'
], function ($) {
    'use strict';

    $.fn.searchbox = function (options, params) {
        if (typeof options == "string") {
            return init(this, params);
        }

        options = options || {};

        return this.each(function () {

            var data = $.data(this, "searchbox");

            var newOptions;
            if (data) {
                newOptions = $.extend(data.options, options);
            } else {
                newOptions = $.extend({}, $.fn.searchbox.defaults, options);
                $.data(this, "searchbox", {
                    options: newOptions
                });
            }

           return init(this, newOptions);
        });
    };

    function init(target, option) {
        return $(target).select2(option);
    }

    $.fn.searchbox.methods = {
         
    };


    $.fn.searchbox.defaults = {
        language: "zh-CN", //设置 提示语言
        width: "100%", //设置下拉框的宽度
        placeholder: "请选择",
        value: "",
	tags:true
    };

});
