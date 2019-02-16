define(['jquery', 'jqueryQrcode'], function ($,jqueryQrcode) {
    'use strict';
      var QRErrorCorrectLevel = {
	L : 1,
	M : 0,
	Q : 3,
	H : 2
      };

    $.fn.Qrcode = function (string,param)
    {
        var type = "table";
        if (canvasSupport()) {
            type = "canvas"
        }
        var $this = $($(this)[0]);
        var DefaultParam = {
            render: type,
            text: string,
            width: 100,
            height: 100,
            background: "#FFF",
            foreground: "#000",
            correctLevel: QRErrorCorrectLevel.H,
        };

        DefaultParam.width = $this.width();
        DefaultParam.height = $this.height();

        if (param)
        {
            $.extend(DefaultParam, param);
        }
        $this.qrcode(DefaultParam)
        return $this;
    }

    function canvasSupport() {
        return !!document.createElement('canvas').getContext;
    }
});