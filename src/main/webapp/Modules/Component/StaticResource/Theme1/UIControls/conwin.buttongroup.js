define(['jquery'], function ($) {
    $(document).ready(function () {
        $('.buttongroup-more').click(function () {
            var _this = $(this);
            var buttongroup = _this.next('.button-group');
            if (buttongroup.is(":hidden")) {
                buttongroup.find('a').css({ 'margin': '5px 0', 'text-align': 'left', 'color': '#fff', 'display': 'block' });
                buttongroup.css('top', _this.position().top + _this.outerHeight());
                buttongroup.css('left', _this.position().left + parseFloat(_this.css('margin-left').replace('px')));
                buttongroup.slideDown('fast');
            }
            else {
                buttongroup.slideUp('fast');
            }
        });
    });
});