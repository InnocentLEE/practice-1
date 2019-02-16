define(['jquery', 'metronic', 'tipdialog', "bootstrap-modal", "bootstrap-modalmanager"], function ($, Metronic, warning) {

    'use strict';
    var $modal = [],
        $iframe, $styleSheet, popdialog = {};

    popdialog.getModals = function () {
        return $.extend([], $modal);
    },

        popdialog.setModals = function (modals) {
            $.each($modal, function (index, item) {
                if (modals.indexOf(item) <= -1) {
                    item.remove();
                }
            });
            $modal = modals;
        },

        popdialog.showModal = function (option) {
            Metronic.blockUI({ animate: true });
            $.fn.modal.defaults.url = option.url;
            $modal[$modal.length] = constructModal();
            $.ajax({
                url: option.url,
                type: option.type || 'GET',
                data: option.data,
                success: function (response, status, xhr) {
                    if (/<[a-z][\s\S]*>/i.test(response)) {
                        $modal[$modal.length - 1].html(response);
                        Metronic.unblockUI();
                        option.width = option.width || option.size;
                        option.margin = option.margin || '30px auto';
                        if (/^\d+(px)$/i.test(option.width)) {
                            $('.modal-dialog', $modal[$modal.length - 1]).css({ 'width': option.width, 'margin': option.margin });
                        } else if (option.width == 'small') {
                            $('.modal-dialog', $modal[$modal.length - 1]).addClass('modal-sm').removeClass('modal-lg');
                        } else if (option.width == 'normal') {
                            $('.modal-dialog', $modal[$modal.length - 1]).removeClass('modal-sm').removeClass('modal-lg');
                        } else if (option.width == 'large') {
                            $('.modal-dialog', $modal[$modal.length - 1]).addClass('modal-lg').removeClass('modal-sm');
                        } else if (option.width == 'fullscreen') {
                            $('.modal-dialog', $modal[$modal.length - 1]).css({
                                'width': '100%',
                                'height': '100%',
                                'margin': '0',
                                'padding': '0'
                            });
                            $('.modal-dialog', $modal[$modal.length - 1]).removeClass('modal-lg').removeClass('modal-sm');
                            $('.modal-content', $modal[$modal.length - 1]).css({
                                'height': '100%',
                                'min-height': '100%'
                            });
                        }
                    } else {
                        var msg = $('.modal-header h4', $modal[$modal.length - 1]);
                        msg.text(response || msg.text());
                    }
                    $('.modal-header', $modal[$modal.length - 1]).css({
                        'padding': '10px',
                        'background-color': '#fff',
                        'border-bottom-color': '#01a4a4'

                    });

                    $('.close', $modal[$modal.length - 1]).attr('style', "width:18px;height:18px;opacity:1");
                    $('.close', $modal[$modal.length - 1]).click(function () {
                        var tipMsg = $(this).attr('confirm_tip');
                        if (tipMsg != undefined && tipMsg != "") {
                            warning.confirm(tipMsg, function (r) {
                                if (r) {
                                    popdialog.closeModal();
                                }
                            });
                        } else {
                            popdialog.closeModal();
                        }
                    });
                    $('.modal-title', $modal[$modal.length - 1]).css({
                        'font-size': '18px',
                        'color': '#01a4a4',
                        'padding-left': '12px'
                    });
                }
            }).always(function () {
                $modal[$modal.length - 1].modal();
                var $backdrop = $('.modal-backdrop');
                $backdrop.css('z-index', ($backdrop.css('z-index') - 1));
            });

            $modal[$modal.length - 1].on('shown.bs.modal', function () {
                // 是弹出框居中。。。
                // var $modal_dialog = $(this).find('.modal-dialog');
                // //获取可视窗口的高度
                // var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight: document.documentElement.clientHeight;
                // //得到dialog的高度
                // var dialogHeight = $modal_dialog.height();
                // //计算出距离顶部的高度
                // var m_top = (clientHeight - dialogHeight)/2;
                // $modal_dialog.css({'margin': m_top + 'px auto'});
                Metronic.unblockUI();

                if (typeof option.showSuccess != undefined && typeof option.showSuccess === "function") {
                    option.showSuccess();
                }
            });
            $modal[$modal.length - 1].on('hiden.bs.modal', function () {
                var timestamp = $(this).data('timestamp');
                $modal[$modal.length - 1].trigger('destroyed.modalmanager');
                var modals = popdialog.getModals();
                $.each(modals, function (index, item) {
                    if (item.data('timestamp') == timestamp) {
                        modals.splice(index, 1);
                    }
                });
                popdialog.setModals(modals);
                Metronic.unblockUI();
            });
        },
        popdialog.showModalHtml = function (option) {
            Metronic.blockUI({ animate: true });
            $.fn.modal.defaults.html = option.html;
            $modal[$modal.length] = constructModal();
            var response = option.html;
            if (/<[a-z][\s\S]*>/i.test(response)) {
                $modal[$modal.length - 1].html(response);
                Metronic.unblockUI();
                option.width = option.width || option.size;
                option.margin = option.margin || '30px auto';
                if (/^\d+(px)$/i.test(option.width)) {
                    $('.modal-dialog', $modal[$modal.length - 1]).css({ 'width': option.width, 'margin': option.margin });
                } else if (option.width == 'small') {
                    $('.modal-dialog', $modal[$modal.length - 1]).addClass('modal-sm').removeClass('modal-lg');
                } else if (option.width == 'normal') {
                    $('.modal-dialog', $modal[$modal.length - 1]).removeClass('modal-sm').removeClass('modal-lg');
                } else if (option.width == 'large') {
                    $('.modal-dialog', $modal[$modal.length - 1]).addClass('modal-lg').removeClass('modal-sm');
                } else if (option.width == 'fullscreen') {
                    $('.modal-dialog', $modal[$modal.length - 1]).css({
                        'width': '100%',
                        'height': '100%',
                        'margin': '0',
                        'padding': '0'
                    });
                    $('.modal-dialog', $modal[$modal.length - 1]).removeClass('modal-lg').removeClass('modal-sm');
                    $('.modal-content', $modal[$modal.length - 1]).css({
                        'height': '100%',
                        'min-height': '100%'
                    });
                }
            } else {
                var msg = $('.modal-header h4', $modal[$modal.length - 1]);
                msg.text(response || msg.text());
            }
            $('.modal-header', $modal[$modal.length - 1]).css({
                'padding': '10px',
                'background-color': '#fff',
                'border-bottom-color': '#01a4a4'

            });

            $('.close', $modal[$modal.length - 1]).attr('style', "width:18px;height:18px;opacity:1");
            $('.close', $modal[$modal.length - 1]).click(function () {
                var tipMsg = $(this).attr('confirm_tip');
                if (tipMsg != undefined && tipMsg != "") {
                    warning.confirm(tipMsg, function (r) {
                        if (r) {
                            popdialog.closeModal();
                        }
                    });
                } else {
                    popdialog.closeModal();
                }
            });
            $('.modal-title', $modal[$modal.length - 1]).css({
                'font-size': '18px',
                'color': '#01a4a4',
                'padding-left': '12px'
            });
            $modal[$modal.length - 1].modal();
            var $backdrop = $('.modal-backdrop');
            $backdrop.css('z-index', ($backdrop.css('z-index') - 1));
            $modal[$modal.length - 1].on('shown.bs.modal', function () {
                // 是弹出框居中。。。
                // var $modal_dialog = $(this).find('.modal-dialog');
                // //获取可视窗口的高度
                // var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight: document.documentElement.clientHeight;
                // //得到dialog的高度
                // var dialogHeight = $modal_dialog.height();
                // //计算出距离顶部的高度
                // var m_top = (clientHeight - dialogHeight)/2;
                // $modal_dialog.css({'margin': m_top + 'px auto'});
                Metronic.unblockUI();

                if (typeof option.showSuccess != undefined && typeof option.showSuccess === "function") {
                    option.showSuccess();
                }
            });
            $modal[$modal.length - 1].on('hiden.bs.modal', function () {
                var timestamp = $(this).data('timestamp');
                $modal[$modal.length - 1].trigger('destroyed.modalmanager');
                var modals = popdialog.getModals();
                $.each(modals, function (index, item) {
                    if (item.data('timestamp') == timestamp) {
                        modals.splice(index, 1);
                    }
                });
                popdialog.setModals(modals);
                Metronic.unblockUI();
            });
        },
        popdialog.closeModal = function () {
            var len = $modal.length;
            $modal[len - 1].trigger('destroyed.modalmanager');
            $modal[len - 1].modal('hide');
            $modal.length = len - 1;
        },

        popdialog.showIframe = function (option) {
            $('body').removeClass('rui-window-open');
            Metronic.blockUI({ animate: true });
            $styleSheet = constructStyleSheet($styleSheet);
            $('head').append($styleSheet);
            $iframe = constructIframe($iframe);
            window.$iframe = $iframe;
            if (!option.head) {
                $('.header', $iframe).remove();
            }
            $iframe.find('iframe').attr('src', option.url);
            $('body').append($iframe);
            $('#ajax-iframe iframe').on('load', function () {
                var title = option.title || $(this)[0].contentWindow.document.title;
                $('.header .actions span').text(title);
                if (!$('body').hasClass('rui-window-open')) {
                    $('body').addClass('rui-window-open');
                    $('body').css('overflow');
                    //var title = option.title;
                    //$('.header .actions span').text(title);
                    var hHeight = $('.header', $iframe).height();
                    $('.content', $iframe).height($(window).height() - hHeight);
                    $('body').modalmanager('removeLoading');
                    try {
                        this.contentWindow.$('.slimScrollDiv').css('height', 'auto');
                    } catch (e) {
                    }
                    $iframe.css({ display: 'block' });
                    Metronic.unblockUI();
                    $('.header', $iframe).on('click', '.actions>.remove', function () {
                        popdialog.closeIframe();
                    });
                }
                $(window).on('resize', function () {
                    var hHeight = $('.header', $iframe).height();
                    $('.content', $iframe).height($(window).height() - hHeight);
                });
            });
        },

        popdialog.closeIframe = function (func) {
            // $('body').removeClass('rui-window-open');
            // $iframe.css({display: 'none'});
            // if (typeof func === 'function') {
            //     func.call();
            // }
            // $iframe.remove();
            //parent.document.body.className = "";
            $('body').removeClass('rui-window-open');
            parent.window.$('head .rui-window-open').remove();
            parent.window.$iframe.css({ display: 'none' });
            if (typeof func === 'function') {
                func.call();
            }
        }

    function constructModal() {
        return $(
            '<div id="ajax-modal" data-timestamp="ajax-modal-' + (+new Date()) + '" data-backdrop="static" class="modal modal-fullscreen fade" tabindex="-1" aria-hidden="true" style="display: none; overflow-y: hidden !important;">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>' +
            '<h4>加载错误</h4>' +
            '</div>' +
            //'<div class="modal-body">' +

            //'</div>' +
            '<div class="modal-footer">' +
            '<button type="button" data-dismiss="modal" class="btn btn-primary">关闭</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
    }

    function constructIframe($iframe) {
        if ($iframe) {
            $iframe.remove();
        }
        return $(
            '<div id="ajax-iframe" class="rui-window">' +
            '<div class="header">' +
            '<div class="actions">' +
            '<span></span>' +
            '<a href="javascript:;" class="remove"><i class="fa fa-close"></i></a>' +
            '</div>' +
            '</div>' +
            '<div class="content">' +
            '<iframe src=""></iframe>' +
            '</div>' +
            '</div>'
        );
    }

    function constructStyleSheet($styleSheet) {
        if ($styleSheet) {
            $styleSheet.remove();
        }
        return $(
            '<style type="text/css" class="rui-window-open">' +
            'body.rui-window-open {' +
            'overflow: hidden;' +
            '}' +
            '.rui-window {' +
            'display: none;' +
            '}' +
            'body.rui-window-open .rui-window > .header {' +
            'box-sizing: border-box;' +
            'height: 40px;' +
            'background-color: #fff;' +
            'border-bottom: 1px solid #EFEFEF;' +
            '}' +
            'body.rui-window-open .rui-window > .header > .actions > span {' +
            'font-size: 18px;' +
            'line-height: 40px;' +
            'margin: 0 20px;' +
            'display: inline-block;' +
            //'width: 90%;' +
            'float: left;' +
            'white-space: nowrap;' +
            'overflow: hidden;' +
            '}' +
            'body.rui-window-open .rui-window > .header > .actions > .remove {' +
            'float: right;' +
            'display: block;' +
            'padding: 4px;' +
            'color: #333;' +
            '}' +
            'body.rui-window-open .rui-window {' +
            'z-index: 10000;' +
            'position: fixed;' +
            'left: 0px;' +
            'top: 0px;' +
            'box-sizing: border-box;' +
            'width: 100%;' +
            'height: inherit;' +
            '}' +
            'body.rui-window-open .rui-window > .content {' +
            'width: inherit;' +
            'height: inherit;' +
            'background-color: #fff;' +
            '}' +
            'body.rui-window-open .rui-window iframe {' +
            'border: none;' +
            'width: inherit;' +
            'height: inherit;' +
            '}' +
            '</style>'
        );
    }

    return popdialog;
});