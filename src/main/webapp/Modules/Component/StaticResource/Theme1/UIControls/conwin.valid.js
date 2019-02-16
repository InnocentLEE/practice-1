//在表单中给文本框加上验证特性
define(['jquery'], function ($) {

    var valid = {}

    valid.CheckSubmit = function () {
        var checkItems = $('.required').not('span');
        var message = '';
        $('.required').not('span').each(function (i, item) {
            if ($.trim($(item).val()) == '') {
                message += GetControlLabel(item).replace('*', '') + GetControlDescription(item) + '<br />';
            }
        });
        return message;
    }

    var GetControlLabel = function (control) {
        return $('label[for=' + control.id + ']').text();
    }

    var GetControlDescription = function (control) {
        var description = '是必填项';
        if (!(control instanceof jQuery)) {
            control = $(control);
        }
        var elementType = control.prop('nodeName');

        switch (elementType) {
            case 'INPUT':
                inputType = $(control).attr('type');
                description = GetInputDescription(inputType);
                break;

            case 'SELECT': description = '是必选项'; break;

            case 'TEXTAREA': description = '是必填项'; break;

            default: break;
        }
        return description;
    }

    var GetInputDescription = function (inputType) {
        var description = '';
        switch (inputType) {
            case 'checkbox': description = '是必选项'; break;

            case 'radio': description = '是必选项'; break;

            case 'hidden': description = '是必填项'; break;

            case 'number': description = '是必填项'; break;

            case 'password': description = '是必填项'; break;

            case 'text': description = '是必填项'; break;

            default: break;
        }
        return description;
    }

    return valid;
})