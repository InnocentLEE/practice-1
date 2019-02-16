/// <reference path="../../../Modules/Config/system.js" />
// 'use strict';
// (function (root, factory) {
//     if (typeof define === 'function' && define.amd) {
//         define('jquery', function ($) {
//             return (root.AreasSelect = factory($));
//         });
//     }
//     else {
//         root.AreasSelect = root.AreasSelect || factory($);
//     }
// }(this, function ($) {
//
//     var tools = {};
//
//     //区域选择级联下拉框
//     function AreasSelect(options) {
//         var that = this;
//         that.options = options || {};
//         that.options.textfield = that.options.textfield || 'Key';
//         that.options.valuefield = that.options.valuefield || 'Value';
//         if (!options.id) {
//             throw new Error("AreasSelect: 参数options没有id");
//         }
//
//         var o = that.options;
//         var $c = $(o.id);
//
//         that.state = 1;
//         that.load = function (val, url) {
//             //目前支持逗号隔开的字符串
//             if ($.trim(o.data) != "") {
//                 var arr = options.data.split(/\||、|，|:|,/);
//                 var optionStr = '';//'<option value="">请选择</option>';
//                 $(arr).each(function (i, item) {
//                     var selected = "";
//                     if (item == val) {
//                         selected = "selected";
//                     }
//                     optionStr += '<option value="' + item + '" ' + selected + '>' + item + '</option>';
//                 });
//                 $c.empty().append(optionStr);
//             } else {
//                 var tempurl = url || o.url;
//                 $.ajax({
//                     url: encodeURI(tempurl),
//                     type: 'Get',
//                     dataType: 'JSON',
//                     async: false,
//                     beforeSend: function () {
//                         if (!$c.attr('disabled')) {
//                             that.state = 0;
//                         }
//                         $c.after('<div class="areas-select-loading"></div>');
//                     },
//                     success: function (jsonArray) {
//                         var optionStr = '<option value="">请选择</option>';
//                         $(jsonArray).each(function (i, item) {
//                             var selected = "";
//                             if (item[o.textfield] == val) {
//                                 selected = "selected";
//                             }
//                             optionStr += '<option value="' + item[o.valuefield] + '" ' + selected + '>' + item[o.textfield] + '</option>';
//                         });
//                         $c.empty().append(optionStr);
//                     },
//                     complete: function () {
//                         if (that.state == 0 && !!$c.attr('disabled')) {
//                             that.state = 1;
//                         }
//                         $c.next('.areas-select-loading').remove();
//                     }
//                 });
//             }
//         };
//         that.reload = function (url) {
//             $c.empty();
//             that.load($c.val(), url);
//             that.change();
//         };
//         that.change = o.change || function () {
//         };
//         $c.bind('change', that.change);
//     }
//
//     return { AreasSelect: AreasSelect };
//
// }));
define('jquery',function () {

'use strict';

    var AreasSelect = {};

    //区域选择级联下拉框
    AreasSelect.AreasSelect = function (options) {
        var that = this;
        that.options = options || {};
        that.options.textfield = that.options.textfield || 'Key';
        that.options.valuefield = that.options.valuefield || 'Value';
        if (!options.id) {
            throw new Error("AreasSelect: 参数options没有id");
        }

        var o = that.options;
        var $c = $(o.id);

        that.state = 1;
        that.load = function (val, url) {
            //目前支持逗号隔开的字符串
            if ($.trim(o.data) != "") {
                var arr = options.data.split(/\||、|，|:|,/);
                var optionStr = '';//'<option value="">请选择</option>';
                $(arr).each(function (i, item) {
                    var selected = "";
                    if (item == val) {
                        selected = "selected";
                    }
                    optionStr += '<option value="' + item + '" ' + selected + '>' + item + '</option>';
                });
                $c.empty().append(optionStr);
            } else {
                var tempurl = url || o.url;
                $.ajax({
                    url: encodeURI(tempurl),
                    type: 'Get',
                    dataType: 'JSON',
                    async: false,
                    beforeSend: function () {
                        if (!$c.attr('disabled')) {
                            that.state = 0;
                        }
                        $c.after('<div class="areas-select-loading"></div>');
                    },
                    success: function (jsonArray) {
                        var optionStr = '<option value="">请选择</option>';
                        $(jsonArray).each(function (i, item) {
                            var selected = "";
                            if (item[o.textfield] == val) {
                                selected = "selected";
                            }
                            optionStr += '<option value="' + item[o.valuefield] + '" ' + selected + '>' + item[o.textfield] + '</option>';
                        });
                        $c.empty().append(optionStr);
                    },
                    complete: function () {
                        if (that.state == 0 && !!$c.attr('disabled')) {
                            that.state = 1;
                        }
                        $c.next('.areas-select-loading').remove();
                    }
                });
            }
        };
        that.reload = function (url) {
            $c.empty();
            that.load($c.val(), url);
            that.change();
        };
        that.change = o.change || function () {
            };
        $c.bind('change', that.change);
    }

    return  AreasSelect ;

});