
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
					var body = result.body;
					$.each(PermissionItems, function (k, item) {
						for (var i = 0; i < body.length; i++) {
							if ($(item).attr('data-rescode') == body[i].Code) {
								if (body[i].IsRegister != "true" || result.body[i].HasPermission == "true") {
									$(item).show();
								}
								break;
							}
						}
					});
				}
			}, true);
		}
	});
});