(function (root, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function ($) {
            return (root.AjaxWindow = factory($));
        });
    }
    else {
        root.AjaxWindow = root.AjaxWindow || factory(root.jQuery);
    }

}(this, function ($) {
    'use strict';

    var $modal = [], $iframe, $styleSheet;

    return {
        getModals: function () { return $.extend([], $modal); },

        setModals: function (modals) {
            $.each($modal, function (index, item) {
                if (modals.indexOf(item) <= -1) {
                    item.remove();
                }
            });
            $modal = modals;
        },

        showModal: function (option) {
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
                        /*
                        if (option.width) {
                            $('.modal-dialog', $modal[$modal.length - 1]).css('width', option.width);
                        }
                        else {
                            if (option.size === 'small') {
                                $('.modal-dialog', $modal[$modal.length - 1]).addClass('modal-sm').removeClass('modal-md').removeClass('modal-lg');
                            }
                            else if (option.size === 'normal') {
                                $('.modal-dialog', $modal[$modal.length - 1]).addClass('modal-md').removeClass('modal-sm').removeClass('modal-lg');
                            }
                            else if (option.size === 'large') {
                                $('.modal-dialog', $modal[$modal.length - 1]).addClass('modal-lg').removeClass('modal-sm').removeClass('modal-md');
                            }
                            else if (option.size === 'fullscreen') {
                                $('.modal-dialog', $modal[$modal.length - 1]).css({
                                    'width': '100%',
                                    'height': '100%',
                                    'margin': '0',
                                    'padding': '0'
                                });
                                $('.modal-dialog', $modal[$modal.length - 1]).removeClass('modal-lg').removeClass('modal-sm').removeClass('modal-md');
                                $('.modal-content', $modal[$modal.length - 1]).css({
                                    'height': '100%',
                                    'min-height': '100%'
                                });
                            }
                        }
                        */
                        option.width = option.width || option.size;
                        if (/^\d+(px)$/i.test(option.width)) {
                            $('.modal-dialog', $modal[$modal.length - 1]).css('width', option.width);
                        }
                        else if (option.width == 'small') {
                            $('.modal-dialog', $modal[$modal.length - 1]).addClass('modal-sm').removeClass('modal-lg');
                        }
                        else if (option.width == 'normal') {
                            $('.modal-dialog', $modal[$modal.length - 1]).removeClass('modal-sm').removeClass('modal-lg');
                        }
                        else if (option.width == 'large') {
                            $('.modal-dialog', $modal[$modal.length - 1]).addClass('modal-lg').removeClass('modal-sm');
                        }
                        else if (option.width == 'fullscreen') {
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
                    }
                    else {
                        var msg = $('.modal-header h4', $modal[$modal.length - 1]);
                        msg.text(response || msg.text());
                    }
                }
            }).always(function () {
                $modal[$modal.length - 1].modal();
                var $backdrop = $('.modal-backdrop');
                $backdrop.css('z-index', ($backdrop.css('z-index') - 1));
            });
            $modal[$modal.length - 1].on('shown.bs.modal', function () {
                Metronic.unblockUI();
            });
            $modal[$modal.length - 1].on('hiden.bs.modal', function () {
                var timestamp = $(this).data('timestamp');
                $modal[$modal.length - 1].trigger('destroyed.modalmanager');
                var modals = AjaxWindow.getModals();
                $.each(modals, function (index, item) {
                    if (item.data('timestamp') == timestamp) {
                        modals.splice(index, 1);
                    }
                });
                AjaxWindow.setModals(modals);
                Metronic.unblockUI();
            });
        },

        closeModal: function () {
            var len = $modal.length;
            $modal[len - 1].trigger('destroyed.modalmanager');
            $modal[len - 1].modal('hide');
            $modal.length = len - 1;
        },

        showIframe: function (option) {
            Metronic.blockUI({ animate: true });
            $styleSheet = constructStyleSheet($styleSheet);
            $('head').append($styleSheet);
            $iframe = constructIframe($iframe);
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
                    } catch (e) { }
                    $iframe.css({ display: 'block' });
                    Metronic.unblockUI();
                    $('.header', $iframe).on('click', '.actions>.remove', function () {
                        AjaxWindow.closeIframe();
                    });
                }
                $(window).on('resize', function () {
                    var hHeight = $('.header', $iframe).height();
                    $('.content', $iframe).height($(window).height() - hHeight);
                });
            });
        },

        closeIframe: function (func) {
            $('body').removeClass('rui-window-open');
            $iframe.css({ display: 'none' });
            if (typeof func === 'function') {
                func.call();
            }
            $iframe.remove();
        }
    };

    function constructModal() {
        return $(
			'<div id="ajax-modal" data-timestamp="ajax-modal-' + (+new Date()) + '" data-backdrop="static" class="modal modal-fullscreen fade" tabindex="-1" aria-hidden="true" style="display: none;">' +
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
            '<style type="text/css">' +
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
}));