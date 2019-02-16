﻿define(['/Modules/Config/conwin.main.js'], function () {
    require(['jquery', 'helper', 'tipdialog', 'system', 'toast', 'cokie', 'crypto', 'uniform'], function ($, helper, tipdialog, system, Toastr) {
        //登录中状态
        var loging = false;
        var ValidID = helper.NewGuid();
        var InitPage = function () {
            Init();
            $("#btnLogin").click(function () {
                if (loging) {
                    return false;
                }
                var loginID = $.trim($('#loginID').val());
                var userPwd = $.trim($('#userPwd').val());
                var loginValid = $.trim($('#txtLoginValid').val());
                var remeber = $('#cbRemberPassword')[0].checked;
                if (loginID == "") {
                    alertMsg('请填写用户名');
                    $('#loginID').focus();
                }
                else if (userPwd == "") {
                    alertMsg('请填写密码');
                    $('#userPwd').focus();
                }
                else if (loginValid == "") {
                    alertMsg('请填写验证码');
                    $('#txtLoginValid').focus();
                } else {
                    if ($.trim('userPwd') != "") {
                    }
                    var AccountName = loginID;
                    var data = { "SysId": system.SysId, "AccountName": AccountName, "Password": userPwd, "Code": loginValid };
                    helper.Ajax("00000030001", data, function (result) {
                        if ($.type(result) == "string") {
                            result = helper.StrToJson(result);
                        }
                        if (result.publicresponse.statuscode == 0) {
                            helper.AdaptLogin(result.body, function () {
                                var obj = {};
                                obj.account = loginID;
                                obj.password = userPwd;
                                if (remeber) {
                                    setRememberCookies(obj);
                                } else {
                                    clearRememberCookies();
                                    loginkey = null;
                                }

                                helper.SetToken(result.body);
                                $.cookie('LoginUrl', this.location.href, {
                                    path: "/"
                                });
                                $.cookie('DefaultUrl', this.location.origin, {
                                    path: "/"
                                });
                                setTheamCookie(result.body, this.location.href);
                                helper.UserInfo(function () {
                                    Toastr.success('登录成功');
                                    var returnurl = GetQueryString('ReturnUrl');
                                    if (returnurl) {
                                        window.location.href = returnurl;
                                    }
                                    else {
                                        window.location.href = system.DefaultUrl;
                                    }
                                });
                            });
                        }
                        else {
                            SetValideCode();
                            alertMsg('登录失败，' + result.publicresponse.message);
                        }
                    }, false);
                }
            });
            $("#btnGetCompany").click(function () {
                SelectUnit.Show();
            });
        }
        function Init() {
            $('#cbRemberPassword').uniform();
            if (!!$.cookie('rember')) {
                var d = JSON.parse($.cookie('rember'));
                setRemberMsg(d);
            }
            SetValideCode();
        }
        var GetQueryString = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
        var setRememberCookies = function (d, u) {
            d = JSON.stringify(d);
            $.cookie('rember', d, { expires: 7 });
        }
        var clearRememberCookies = function () {
            $.cookie('rember', '', { expires: -1 });
        }
        var rememberPassword = function () {
            clearRemberMsg();
            if (!!$.cookie('rember')) {
                var d = JSON.parse($.cookie('rember'));
                setRemberMsg(d);
            }
        }
        var setRemberMsg = function (d) {
            $('#loginID').val(d.account);
            $('#userPwd').val(d.password);
            $.uniform.update($("#cbRemberPassword").attr("checked", true));
        }
        var clearRemberMsg = function () {
            $('#loginID').val('');
            $('#userPwd').val('');
            $('#cbRemberPassword')[0].checked = false;
        }
        //信息提示窗
        var alertMsg = function (msg) {
            tipdialog.errorDialog(msg);
        }
        $("body").keyup(function (e) {
            if (e.keyCode == "13") {
                $('#btnLogin').click();
            }
        });
        $('#imgValideCode').click(function () {
            SetValideCode();
        })
        var SetValideCode = function () {
            helper.Ajax("00000030011", ValidID, function (result) {
                if (result.publicresponse.statuscode == 0) {
                    $('#imgValideCode').attr('src', 'data:image/png;base64,' + result.body);
                }
            }, false);
        }

        var setTheamCookie = function (token, strHref) {
            strHref = strHref.toUpperCase();
            if (strHref.indexOf('Index.html'.toUpperCase()) > 0) {
                $.cookie(token + 'Theam', '/Modules/Component/Theme/Theme1/Css/base.css', {
                    path: "/"
                });
            }
            else if (strHref.indexOf('GpsOLogin.html'.toUpperCase()) > 0) {
                $.cookie(token + 'Theam', '/Modules/Component/Theme/Theme2/Css/base.css', {
                    path: "/"
                });
            } else if (strHref.indexOf('GpsTwLogin.html'.toUpperCase()) > 0) {
                $.cookie(token + 'Theam', '/Modules/Component/Theme/Theme3/Css/base.css', {
                    path: "/"
                });
            } else if (strHref.indexOf('GpsThLogin.html'.toUpperCase()) > 0) {
                $.cookie(token + 'Theam', '/Modules/Component/Theme/Theme4/Css/base.css', {
                    path: "/"
                });
            } else if (strHref.indexOf('GpsFLogin.html'.toUpperCase()) > 0) {
                $.cookie(token + 'Theam', '/Modules/Component/Theme/Theme5/Css/base.css', {
                    path: "/"
                });
            }
        };

        InitPage();
    })
})
