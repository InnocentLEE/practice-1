/***
 * 单选控件
 */
define(['jquery','helper'], function ($,helper) {
    var radioBox = {};

    var defaults = {
        size: "4",
        require: true,
        labelId: 'radio',
        titleName: '单选框',
        name: "radio",
        message: ['选项1', '选项2', '选项3', '选项4']
    };
    ///初始化
    var defaultsOptions;
    radioBox.initial = function (options, callback) {
        defaultsOptions = $.extend({}, defaults, options);
        ///生成radioBox
        /// getRadioBox(defaultsOptions);
        $('.form-horizontal .radio').css('padding-top','2px');
        $('.required').filter(':radio').each(function (i, item) {
            $(item).focus(function () {
               /// if (helper.BrowserVersion.browser == "IE" && helper.BrowserVersion.version == 8) {}
                    $(item).parent('div').removeClass('data-box-red');
                    $(item).parent('div').css('float', '');
               /*  else {
                    $(item).parent('span').parent('div').parent('div').removeClass('data-box-red');
                    $(item).parent('span').parent('div').parent('div').css('float', '');
                }*/
            });
            $(item).blur(function () {
                var ra = $(':radio:checked');
                var len = ra.length;
                if (len == 0) {
                   /// if (helper.BrowserVersion.browser == "IE" && helper.BrowserVersion.version == 8) {}
                        $(item).parent('div').addClass('data-box-red');
                        $(item).parent('div').css({'float':'left','padding':'3px 12px 3px 8px'});
                    /* else {
                        $(item).parent('span').parent('div').parent('div').addClass('data-box-red');
                        $(item).parent('span').parent('div').parent('div').css({'float':'left','padding':'3px 12px 3px 8px'});
                    }*/
                } else {
                    ///if (helper.BrowserVersion.browser == "IE" && helper.BrowserVersion.version == 8) { }
                        $(item).parent('div').removeClass('data-box-red');
                        $(item).parent('div').css('float', '');
                    /*else {
                        $(item).parent('span').parent('div').parent('div').removeClass('data-box-red');
                        $(item).parent('span').parent('div').parent('div').css('float', '');
                    }*/
                }
            })
        });
    }

    ///生成radio
    function getRadioBox(options) {
        var html = '<label class="control-label col-xs-4 col-sm-2"  for="' + options.labelId + '">';
        if (options.require) {
            html += '<span class="required" style="color: red;">*</span>';
            html += '&nbsp;&nbsp;' + options.titleName + '</label><div class="col-xs-8 col-sm-8 required">';
        } else {
            html += '&nbsp;&nbsp;' + options.titleName + '</label><div class="col-xs-8 col-sm-8 ">';
        }
        for (var i = 0; i < options.size; i++) {
            html += '<label class="radio-inline"> <input type="radio"  name="' + options.name + '" id="radio' + i + '" value="option' + i + '" >' + options.message[i] + '</label>';
        }
        html += '</div>';
        $('.radio-init').append(html);

    }

    return radioBox;
});
