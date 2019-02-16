define(['jquery'], function ($) {
    var textArea = {};

    ///初始化
    textArea.initial = function () {
        $("textarea[data-cwvalid]").each(function (i, item) {///获取所有的input控件.
            $(item).blur(function () {
                var dtBlur = $(item).data("cwvalid");
                if ($(this).val() == '') {
                    addBoxBorder(this);
                }
                if (dtBlur.minlength != null && dtBlur.minTip != null && $(this).val().length < dtBlur.minlength) {
                    addBoxBorder(this);
                    CreateMouseFloater($(this).parent(), 'tip', dtBlur.minTip);
                    generateTips(this);
                }
                if (dtBlur.maxlength != null && dtBlur.maxTip != null && $(this).val().length > dtBlur.maxlength) {
                    addBoxBorder(this);
                    CreateMouseFloater($(this).parent(), 'tip', dtBlur.maxTip);
                    generateTips(this);
                }

            });
            $(item).focus(function () {
                removeTip();
                removeBoxBorder(this);
            });

        });
        $('textarea[readonly]').each(function (i, item) {
            $(item).attr('style', 'border:none;background:transparent!important');
        })

    }

    ///创建鼠标跟随提示
    function CreateMouseFloater(parent, id, message) {
        var htmlString = '';
        htmlString += '<div id="' + id + '" style="position: relative;display: inline-block;opacity: 1;padding: 5px 0;"> <div style="bottom: 0;left: 50%;margin-left: -5px; border-width: 5px 5px 0;border-top-color: #fdd3d3;position: absolute;width: 0;height: 0;border-bottom-color: transparent;border-right-color: transparent;border-left-color: transparent;border-style: solid;" ></div> <div style=" max-width: 400px;padding: 5px 10px;color: #333333;text-align: center;background-color: #fdd3d3;">' + message + '</div></div>'
        $(parent).append(htmlString);
    }

    ///生成显示位置
    function generateTips(_this) {
        var top = $(_this).position().top +100;
        var left = $(_this).position().left -10;
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

    return textArea;
});

