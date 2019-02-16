define(['jquery', 'helper'], function ($, helper) {
    $(document).ready(function () {
        var PermissionItems = $("*[data-rescode]");
        if (PermissionItems.length > 0) {
            var PermissionCodes = [];
            $.each(PermissionItems, function (i, item) {
                PermissionCodes.push($(item).attr('data-rescode'));
            });

            var data = {};
            data.Token = helper.GetToken();
            data.ResourceCode = PermissionCodes;

            helper.Ajax("00000030015", data, function (result) {
                if (result.publicresponse.statuscode == 0) {
                    for (var i = 0; i < result.body.length; i++) {
                        if (result.body[i].IsRegister == "true" && result.body[i].HasPermission == "false") {
                            $.each(PermissionItems, function (k, item) {
                                if ($(item).attr('data-rescode') == result.body[i].Code) {
                                    $(item).remove();
                                }
                            });
                        }
                    }
                }
            }, true);
        }
    });
});