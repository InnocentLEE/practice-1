/**
 * Created by  on 2017/6/6.
 @author zh.huang
 @desc 基于百度地图进行封装的控件js
 */

define(['jquery', 'drawmanager'], function ($) {

    var map = {};
    //var linister = undefined;
    /**
     * 初始化地图。提供options. 可选参数。参考百度地图api 提供的map属性和方法
     * 默认添加了缩放控件。
     * @param options
     */
    map.init = function (options) {
        mapView = new BMap.Map("container");
        var zoom = options.zoom;// 创建Map实例
        var point = new BMap.Point(113.249701, 23.137962); // 创建点坐标
        mapView.centerAndZoom(point, zoom);
        mapView.enableScrollWheelZoom(); //默认地图可以缩放。

        var bottom_left_control = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT });// 左下角，添加比例尺
        var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
        mapView.addControl(bottom_left_control);
        mapView.addControl(top_left_navigation);

        return mapView;
    }


    /**
     * 根据不同的城市级别展示marker
     * @param options
     */
    map.showMarkerByLevel = function (options) {

        var model = options.model;// 表示当前等级的 要展示的数据
        var level = model[0].level; // 表示等级 .包括市city 县area 镇town 村country 街道stress
        //内置的样式
        var markers = [];
        var lngXYs = [];
        for (var i = 0; i < model.length; ++i) {
            var cricleMarker = map.createMarker(model[i], 1, mapView);
            var content = '';
            if (level == 'country') {
                if (model[i].type == 1) {
                    content += '<div class="rectType1">';
                    content += model[i].content;
                    content += '</div>'
                } else if (model[i].type == 2) {
                    content += '<div class="rectType2">';
                    content += model[i].content;
                    content += '</div>'
                } else if (model[i].type == 3) {
                    content += '<div class="rectDot1"><div class="rectDot2"><div class="rectDot3">';
                    content += model[i].content;
                    content += '</div></div></div>';
                }
            } else {
                if (model[i].type == 1) {
                    content += '<div class="cricletype1">';
                    content += model[i].content;
                    content += '</div>';
                } else if (model[i].type == 2) {
                    content += '<div class="cricletype2">';
                    content += model[i].content;
                    content += '</div>';
                } else if (model[i].type == 3) {
                    content += '<div class="cricleDot1"><div class="cricleDot2"><div class="cricleDot3">';
                    content += model[i].content;
                    content += '</div></div></div>';
                }
            }
            if (cricleMarker.getLabel() != null) {
                mapView.removeOverlay(cricleMarker.getLabel());
            }
            var label = new BMap.Label(content, { offset: new BMap.Size(-60, -60) });
            label.setStyle({ backgroundColor: 'transparent', border: '0px solid transparent' });

            cricleMarker.setLabel(label);
            mapView.addOverlay(cricleMarker);
            markers.push(cricleMarker); //放入markers数
        }
        var lngXYs = [];
        $.each(markers, function (index, item) {
            var point = item.getPosition();
            var lngXy = [];
            lngXy[0] = point.lng;
            lngXy[1] = point.lat;
            lngXYs.push(lngXy);
        });

        var centerPoint = map.calculateCenter(lngXYs);
        mapView.centerAndZoom(centerPoint, mapView.getZoom());

        return markers;
    }

    /**
        创建marker.并显示在地图上。
    */
    map.createMarker = function (obj, type) {
        var lng = obj.lng; //经纬度
        var lat = obj.lat;
        var labelContent = obj.content; //marker 样式
        var point = new BMap.Point(lng, lat);
        if (type == 0) {
            var marker = new BMap.Marker(point);
        } else if (type == 1) { //marker 隐藏
            var myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/fox.gif", new BMap.Size(1, 1));
            var marker = new BMap.Marker(point, { icon: myIcon });
        }
        mapView.addOverlay(marker);

        return marker;
    }


    /**
    * 设置多个marker的点击事件 用于所以层次回调。
    * @param options
    */
    map.clickMarker = function (options, callback) {
        var Markers = options.markers;
        $.each(Markers, function (index, item) {
            item.addEventListener('click', function () {
                callback(this);
            });
        });
    }

    /**
        重新刷新根据等级绘制marker.并设定事件。
    */

    map.refreshMarker = function (data, callback) {
        mapView.clearOverlays();
        var markers = map.showMarkerByLevel({ level: data.level, model: data });
        var labels = [];
        $.each(markers, function (index, item) {
            var label = item.getLabel();
            labels.push(label);
        });
        map.clickMarker({ markers: labels }, function (marker) {
            callback(marker);
        });
    }


    /**
     * 根据缩放的不同等级比例展示不同层级的markers。
     * @param options 包括。需要监听的容器map.
     * @param callback 回调事件
     */
    map.scaleMapView = function (callback) {
        mapView.addEventListener("zoomend", function () {
            callback(mapView.getZoom());
        });


    }


    /**
        展示点。默认选择最大的等级显示。
    */
    map.showPoint = function (obj) {
        mapView.clearOverlays();

        mapView.removeEventListener("zoomend", function () { });


        var lng = obj.lng; //经纬度
        var lat = obj.lat;
        var zoom = obj.zoom || 19;
        var labelContent = obj.content; //marker 样式
        var point = new BMap.Point(lng, lat);
        mapView.centerAndZoom(point, zoom);
        var marker = new BMap.Marker(point);
        if (typeof (labelContent) != "undefined") {
            var label = new BMap.Label(labelContent, { offset: new BMap.Size(0, 0) });
            marker.setLabel(label);
        }
        mapView.addOverlay(marker);
        return marker;
    }



    /**
        展示线路 
    */
    map.showLine = function (array1, array2) {
        mapView.clearOverlays();
        mapView.removeEventListener("zoomend", function () { });
        var lngXY1 = array1 || [[116.399, 39.910], [116.405, 39.920], [116.425, 39.900]];
        var lngXY2 = array2;
        var points1 = [], points2 = [];
        $.each(lngXY1, function (index, item) {
            var point = new BMap.Point(item[0], item[1]);
            points1.push(point);
        })
        if ($.isArray(lngXY2) && lngXY2.length > 0) {
            $.each(lngXY2, function (index, item) {
                var point = new BMap.Point(item[0], item[1]);
                points2.push(point);
            })
        }

        //獲得綫路點集合
        function getlist(pointlist, type) {
            for (i = 0; i < pointlist.length; i++) {
                //设置标注文字
                if (i == 0) {
                    var startIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png",
                        new BMap.Size(22, 30));
                    startIcon.setImageUrl("http://oaf5v9at6.bkt.clouddn.com/%E5%A7%8B.png");
                    startIcon.setImageSize(new BMap.Size(22, 30));
                    var startpoint = new BMap.Marker(pointlist[i], { icon: startIcon });
                    startpoint.setTitle("起点");
                    mapView.addOverlay(startpoint);
                } else if (i == pointlist.length - 1) {
                    var endIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png",
                        new BMap.Size(22, 30));
                    endIcon.setImageUrl("http://oaf5v9at6.bkt.clouddn.com/%E7%BB%88.png");
                    endIcon.setImageSize(new BMap.Size(22, 30));
                    var endpoint = new BMap.Marker(pointlist[i], { icon: endIcon });
                    endpoint.setTitle("终点");
                    mapView.addOverlay(endpoint);
                } else {
                    var passIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png",
                        new BMap.Size(15, 20));
                    passIcon.setImageUrl("http://oaf5v9at6.bkt.clouddn.com/%E6%B2%BF%E9%80%94%E7%82%B9.png");
                    passIcon.setImageSize(new BMap.Size(15, 20));
                    var passpoint = new BMap.Marker(pointlist[i], { icon: passIcon });
                    passpoint.setTitle("途经点");
                    mapView.addOverlay(passpoint);
                }
            }

            var group = Math.floor(pointlist.length / 11);
            var mode = pointlist.length % 11;


            if (type == 0) { //蓝色
                var strokeColor = "#2299f4";
            } else if (type == 1) { //绿色
                var strokeColor = "#62a90c";
            }
            var driving = new BMap.DrivingRoute(mapView, {
                onSearchComplete: function (results) {
                    if (driving.getStatus() == BMAP_STATUS_SUCCESS) {
                        var plan = driving.getResults().getPlan(0);
                        var num = plan.getNumRoutes();
                        for (var j = 0; j < num; j++) {
                            var pts = plan.getRoute(j).getPath();    //通过驾车实例，获得一系列点的数组
                            var polyline = new BMap.Polyline(pts, {
                                strokeColor: strokeColor,
                                strokeWeight: 6,
                                strokeOpacity: 1
                            });
                            mapView.addOverlay(polyline);
                        }
                    }
                }
            });
            for (var i = 0; i < group; i++) {
                var waypoints = pointlist.slice(i * 11 + 1, (i + 1) * 11);
                driving.search(pointlist[i * 11], pointlist[(i + 1) * 11], { waypoints: waypoints });//waypoints表示途经点
            }
            if (mode != 0) {
                var waypoints = pointlist.slice(group * 11, pointlist.length - 1);//多出的一段单独进行search
                driving.search(pointlist[group * 11], pointlist[pointlist.length - 1], { waypoints: waypoints });
            }
        }

        //根據點畫綫
        function showPolyline(pointlist, truelist) {
            getlist(pointlist, 0);
            if (truelist.length > 0) {
                getlist(truelist, 0);
                mapView.setViewport(truelist); //调整到最佳视野
            }

            setTimeout(function () {
                mapView.setViewport(pointlist);
            }, 1000);
        }
        mapView.clearOverlays();//清除地图上所有的覆盖物 
        showPolyline(points1, points2);
    }

    /** 
        展示区域
    */
    map.showArea = function (array) {
        mapView.clearOverlays();
        mapView.removeEventListener("zoomend", function () { });
        var lngXY1 = array || [[116.399, 39.910], [116.405, 39.920], [116.425, 39.900]];
        var points1 = [];
        $.each(lngXY1, function (index, item) {
            var point = new BMap.Point(item[0], item[1]);
            points1.push(point);
        })
        var ply = new BMap.Polygon(points1, { strokeWeight: 2, strokeColor: "#ff0000" }); //建立多边形覆盖物
        mapView.setViewport(points1); //调整到最佳视野
        mapView.addOverlay(ply);  //添加覆盖物
    }

    /**
     * 用鼠标描绘点线面
     * @param options
     * @param type
     * @param callback
     */
    map.drawLineByOptions = function (options, type, callback) {

        var mapView = options.mapView;
        mapView.clearOverlays();
        mapView.removeEventListener("zoomend", function () { });
        var styleOptions = {
            strokeColor: "red",    //边线颜色。
            fillColor: "red",      //填充颜色。当参数为空时，圆形将没有填充效果。
            strokeWeight: 3,       //边线的宽度，以像素为单位。
            strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
            fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
            strokeStyle: 'solid' //边线的样式，solid或dashed。
        }
        //实例化鼠标绘制工具
        var drawingManager = new BMapLib.DrawingManager(mapView, {
            isOpen: true, //是否开启绘制模式
            enableDrawingTool: false, //是否显示工具栏
            circleOptions: styleOptions, //圆的样式
            polylineOptions: styleOptions, //线的样式
            polygonOptions: styleOptions, //多边形的样式
            rectangleOptions: styleOptions //矩形的样式
        });
        if (type == 0) { //画点
            drawingManager.setDrawingMode(BMAP_DRAWING_MARKER);
        } else if (type == 1) { //画线
            drawingManager.setDrawingMode(BMAP_DRAWING_POLYLINE);
        } else if (type == 2) { //画圆
            drawingManager.setDrawingMode(BMAP_DRAWING_CIRCLE);
        } else if (type == 3) { //画多边形
            drawingManager.setDrawingMode(BMAP_DRAWING_POLYGON);
        } else if (type == 4) { //画矩形
            drawingManager.setDrawingMode(BMAP_DRAWING_RECTANGLE);
        }


        //添加鼠标绘制工具监听事件，用于获取绘制结果
        drawingManager.addEventListener('overlaycomplete', overlaycomplete);

        function overlaycomplete(e) {
            if (e.drawingMode == "marker") { //画点
                callback(e.overlay.point);
            } else if (e.drawingMode == "polyline") { //画线
                callback(e.overlay.ia);
            } else if (e.drawingMode == "polygon") { //画多边形
                callback(e.overlay.ia);
            } else if (e.drawingMode == "circle") { //画圆
                callback(e.overlay.point);
            } else if (e.drawingMode == "rectangle") { //画矩形
                callback(e.overlay.ia);
            }
        }

    }

    /**
     * 逆地址解析
     * @param lng
     * @param lag
     * @param callBack
     * @constructor
     */
    map.parseAddressByLng = function (lng, lat, callBack) {
        var geoc = new BMap.Geocoder();
        geoc.getLocation(new BMap.Point(lng, lat), function (rs) {
            var addComp = rs.addressComponents;
            var address = rs.address;
            console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
            callBack(address, addComp);
        });
    }

    /**
     * 地址解析
     * @param address
     * @param callback
     */
    map.parseLngByAddress = function (address, callback) {
        var myGeo = new BMap.Geocoder();
        // 将地址解析结果显示在地图上,并调整地图视野
        myGeo.getPoint(address, function (point) {
            if (point) {
                callback(point);
            } else {
                alert("您选择地址没有解析到结果!");
            }
        }, "");
    }

    /**
     * 点纠错
     * @param marker
     * @param mapView
     * @param callback
     */
    map.changeLng = function (options, callback) {
        var mapView = options.mapView;
        mapView.clearOverlays();
        mapView.removeEventListener("zoomend", function () { });
        var point = new BMap.Point(options.lng, options.lat);
        var marker = new BMap.Marker(point);
        mapView.centerAndZoom(point, 19);
        mapView.addOverlay(marker);
        marker.enableDragging();
        marker.addEventListener('dragend', newPoint);

        function newPoint(e) {
            callback(e.point);
        }
    }

    /**
     * 行政区域范围显示
     * @param city
     * @param mapView
     */
    map.districtSearch = function (city) {
        var bdary = new BMap.Boundary();
        bdary.get(city, function (rs) {       //获取行政区域
            // mapView.clearOverlays();        //清除地图覆盖物       
            var count = rs.boundaries.length; //行政区域的点有多少个
            if (count === 0) {
                alert('未能获取当前输入行政区域');
                return;
            }
            var pointArray = [];
            for (var i = 0; i < count; i++) {
                var ply = new BMap.Polygon(rs.boundaries[i], { strokeWeight: 2, strokeColor: "#ff0000" }); //建立多边形覆盖物
                mapView.addOverlay(ply);  //添加覆盖物
                pointArray = pointArray.concat(ply.getPath());
            }
            //map.setViewport(pointArray);    //调整视野  
            addlabel();
        });

        function addlabel() {
            var pointArray = [
              new BMap.Point(121.716076, 23.703799),
              new BMap.Point(112.121885, 14.570616),
              new BMap.Point(123.776573, 25.695422)];
            var optsArray = [{}, {}, {}];
            var labelArray = [];
            var contentArray = [
              "台湾是中国的！",
              "南海是中国的！",
              "钓鱼岛是中国的！"];
            for (var i = 0; i < pointArray.length; i++) {
                optsArray[i].position = pointArray[i];
                labelArray[i] = new BMap.Label(contentArray[i], optsArray[i]);
                labelArray[i].setStyle({
                    color: "red",
                    fontSize: "12px",
                    height: "20px",
                    lineHeight: "20px",
                    fontFamily: "微软雅黑"
                });
                mapView.addOverlay(labelArray[i]);
            }
        }
    }

    /**
   * 根据多个点算中心点。
   * @param  lnglatarr 为多个点的数组
   */
    map.calculateCenter = function (lnglatarr) {
        var total = lnglatarr.length;
        var X = 0, Y = 0, Z = 0;
        $.each(lnglatarr, function (index, lnglat) {
            var lng = lnglat[0] * Math.PI / 180;
            var lat = lnglat[1] * Math.PI / 180;
            var x, y, z;
            x = Math.cos(lat) * Math.cos(lng);
            y = Math.cos(lat) * Math.sin(lng);
            z = Math.sin(lat);
            X += x;
            Y += y;
            Z += z;
        });

        X = X / total;
        Y = Y / total;
        Z = Z / total;

        var Lng = Math.atan2(Y, X);
        var Hyp = Math.sqrt(X * X + Y * Y);
        var Lat = Math.atan2(Z, Hyp);

        return new BMap.Point(Lng * 180 / Math.PI, Lat * 180 / Math.PI);
    };


    /**
        百度地图经纬度转google经纬度
    */
    map.bd_decrypt = function (bd_lon, bd_lat, callback) {
        var x = bd_lon - 0.0065, y = bd_lat - 0.006;
        var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * Math.PI);
        var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * Math.PI);
        var gg_lon = z * Math.cos(theta);
        var gg_lat = z * Math.sin(theta);
        callback(gg_lon, gg_lat);
    }
    return map;
});