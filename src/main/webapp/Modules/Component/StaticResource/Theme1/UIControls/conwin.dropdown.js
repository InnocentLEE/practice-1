/***
 * 多选控件
 */
define(['jquery', 'bootstrap'], function ($) {
    var dropdown = {};

    var defaults = {
        require: true, ///是否必填项
        selectId: 'drop', ///下拉框id
        titleName: '下拉框',
        option: ['请选择', '全部', '选项1', '选项2', '选项3', '选项4', '选项5', '选项6'] ///内容
    };
    ///初始化
    var defaultsOptions;
    dropdown.initial = function (options, callback) {
        defaultsOptions = $.extend({}, defaults, options);
        ///生成下拉框
        ///getDropDownBySize(defaultsOptions);

        $('.required').filter('select').each(function (i, item) {
            $(item).focus(function () {
                $(item).parent('div').removeClass('data-box-red');
            });
            $(item).blur(function () {

                if ($(this).val() == '') {
                    $(item).parent('div').addClass('data-box-red');
                } else {
                    $(item).parent('div').removeClass('data-box-red');
                }
            })

        });

    }

    function getDropDownBySize(options) {
        var html = '<label class="control-label col-xs-4 col-sm-2" for="' + options.selectId + '">';
        if (options.require) {
            html += '<span class="required" style="color: red;">*</span>';
            html += '&nbsp;&nbsp;' + options.titleName + '</label><div class="col-xs-8 col-sm-10"> <div class="input-icon right"> <i class="fa"></i> <select id="' + options.selectId + '" name="' + options.selectId + '" class="form-control required">';
        } else {
            html += '&nbsp;&nbsp;' + options.titleName + '</label><div class="col-xs-8 col-sm-10"> <div class="input-icon right"> <i class="fa"></i> <select id="' + options.selectId + '" name="' + options.selectId + '" class="form-control">';
        }
        for (var i = 0; i < options.option.length; i++) {
            if (options.option[i] == "请选择") {
                html += '<option value="">' + options.option[i] + '</option>';
            } else if (options.option[i] == "全部") {
                html += '<option value="' + options.option + '">' + options.option[i] + '</option>';
            } else {
                html += '<option value="' + options.option[i] + '">' + options.option[i] + '</option>';

            }

        }
        $('.dropdown-init').append(html);
    }

    return dropdown;
});

