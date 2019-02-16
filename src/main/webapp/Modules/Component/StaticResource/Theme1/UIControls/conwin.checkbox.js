/***
 * 多选控件
 */
define(['jquery','helper'], function ($,helper) {
    var checkBox = {};

    var defaults = {
        size: 6,
        require: false,
        labelId: 'checkbox',
        titleName: '多选框',
        message: ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6']
    };
    ///初始化
    var defaultsOptions;
    checkBox.initial = function (options, callback) {
        defaultsOptions = $.extend({}, defaults, options);
        ///生成checkbox
        ///getCheckBoxBySize(defaultsOptions);
        $('.required').filter(':checkbox').each(function (i, item) {
            $(item).focus(function () {
                ///if (helper.BrowserVersion.browser == "IE" && helper.BrowserVersion.version == 8) {}
                    $(item).parent('div').removeClass('data-box-red');
                    $(item).parent('div').css('float', '');
                 /*else {
                    $(item).parent('span').parent('div').parent('div').removeClass('data-box-red');
                    $(item).parent('span').parent('div').parent('div').css('float', '');
                }*/
            });
            $(item).blur(function () {
                var ra = $(':checkbox:checked');
                var len = ra.length;
                if (len == 0) {
                    /// if (helper.BrowserVersion.browser == "IE" && helper.BrowserVersion.version == 8) {}
                    $(item).parent('div').addClass('data-box-red');
                    $(item).parent('div').css({'float': 'left', 'padding': '3px 12px 3px 8px'});
                    /*else {
                     $(item).parent('span').parent('div').parent('div').addClass('data-box-red');
                     $(item).parent('span').parent('div').parent('div').css({'float':'left','padding':'3px 12px 3px 8px'});
                     }*/
                } else {
                    ///if (helper.BrowserVersion.browser == "IE" && helper.BrowserVersion.version == 8) { }
                        $(item).parent('div').removeClass('data-box-red');
                        $(item).parent('div').css('float', '');
                   /* else {
                        $(item).parent('span').parent('div').parent('div').removeClass('data-box-red');
                        $(item).parent('span').parent('div').parent('div').css('float', '');
                    }*/
                }
            });
        });
    }

    function getCheckBoxBySize(options) {
        var html = '<label class="control-label col-xs-4 col-sm-2"  for="' + options.labelId + '">';
        if (options.require) {
            html += '<span class="required" style="color: red;">*</span>';
            html += '&nbsp;&nbsp;' + options.titleName + '</label><div class="col-xs-8 col-sm-8 required">';
        } else {
            html += '&nbsp;&nbsp;' + options.titleName + '</label><div class="col-xs-8 col-sm-8">';
        }
        for (var i = 0; i < options.size; i++) {
            html += '<label class="checkbox-inline"> <input type="checkbox"  id="Checkbox' + i + '" value="option' + i + '" >' + options.message[i] + '</label>';
        }
        html += '</div>';
        $('.checkbox-init').append(html);
    }

    return checkBox;
});

