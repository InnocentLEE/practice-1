"use strict";

define(['jquery','metronic','layout'],function ($, Metronic, Layout) {
    jQuery(document).ready(function () {
        Metronic.init();

        initListPage();

        function _calculateFixedSidebarViewportHeight() {
            var sidebarHeight = Metronic.getViewPort().height - $('.page-header').outerHeight();
            sidebarHeight = sidebarHeight - $('.page-footer').outerHeight();
            return sidebarHeight;
        }

        function initListPage() {

            //高级搜索
            if ($('.searchpanel-form').find('.searchpanel-extend').length == 0) {
                $('.search-more').remove();
            }
            $('.search-more span').click(function () {
                $('.searchpanel-extend-border').slideToggle();
                $('.searchpanel-extend').slideToggle(function () {
                    if ($(this).is(':hidden')) {
                        $('.search-more span').empty().append('更多 <i class="fa fa-angle-down"></i>')
                    } else {
                        $('.search-more span').empty().append('收起 <i class="fa fa-angle-up"></i>')
                    }
                });
            });
        }
    });

    //高级搜索
    function seniorSearch(id) {
        if (id && id[0] != '#') {
            id = '#' + id;
        }
        var $c = $( id || '.searchpanel-form');
        $c.each(function () {
            $('.searchpanel-extend', $(this)).hide();
            $(this).off('click.razorui').on('click.razorui.class-api', '.searchpanel-check', function (e) {
                //e.preventDefault();
                if ($(this)[0].checked) {
                    $('.searchpanel-extend').slideDown();
                } else {
                    $('.searchpanel-extend').slideUp();
                }
            });
        });
        return $c;
    }

    //弹出成功
    function metronicSuccessAlert(msg) {
        Metronic.alert({
            type: 'info', //  http://v3.bootcss.com/components/#alerts  success info warning danger
            icon: 'info',
            message: msg || "保存成功",
            closeInSeconds: 10,
            // container: $('.page-message-wrapper'),
            place: 'prepend'
        });
        $('.portlet-body').animate({ scrollTop: '0px' }, 800);
    }

    //弹出失败
    function metronicFailedAlert(msg) {
        Metronic.alert({
            type: 'warning',
            icon: 'warning',
            closeInSeconds: 10,
            message: msg,
            //container: $('.page-message-wrapper'),
            place: 'prepend'
        });
        $('.portlet-body').animate({ scrollTop: '0px' }, 800)
    }

    //访问弹窗
    function ajaxPortlet(html) {
        var portlet = $($('#portlettemplate').html());
        $(".portlet-body", portlet).append(html);
        $(".portlet-body", portlet).append('<div>&nbsp;</div>');
        portlet.appendTo('body');
        fullscreen(portlet);
    }

    //自定义弹窗满屏
    function fullscreen(portlet) {
        if (portlet.hasClass('portlet-fullscreen')) {
            portlet.removeClass('portlet-fullscreen');
            $('body').removeClass('page-portlet-fullscreen');
            portlet.children('.portlet-body').css('height', 'auto');
        } else {
            var height = Metronic.getViewPort().height -
                portlet.children('.portlet-title').outerHeight() -
                parseInt(portlet.children('.portlet-body').css('padding-top')) -
                parseInt(portlet.children('.portlet-body').css('padding-bottom'));
            portlet.addClass('portlet-fullscreen');
            $('body').addClass('page-portlet-fullscreen');
            portlet.children('.portlet-body').css('height', height - 10);
            $('.remove', portlet).on('click', function () {
                $(window).off('.portlet');
            })
            $(window).on('resize.portlet', function () {
                var height = Metronic.getViewPort().height -
                    portlet.children('.portlet-title').outerHeight() -
                    parseInt(portlet.children('.portlet-body').css('padding-top')) -
                    parseInt(portlet.children('.portlet-body').css('padding-bottom'));
                portlet.children('.portlet-body').css('height', height - 10);
            });
        }
    }

    //关闭弹窗
    function closePortlet() {
        var portlet = $('.portlet-fullscreen');
        if ($('body').hasClass('page-portlet-fullscreen')) {
            $('body').removeClass('page-portlet-fullscreen');
        }
        portlet.find('.portlet-title .fullscreen').tooltip('destroy');
        portlet.find('.portlet-title > .tools > .reload').tooltip('destroy');
        portlet.find('.portlet-title > .tools > .remove').tooltip('destroy');
        portlet.find('.portlet-title > .tools > .config').tooltip('destroy');
        portlet.find('.portlet-title > .tools > .collapse, .portlet > .portlet-title > .tools > .expand').tooltip('destroy');
        portlet.remove();
    }

    //表单内容高度适应
    function autoFormHeight(id) {
        function setScroll() {
            var boxHeight = $(window).height() - $('.form-actions', id).height() - 40;
            var me = $(".scroller", id).eq(0);
            if (me.length == 1) {
                var h = boxHeight;
                me.parent().css('height', h);
                me.css('height', h);

            } else {
                me = $(".form-body", id);
                me.css('height', boxHeight);
            }
        }
        $(window).on("resize.razorui.scroller.child-api", setScroll);
    }

    //滚动条自适应
    function formAutoHeight(id,callbackFn) {
        var formsectionHeight = 0;
        var parentHeight = $(parent.window).height();
        $('.form-section', id).each(function () {
            formsectionHeight += $(this).height();
        });

        var currWindowHeight = $(window).height();
        currWindowHeight = currWindowHeight > 0 ? currWindowHeight : parentHeight;
        var boxHeight = currWindowHeight - $('.portlet-title').outerHeight(true) - $('.nav-tabs').outerHeight(true) - 65;
        var me = $(".scroller", id).eq(0);
        if (me.length == 1) {
            var h = boxHeight;
            me.parent().css('height', h);
            me.css('height', h);
        } else {
            me = $(".form-body", id);
            me.css('height', boxHeight);
        }
        if (typeof callbackFn == 'function') {
            var hg = $(window).height();
            if (hg <= 0) hg = parentHeight;
            callbackFn(hg);
        }
    }

    //滚动条自适应
    function autoFormScrollHeight(id,callbackFn) {
        formAutoHeight(id,callbackFn);
        //绑定滚动条自适应
        $(window).on("resize.razorui.scroller.child-api", {id:id,callbackFn: callbackFn }, formAutoHeight);
    }

    $(function () {
        seniorSearch();
    });

    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    var RazorUI = {
        SeniorSearch: seniorSearch,
        AlertSuccess: metronicSuccessAlert,
        AlertFailed: metronicFailedAlert,
        Portlet: ajaxPortlet,
        ClosePortlet: closePortlet,
        AutoFormHeight: autoFormHeight,
        AutoFormScrollHeight: autoFormScrollHeight
    };

    return RazorUI;
});
