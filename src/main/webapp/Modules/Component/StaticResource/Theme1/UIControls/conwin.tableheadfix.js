define(['jquery'], function ($) {

    var TableHeaderFix = {};

    IsFix = false;

    var panel_fill = "<div class='searchpanel-form-fix-fill'></div>";
    var panel_left_fill = "<div class='panel_left_fill_fix' style='position: fixed; z-index: 2'><div>";
    var pageheader = {};
    var searchpanel = {};
    var searchpanel_width = 0;
    var searchpanel_height = 0;

    var searchform = {};
    var searchform_height = 0;

    var filterpanel = {};
    var filterpanel_height = 0

    var tablepanel = {};
    var table_width = 0;

    var theadpanel = {};
    var thead_height = 0;
    var thead_left = 0;

    var thInnerWidths = [];
    var thOuterWidths = [];

    var postop = 0;
    var fixheight = 0;
    var oheight = 0;
    var outwidth = 0;

    var bgcolor = '#000';
    var zindex = '1';
    var leftposition = 0;

    var t = {};
    var fn = {};

    var BrowserVersion = {};

    var SetFix = function () {
        if ($(document).scrollTop() >= postop) {
            if (IsFix == false) {
                IsFix = true;

                bgcolor = GetHexBackgroundColor($('.page-content-wrapper .page-content')) || GetHexBackgroundColor($('body'));

                GetWidth();

                searchpanel.after(panel_fill);
                $('.searchpanel-form-fix-fill').height(searchpanel_height + filterpanel_height + thead_height);

                searchpanel.css('position', 'fixed');
                searchpanel.css('top', fixheight);
                searchpanel.css('width', searchpanel_width + 'px');
                searchpanel.css('height', searchpanel_height + 'px');
                searchpanel.css('background-color', bgcolor);
                searchpanel.css('z-index', zindex + 2);

                filterpanel = $('.dataTables_filter');
                filterpanel.css('position', 'fixed');
                filterpanel.css('top', fixheight + searchpanel_height);
                filterpanel.css('background-color', bgcolor);
                filterpanel.css('width', searchpanel_width + 'px');
                filterpanel.css('z-index', zindex + 1);

                theadpanel.css('position', 'fixed');
                theadpanel.css('top', fixheight + searchpanel_height + filterpanel_height);
                theadpanel.css('background-color', bgcolor);
                theadpanel.css('z-index', zindex);
                theadpanel.css('overflow-x', 'hidden');


                theadpanel.css('left', (thead_left - $('.table-scrollable').scrollLeft()) + 'px');
                theadpanel.css('width', (searchpanel_width + $('.table-scrollable').scrollLeft()) + 'px');

                if (BrowserVersion.browser == 'IE') {
                    var firstth = theadpanel.find('th:first');
                    if (firstth.length > 0) {
                        firstth = firstth[0];
                        theadpanel.css('border-color', firstth.currentStyle.borderRightColor);
                        theadpanel.css('border-style', firstth.currentStyle.borderRightStyle);
                        theadpanel.css('border-width', firstth.currentStyle.borderRightWidth);
                    }
                }
                else {
                    theadpanel.css('border', theadpanel.find('th:first').css('border-right'));
                }

                SetWidth();

                t = setInterval(ResetSearchPanelHeight, 20);
            }
        }
        else {
            if (IsFix == true) {
                IsFix = false;
                clearInterval(t);
                searchpanel.removeAttr("style");
                filterpanel.removeAttr("style");
                theadpanel.removeAttr("style");
                $('.searchpanel-form-fix-fill').remove();
                $('.panel_left_fill_fix').remove();
            }
        }
    };

    var SetTableFix = function () {
        if ($(document).scrollTop() >= postop) {
            if (IsFix == false) {
                IsFix = true;

                bgcolor = GetHexBackgroundColor($('.page-content-wrapper .page-content'));

                GetWidth();

                searchpanel.after(panel_fill);
                $('.searchpanel-form-fix-fill').height(searchpanel_height + filterpanel_height + thead_height);

                filterpanel = $('.dataTables_filter');
                filterpanel.css('position', 'fixed');
                filterpanel.css('top', fixheight + searchpanel_height);
                filterpanel.css('background-color', bgcolor);
                filterpanel.css('width', searchpanel_width + 'px');
                filterpanel.css('z-index', zindex + 1);

                theadpanel.css('position', 'fixed');
                theadpanel.css('top', fixheight + searchpanel_height + filterpanel_height);
                theadpanel.css('background-color', bgcolor);
                theadpanel.css('z-index', zindex);
                theadpanel.css('overflow-x', 'hidden');

                theadpanel.css('left', (thead_left - $('.table-scrollable').scrollLeft()) + 'px');
                theadpanel.css('width', (searchpanel_width + $('.table-scrollable').scrollLeft()) + 'px');

                if (BrowserVersion.browser == 'IE') {
                    var firstth = theadpanel.find('th:first');
                    if (firstth.length > 0) {
                        firstth = firstth[0];
                        theadpanel.css('border-color', firstth.currentStyle.borderRightColor);
                        theadpanel.css('border-style', firstth.currentStyle.borderRightStyle);
                        theadpanel.css('border-width', firstth.currentStyle.borderRightWidth);
                    }
                }
                else {
                    theadpanel.css('border', theadpanel.find('th:first').css('border-right'));
                }

                SetWidth();
            }
        }
        else {
            if (IsFix == true) {
                IsFix = false;
                filterpanel.removeAttr("style");
                theadpanel.removeAttr("style");
                $('.searchpanel-form-fix-fill').remove();
            }
        }
    };

    TableHeaderFix.ResetFix = function () {
        if (IsFix == true) {
            IsFix = false;
            clearInterval(t);
            searchpanel.removeAttr("style");
            filterpanel.removeAttr("style");
            tablepanel.removeAttr("style");
            theadpanel.removeAttr("style");
            $('.searchpanel-form-fix-fill').remove();
            $('.panel_left_fill_fix').remove();

            table_width = tablepanel.width();
            searchpanel_width = searchpanel.width();
            thead_left = searchpanel.position().left;

            var thItems = $('.table thead th');
            $.each(thItems, function (i, item) {
                $(item).removeAttr('style');
            });

            fn();
        }
        else if (tablepanel.length > 0) {
            table_width = tablepanel.width();
            searchpanel_width = searchpanel.width();
            thead_left = searchpanel.position().left;
        }

        BindTableScrollEvent();
    }

    var GetWidth = function () {
        thInnerWidths.splice(0, thInnerWidths.length);
        thOuterWidths.splice(0, thOuterWidths.length);
        table_width = tablepanel.width();
        $('.table thead th').each(function (i, item) {
            thInnerWidths.push($(item).innerWidth());
            thOuterWidths.push($(item).outerWidth());
        });
    }

    var SetWidth = function () {
        var thItems = $('.table thead th');

        if ((table_width + outwidth) > searchpanel_width) {
            $('.table').css("cssText", "width:" + table_width + "px !important;");
            SetLeftFill();
        }

        $.each(thItems, function (i, item) {
            $(item).removeAttr('style');
        });

        $.each(thItems, function (i, item) {
            var InnerWidth = thInnerWidths[i] - $(item).width();
            var PaddingLeft = parseInt(InnerWidth / 2);
            var PaddingRight = InnerWidth - PaddingLeft;
            $(item).css({ 'padding-left': PaddingLeft, "padding-right": PaddingRight });
        });

        var tdItems = $('.table tbody tr').eq(0).find('td');
        $.each(tdItems, function (i, item) {
            if (i < tdItems.length - 1) {
                $(item).css("cssText", "width:" + (thOuterWidths[i] - ($(item).outerWidth(true) - $(item).width())) + "px !important;");
            }
            else {
                $(item).removeAttr("style");
            }
        });
    }

    var GetBrowserVersion = function () {
        var userAgent = navigator.userAgent,
            rMsie = /(msie\s|trident.*rv:)([\w.]+)/,
            rFirefox = /(firefox)\/([\w.]+)/,
            rOpera = /(opera).+version\/([\w.]+)/,
            rChrome = /(chrome)\/([\w.]+)/,
            rSafari = /version\/([\w.]+).*(safari)/;
        var browser;
        var version;

        var ua = userAgent.toLowerCase();
        var match = rMsie.exec(ua);

        if (match != null) {
            return { browser: "IE", version: match[2] || "0" };
        }
        var match = rFirefox.exec(ua);
        if (match != null) {
            return { browser: match[1] || "", version: match[2] || "0" };
        }
        var match = rOpera.exec(ua);
        if (match != null) {
            return { browser: match[1] || "", version: match[2] || "0" };
        }
        var match = rChrome.exec(ua);
        if (match != null) {
            return { browser: match[1] || "", version: match[2] || "0" };
        }
        var match = rSafari.exec(ua);
        if (match != null) {
            return { browser: match[2] || "", version: match[1] || "0" };
        }
        return { browser: "", version: "0" };
    };

    var GetHexBackgroundColor = function (el) {
        var rgb = $(el).css('background-color');
        if (BrowserVersion.browser == 'IE') {
            if (BrowserVersion.version != "8.0") {
                rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                function hex(x) {
                    return ("0" + parseInt(x).toString(16)).slice(-2);
                }
                rgb = "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
            }
        }
        return rgb;
    };

    var ResetSearchPanelHeight = function () {
        var n_searchform_height = $(searchform).outerHeight(true);
        if (n_searchform_height != searchform_height) {
            searchpanel_height = searchpanel_height + (n_searchform_height - searchform_height);
            searchform_height = n_searchform_height;
            $(searchpanel).css('height', searchpanel_height + 'px');
            $(filterpanel).css('top', fixheight + searchpanel_height);
            $(theadpanel).css('top', fixheight + searchpanel_height + filterpanel_height);
            $('.searchpanel-form-fix-fill').css('height', searchpanel_height + thead_height + 'px');
        }
    };

    var BindTableScrollEvent = function () {
        $('.table-scrollable').on('scroll', function () {
            theadpanel.css('left', (thead_left - $(this).scrollLeft()) + 'px');
            theadpanel.css('width', (searchpanel_width + $(this).scrollLeft()) + 'px');
        });
    };

    var SetLeftFill = function () {
        if ($('.panel_left_fill_fix').length == 0) {
            $('body').append(panel_left_fill);
        }

        $('.panel_left_fill_fix').css({ 'left': 0, 'top': 0, 'width': $('.page-content.padding-default').offset().left + 'px', 'height': $(document).height() + 'px', 'background-color': GetHexBackgroundColor($('body')) });

    };

    TableHeaderFix.InitFix = function (OnlyTable) {
        pageheader = $('.page-header');

        searchpanel = $('.searchpanel-fixed');

        filterpanel = $('.dataTables_filter');
        filterpanel_height = filterpanel.length == 0 ? 0 : filterpanel.outerHeight(true) + 5;

        tablepanel = $('.table');
        table_width = $(tablepanel).width();

        theadpanel = $('.table thead');
        thead_height = theadpanel.outerHeight(true);
        thead_left = searchpanel.position().left;

        fixheight = pageheader.height() || 0;

        BrowserVersion = GetBrowserVersion();
        leftposition = -1;

        outwidth = 2;

        searchpanel_width = searchpanel.width();

        if (!!OnlyTable) {
            fn = SetTableFix;
            oheight = filterpanel.length > 0 ? filterpanel.offset().top : theadpanel.offset().top;
            postop = oheight - fixheight;
        }
        else {
            fn = SetFix;

            searchpanel_height = searchpanel.outerHeight(true);

            searchform = $('.searchpanel-form');
            searchform_height = searchform.outerHeight(true);
            oheight = searchpanel.offset().top;
            postop = oheight - fixheight;
        }

        fn();

        $(window).scroll(function () {
            if (typeof fn == 'function') {
                fn();
            }
        });

        BindTableScrollEvent();
    };

    return TableHeaderFix;
});