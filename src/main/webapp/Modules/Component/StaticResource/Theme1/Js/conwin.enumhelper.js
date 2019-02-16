define(['jquery', 'helper', 'system', 'tipdialog'], function ($, helper, system, tipdialog) {

    var EnumHelper = {};

    var EnumKey = system.SysId + 'Enum';

    var SetEnum = function () {
        var data = {};
        helper.Ajax("00040900001", data, {
            success: function (result) {
                if ($.type(result) == "string") {
                    result = helper.StrToJson(result);
                }
                if (result.publicresponse.statuscode === 0) {
                    window.localStorage[EnumKey] = {};
                    if (!!result.body) {
                        var Enum = { Version: system.EnumVersion, EnumList: result.body };
                        window.localStorage[EnumKey] = JSON.stringify(Enum);
                    }
                }
                else {
                    tipdialog.errorDialog('加载数据失败，错误码：' + result.publicresponse.statuscode);
                }
            },
            async: false
        }, false);
    };

    var GetEnumList = function () {
        var Storage = window.localStorage;
        var Enum = {};
        if (!Storage) {
            alert('浏览器版本不支持，请升级浏览器版本至IE8或以上版本');
        }
        else {
            if (!!Storage[EnumKey]) {
                Enum = JSON.parse(Storage[EnumKey]);
                if (Enum.Version != system.EnumVersion) {
                    SetEnum();
                }
                else {
                    return Enum.EnumList;
                }
            }
            else {
                SetEnum();
            }
            Storage = window.localStorage;
            Enum = JSON.parse(Storage[EnumKey]);
            return Enum.EnumList;
        }
        return null;
    };

    /**
    * 获取枚举
    * EnumName: 枚举类名
    */
    EnumHelper.GetEnum = function (EnumName) {
        var EnumList = GetEnumList();
        if (!!EnumList) {
            return EnumList[EnumName] || null;
        }
        return null;
    };

    /**
    * 获取枚举项
    * EnumName: 枚举类名
    * ItemValue: 枚举值
    */
    EnumHelper.GetEnumItemByValue = function (EnumName, ItemValue) {
        var EnumItems = EnumHelper.GetEnum(EnumName);
        var EnumItem = {};
        if (!!EnumItems) {
            $.each(EnumItems, function (i, item) {
                if (item.Value == ItemValue.toString()) {
                    EnumItem = item;
                    return true;
                }
            })
        }
        return EnumItem;
    };

    /**
    * 获取枚举项
    * EnumName: 枚举类名
    * ItemCode: 枚举编码
    */
    EnumHelper.GetEnumItemByCode = function (EnumName, ItemCode) {
        var EnumItems = EnumHelper.GetEnum(EnumName);
        var EnumItem = {};
        if (!!EnumItems) {
            $.each(EnumItems, function (i, item) {
                if (item.Code == ItemCode) {
                    EnumItem = item;
                    return true;
                }
            })
        }
        return EnumItem;
    };

    /**
    * 获取枚举项
    * EnumName: 枚举类名
    * ItemDescription: 枚举描述
    */
    EnumHelper.GetEnumItemByDescription = function (EnumName, ItemDescription) {
        var EnumItems = EnumHelper.GetEnum(EnumName);
        var EnumItem = {};
        if (!!EnumItems) {
            $.each(EnumItems, function (i, item) {
                if (item.Description == ItemDescription) {
                    EnumItem = item;
                    return true;
                }
            })
        }
        return EnumItem;
    };

    /**
    * 获取枚举描述
    * EnumName: 枚举类名
    * ItemValue: 枚举值
    */
    EnumHelper.GetEnumDescriptionByValue = function (EnumName, ItemValue) {
        if (!ItemValue && ItemValue !== 0) {
            return "";
        }

        var EnumItem = EnumHelper.GetEnumItemByValue(EnumName, ItemValue);
        var EnumDescription = "";
        if (!!EnumItem) {
            EnumDescription = FormatReturnValue(EnumItem.Description);
        }
        return EnumDescription;
    };

    /**
    * 获取枚举描述
    * EnumName: 枚举类名
    * ItemCode: 枚举编码
    */
    EnumHelper.GetEnumDescriptionByCode = function (EnumName, ItemCode) {
        if (!ItemCode) {
            return "";
        }

        var EnumItem = EnumHelper.GetEnumItemByCode(EnumName, ItemCode);
        var EnumDescription = "";
        if (!!EnumItem) {
            EnumDescription = FormatReturnValue(EnumItem.Description);
        }
        return EnumDescription;
    };

    /**
    * 获取枚举值
    * EnumName: 枚举类名
    * ItemCode: 枚举编码
    */
    EnumHelper.GetEnumValueByCode = function (EnumName, ItemCode) {
        if (!ItemCode) {
            return "";
        }

        var EnumItem = EnumHelper.GetEnumItemByCode(EnumName, ItemCode);
        var EnumValue = "";
        if (!!EnumItem) {
            EnumValue = FormatReturnValue(EnumItem.Value);
        }
        return EnumValue;
    };

    /**
    * 获取枚举值
    * EnumName: 枚举类名
    * ItemValue: 枚举值
    */
    EnumHelper.GetEnumCodeByValue = function (EnumName, ItemValue) {
        if (!ItemValue && ItemValue !== 0) {
            return "";
        }

        var EnumItem = EnumHelper.GetEnumItemByValue(EnumName, ItemValue);
        var EnumName = "";
        if (!!EnumItem) {
            EnumName = FormatReturnValue(EnumItem.Code);
        }
        return EnumName;
    };

    /**
    * 设置下拉框选项（枚举描述和枚举值）
    * ControlID: 设置下拉框选项的控件ID
    * EnumName: 枚举类名
    * SelectValue: 默认选中值
    * OptionText：额外项文本
    * OptionValue： 额外项值
    */
    EnumHelper.SetDropDownListByDescriptionAndValue = function (ControlID, EnumName, SelectValue, OptionText, OptionValue) {
        var EnumItems = EnumHelper.GetEnum(EnumName);
        if (!!EnumItems) {
            var options = GetDefaultOption(SelectValue, OptionText, OptionValue);

            $.each(EnumItems, function (i, item) {
                if (item.Value === SelectValue) {
                    options = options + '<option selected="selected" value="' + item.Value + '">' + item.Description + '</option>';
                }
                else {
                    options += '<option value="' + item.Value + '">' + item.Description + '</option>'
                }
            })

            $('#' + ControlID).html('');
            $('#' + ControlID).append(options);
        }
    }

    /**
    * 设置下拉框选项（枚举编码和枚举值）
    * ControlID: 设置下拉框选项的控件ID
    * EnumName: 枚举类名
    * SelectValue: 默认选中值
    * OptionText：默认项文本
    * OptionValue： 默认项值
    */
    EnumHelper.SetDropDownListByCodeAndValue = function (ControlID, EnumName, SelectValue, OptionText, OptionValue) {
        var EnumItems = EnumHelper.GetEnum(EnumName);
        if (!!EnumItems) {
            var options = GetDefaultOption(SelectValue, OptionText, OptionValue);

            $.each(EnumItems, function (i, item) {
                if (item.Value === SelectValue) {
                    options = options + '<option selected="selected" value="' + item.Value + '">' + item.Code + '</option>';
                }
                else {
                    options += '<option value="' + item.Value + '">' + item.Code + '</option>'
                }
            })

            $('#' + ControlID).html('');
            $('#' + ControlID).append(options);
        }
    }

    var GetDefaultOption = function (SelectValue, OptionText, OptionValue) {
        var options = "";
        if (OptionText != undefined && OptionText != null) {
            if (SelectValue === OptionValue) {
                options = options + '<option selected="selected" value="' + OptionValue + '">' + OptionText + '</option>';
            }
            else {
                options += '<option value="' + OptionValue + '">' + OptionText + '</option>'
            }
        }
        return options;
    }

    var FormatReturnValue = function (value) {
        return !value ? "" : value;
    }

    return EnumHelper;
});