define([
    'jquery'
], function($) {
    'use strict';
    var defaultOption = {
        name: "",
        showboxName:"",
        ShowCount: "10",
        getdata: function(val, callback) {

        },
        timeout: 0,
        islocalData: false,
        isKeyValueData: false,
        isMatchKey: false,
        matchRegExp: "",
        exactQuerytips: "请输入精确条件查询",
        onSelected: function(obj) {
            return;
        },
        onValueChange: "",
        onValueChangeEventTimeout: 0,
    };

    $.fn.searchbox = function(option) {
        if (typeof option == 'object') {
            option = $.extend(defaultOption, option);
        }
        if (!$.isFunction(option.getdata)) {
            throw new Error("getdata must be an function")
        }
        var isKeyValue = option.isKeyValueData;
        var islocalData = option.islocalData;
        var isMatchKey = option.isMatchKey;
        var regx = new RegExp(option.matchRegExp);
        if (typeof option.matchRegExp == 'RegExp') {
            regx = option.matchRegExp;
        }
        var timeout = option.timeout;
        this.each(function(i, item) {
            var isinput = false;
            var $item = $(item);
            $item.html(gethtml());
            var liData = {};
            var oldvalue = "";
            var timer, valuechangeTimer, defaultvalue, insertvalue;
            $('#datalisthideInput', $item).attr('name', option.name);
            if (option.showboxName!='') {
                $('#datalistshowInput', $item).attr('name', option.showboxName);
            }
            //$('.datalist ul', $item).css('max-height', option.height);

            $('.datalist #datalistshowInput', $item).on('input', oninput);
            $('.datalist #datalistshowInput', $item).keydown(function(e) {
                var list = $(".datalist li.selectli", $item);
                if (list.length > 0) {
                    var keyCode = (e || window.event).keyCode;
                    if (keyCode == 38) {
                        //输入向上,选中文字高亮
                        e.preventDefault();
                        var highlightindex = list.index($('li.hover', $item));
                        if (highlightindex != -1) {
                            list.eq(highlightindex).removeClass("hover");
                            if (highlightindex == 0) {
                                highlightindex = list.length;
                            } else {
                                highlightindex--;
                            }
                        }

                        list.eq(highlightindex).mouseover();
                        inputsetvalue(list.eq(highlightindex), true);
                    } else if (keyCode == 40) {
                        e.preventDefault();
                        var highlightindex = list.index($('li.hover', $item));
                        if (highlightindex != -1) {
                            list.eq(highlightindex).removeClass("hover");
                        }
                        highlightindex++;
                        list.eq(highlightindex).mouseover();
                        inputsetvalue(list.eq(highlightindex), true);
                        //输入向下,选中文字高亮
                    } else if (keyCode == 13) {
                        e.preventDefault();
                        var highlightindex = list.index($('li.hover', $item));
                        //输入回车
                        if (highlightindex != -1) {
                            inputsetvalue(list.eq(highlightindex));
                        }
                        option.onSelected(list.eq(highlightindex));
                        $('.datalist ul', $item).hide();
                        $('.datalist ul li', $item).remove();
                    }
                }
                return;
            });
            $item.on('click', '.datalist li.selectli', function(e) {
                e.preventDefault();
                stopPropagation(e);
                inputsetvalue(this);
                option.onSelected(this);
                $('.datalist ul', $item).hide();
                $('.datalist ul li', $item).remove();
            });

            $item.on('mouseover mouseout', '.datalist li.selectli', function(e) {
                $('.datalist li.selectli', $item).removeClass("hover");
                if (e.type == "mouseover") {
                    $(this).addClass('hover');  //鼠标悬浮 
                } else if (e.type == "mouseout") {   //鼠标离开 
                    $(this).removeClass("hover");
                }
            })

            $(document).on('click', function(e) {
                $('.datalist ul', $item).hide();
                $('.datalist ul li', $item).remove();
            })

            function oninput(e) {
                e.preventDefault(e);
                stopPropagation(e);
                if (timer) {
                    window.clearTimeout(timer);
                }
                var isInput = false;
                if (e.type == "propertychange" && isinput) {
                    isInput = isinput.valueOf();
                }
                if (!isInput) {
                    defaultvalue = $(this).val();
                }
                if ($.trim($('.datalist #datalistshowInput', $item).val()) != insertvalue) {
                    $('input#datalisthideInput', $item).val('');
                }
                timer = window.setTimeout(function() {
                    if (!isInput) {
                        oldvalue = $.trim($('.datalist #datalistshowInput', $item).val());
                        operate($('.datalist #datalistshowInput', $item)[0]);
                    }
                }, Math.abs(timeout));
                isinput = false;
            }

            function inputsetvalue(_li, excuteValueChange) {
                isinput = true;
                if ($(_li).length === 0) {
                    var val = defaultvalue;
                    $('.datalist input', $item).val(val);
                } else {
                    var val = $(_li).text();
                    insertvalue = val;
                    $('.datalist input', $item).val(val);
                    if (isKeyValue) {
                        $('input#datalisthideInput', $item).val($(_li).data('value'));
                    } else {
                        $('input#datalisthideInput', $item).val(val);
                    }
                }
                if (excuteValueChange) {
                    valueChangeOperate(_li);
                }
            }

            function getdatacallback(data) {
                if (data.totalcount == undefined && data.items == undefined) {
                    throw new Error("data format error,the format of data must be {totalcount:int,items:Array}")
                }
                if (!$.isArray(data.items)) {
                    throw new Error("data must be an array data")
                }
                var lihtml = "";
                if (isKeyValue) {
                    lihtml = buildKeyValueData(data, option.exactQuerytips, option.ShowCount);
                } else {
                    lihtml = buildData(data, option.exactQuerytips, option.ShowCount);
                }
                $('.datalist ul', $item).html(lihtml);
                $('.datalist ul', $item).show();
            }

            function operate(_input) {
                if ($(_input).val() == '') {
                    $('.datalist ul', $item).hide();
                } else {
                    option.getdata($(_input).val(), getdatacallback)
                }
            }

            function valueChangeOperate(params) {
                if ($.isFunction(option.onValueChange)) {
                    if (option.onValueChangeEventTimeout) {
                        option.onValueChange(params);
                    } else {
                        if (valuechangeTimer) {
                            window.clearTimeout(valuechangeTimer);
                        }
                        valuechangeTimer = window.setTimeout(option.onValueChange, Math.abs(option.onValueChangeEventTimeout), [params])
                    }
                }
            }
        });
    }

    $.fn.setCursorPosition = function(pos) {
        this.each(function(index, elem) {
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                var range = elem.createTextRange();
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        });
        return this;
    };
    $.fn.focusEnd = function() {
            this.setCursorPosition(this.val().length);
        }
        /**
         * 停止冒泡，兼容IE8
         * @param {Event} e 
         */
    function stopPropagation(e) {
        if (e.stopPropagation)
            e.stopPropagation();
        else
            e.cancelBubble = true;
    }

    function buildData(data, tips, maxcount) {
        var lihtml = '';
        var totalcount = data.totalcount;
        var itemlength = data.items.length > maxcount ? maxcount : data.items.length;
        for (var index = 0; index < itemlength; index++) {
            lihtml += "<li class='selectli'>" + data.items[index] + "</li>"
        }
        if (totalcount > itemlength || data.items.length > maxcount) {
            lihtml += "<li style='text-align:center'>" + tips + "</li>";
        }
        return lihtml;
    }

    function buildKeyValueData(data, tips, maxcount) {
        var lihtml = '';
        var totalcount = data.totalcount;
        var itemlength = data.items.length > maxcount ? maxcount : data.items.length;
        for (var index = 0; index < itemlength; index++) {
            lihtml += "<li class='selectli' data-value=" + data.items[index].Key + ">" + data.items[index].Value + "</li>"
        }
        if (totalcount > itemlength || data.items.length > maxcount) {
            lihtml += "<li style='text-align:center'>" + tips + "</li>";
        }
        return lihtml;
    }
    /**
     * 获取列表基础html
     */
    function gethtml() {
        var html = '<style>.datalist {position: relative;}.datalist>input,.datalist>ul {min-width: 100%;}.datalist>input {padding: 2px 5px;}.datalist>ul {display: none;width: auto;position: absolute;z-index:99999;background:#fff;border: 1px #adaddf solid;margin-top:1px;outline: #adaddf;padding: inherit;margin: 0px;left: 0px;}.datalist>ul>li {padding: 2px 5px;list-style: none;}.datalist>ul>li.hover{background:#f2f6f9}</style><div class="datalist"><input id="datalistshowInput" class="form-control" autocomplete="off" type="text" value=""><ul></ul></div><input type="hidden" id="datalisthideInput" value="">'
        return html;
    }
    ///兼容IE8/9的自定义事件:已知bug，无法响应IE9 右键删除选项
    var  handle = (function() {      
        if (!document.addEventListener) { 
            return  function(e) { 
                if ($(this)[0].style.width == '') {
                    $(this)[0].style.width = $(this)[0].offsetWidth + 'px';
                    $(this)[0].style.height = $(this)[0].offsetHeight + 'px';
                }
                if (e.originalEvent.propertyName == 'value') {    e.handleObj.handler.apply(this, arguments);  }  
            } 
        } 
    })()  
    var  bindType = (function() {      
        if (window.addEventListener) return  'input';      
        return  'propertychange';  
    })()  
    $.event.special['input'] = {      
            bindType: bindType,
            setup: function() {  
                if (document.documentMode == 9) {              
                    var  input = this;   
                    $(this).bind('cut paste keyup', function(e) {
                        if (e.type != 'keyup' || e.keyCode != 8 || e.keyCode != 46) {
                            e.cancelBubble = true;
                            $.event.trigger('input', input) 
                        }
                    })                            
                }          
                return  false;      
            },
            teardown: function ()  {                                               
                $.event.remove(this, bindType);  
                if (document.documentMode == 9) {
                    $(this).unbind('cut paste keyup');   
                }                                 
            },
            handle: handle  
        }  
        ///End
});