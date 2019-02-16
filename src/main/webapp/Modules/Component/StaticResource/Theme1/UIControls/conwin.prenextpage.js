/**
 * Created by caihao on 17/2/22.
 */
define(['jquery'],function ($) {
    var prevNextpage={};
    prevNextpage.bindPageClass = function () {
        var currentPageInfo = prevNextpage.PageInfo;
        if (currentPageInfo.HasNext) {
            $('#nextBtn').removeClass('disabled');
            $('#nextBtn').removeClass('c-gray-btn');
            $('#nextBtn').removeAttr('disabled');
            $('#nextBtn').addClass('c-green');
            $('#nextBtn').children(':first').removeClass('m-icon-gray');
            $('#nextBtn').children(':first').addClass('m-icon-white');
        } else {
            $('#nextBtn').addClass('disabled');
            $('#nextBtn').addClass('c-gray-btn');
            $('#nextBtn').attr("disabled", "disabled");
            $('#nextBtn').removeClass('c-green');
            $('#nextBtn').children(':first').addClass('m-icon-gray');
            $('#nextBtn').children(':first').removeClass('m-icon-white');
        }
        if (currentPageInfo.HasPrev) {
            $('#prevBtn').removeClass('disabled');
            $('#prevBtn').removeClass('c-gray-btn');
            $('#prevBtn').removeAttr('disabled');
            $('#prevBtn').addClass('c-green');
            $('#prevBtn').children(':first').removeClass('m-icon-gray');
            $('#prevBtn').children(':first').addClass('m-icon-white');
        } else {
            $('#prevBtn').addClass('disabled');
            $('#prevBtn').addClass('c-gray-btn');
            $('#prevBtn').attr("disabled", "disabled");
            $('#prevBtn').removeClass('c-green');
            $('#prevBtn').children(':first').addClass('m-icon-gray');
            $('#prevBtn').children(':first').removeClass('m-icon-white');
        }
    };
    //分页信息
    prevNextpage.PageInfo = {
        IDS: [],
        Index: 0,
        PageSize: 0,
        HasPrev: false,
        HasNext: false
    };
    //初始化子页面记录数据
    prevNextpage.initPageInfo = function (ids) {
        prevNextpage.PageInfo.IDS = ids;
        prevNextpage.PageInfo.Index = 0;
        prevNextpage.PageInfo.PageSize = ids.length;
        prevNextpage.PageInfo.HasNext = ids.length > 1;
        prevNextpage.PageInfo.HasPrev = false;
    };
    //计算分页信息
    prevNextpage.calculatePage = function (tag) {
        if (tag == undefined)
            return prevNextpage.PageInfo;
        //标识
        if (tag > 0) {
            prevNextpage.PageInfo.Index++;
        }
        else {
            prevNextpage.PageInfo.Index--;
        }
        prevNextpage.PageInfo.HasNext = prevNextpage.PageInfo.PageSize > (prevNextpage.PageInfo.Index + 1);
        prevNextpage.PageInfo.HasPrev = prevNextpage.PageInfo.Index > 0;
        return prevNextpage.PageInfo;
    };

    prevNextpage.next = function () {
        prevNextpage.calculatePage(1);
        prevNextpage.bindPageClass();
    };
    prevNextpage.prev = function () {
        prevNextpage.calculatePage(-1);
        prevNextpage.bindPageClass();
    };
    return prevNextpage;
});