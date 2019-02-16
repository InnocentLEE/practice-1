define(['jquery', 'helper'], function ($, helper) {

    'use strict';

    var textBox = {};
    ///进行正则校验
    textBox.Check = function (item) {
        var regxString = $(item).data("cwvalid").regx;
        if (regxString != undefined) {
            var regx = new RegExp(regxString);
            if (regx.test($.trim($(item).val()))) {
                return true;
            } else {
                //未通过文本框变红
                addBoxBorder(this);
            }
        } else if ($.trim($(item).val()).length > 0) {
            return true;
        }
        return false;
    };

    ///初始化
    textBox.initial = function () {
        $("input[data-cwvalid]").each(function (i, item) {///获取所有的input控件.
            var dataAttr = $(item).data("cwvalid");
            if (dataAttr.blur === true) {
                $(item).blur(function () {
                    var dtBlur = $(item).data("cwvalid");
                    if (!textBox.Check(this) || (dtBlur.required === true && $(this).val() == '')) {
                        addBoxBorder(this);
                        removeTip();
                    }
                });
                $(item).focus(function () {
                    var dtFocus = $(item).data("cwvalid");
                    removeTip();
                    removeBoxBorder(this);
                    if (!textBox.Check(this) || $(this).val() == '') {
                        if ($('#tip').length == 0 && dtFocus.tip != undefined) {
                            CreateMouseFloater($(this).parent(), 'tip', dtFocus.tip);
                            generateTips(this, dtFocus);
                        }
                    }
                });
                if (helper.BrowserVersion.browser == "IE" && helper.BrowserVersion.version == 8 || helper.BrowserVersion.version == 9) {
                    $('input[placeholder], textarea[placeholder]').each(function (i, item) {
                        $(item).attr('placeholder', ''); $(item).val('');
                    });
                } else {
                    $(item).bind('input propertychange', function () {
                        var dtBind = $(item).data("cwvalid");
                        if (!textBox.Check(this)) {
                            addBoxBorder(this);
                            if ($('#tip').length == 0 && dtBind.tip != undefined) {
                                CreateMouseFloater($(this).parent(), 'tip', dtBind.tip);
                                generateTips(this);
                            }
                        } else {
                            removeBoxBorder(this);
                            removeTip();
                        }
                    });
                }
            }
        });
        $('input[readonly]').each(function (i, item) {
            $(item).attr('style', 'border:none;background:transparent!important');
        })
    }

    ///创建鼠标跟随提示
    function CreateMouseFloater(parent, id, message) {
        var htmlString = '';
        htmlString += '<div id="' + id + '" style="position: relative;display: inline-block;opacity: 1;padding: 5px 0;"> <div style="bottom: 0;left: 50%;margin-left: -5px; border-width: 5px 5px 0;border-top-color: #fdd3d3;position: absolute;width: 0;height: 0;border-bottom-color: transparent;border-right-color: transparent;border-left-color: transparent;border-style: solid;" ></div> <div style=" max-width: 400px;padding: 5px 10px;color: #333333;text-align: center;background-color:#fdd3d3;">' + message + '</div></div>'
        $(parent).append(htmlString);
    }

    ///生成显示位置
    function generateTips(_this) {
        var top = $(_this).position().top + 70;
        var left = $(_this).position().left + 1;
        $('#tip').css({
            'bottom': top + 'px',
            'left': left + 'px'
        });
    }

    ///添加文本边框颜色
    function addBoxBorder(_this) {
        if (!$(_this).hasClass('data-box-red')) {
            $(_this).addClass('data-box-red');
        }
    }

    ///移除文本框顔色
    function removeBoxBorder(_this) {
        if ($(_this).hasClass('data-box-red')) {
            $(_this).removeClass('data-box-red');
        }
    }

    ///移除提示信息
    function removeTip() {
        if ($('#tip').length > 0) {
            $('#tip').remove();
        }
    }
    return textBox;
});

