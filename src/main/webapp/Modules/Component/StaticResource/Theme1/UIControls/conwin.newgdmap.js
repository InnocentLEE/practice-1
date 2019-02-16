define(['jquery'], function ($) {
    var map = {};
    /**
     * 初始化展示地图容器
     * 默认添加了工具尺。缩放尺等控件
     */
    var clickListener;

    map.init = function (options) {
        var zoom = options.zoom;
        var scale = new AMap.Scale({
            visible: true
        }),
            toolBar = new AMap.ToolBar({
                visible: true
            }),
            overView = new AMap.OverView({
                visible: true
            });
        mapView = new AMap.Map("container", {
            resizeEnable: true, zoom: zoom, center: options.lng,
        })
        mapView.addControl(scale);
        mapView.addControl(toolBar);
        mapView.addControl(overView);
        return mapView;
    }

    /**
     * 根据省市县村不同等级显示不同级别的marker.
     * @param level 不同等级 包括市 县 镇 村 街道
     * @param mapView 地图容器
     */
    map.showMarkerByLevel = function (options) {


        var model = options.model;// 表示当前等级的 要展示的数据
        var level = model[0].level; // 表示等级 .包括市city 县area 镇town 村country 街道stress
        //内置的样式
        var markers = [];
        var lngXYs = [];
        for (var i = 0; i < model.length; ++i) {
            var cricleMarker = map.showPoint(model[i], mapView);
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
            cricleMarker.setContent(content);
            cricleMarker.setOffset(new AMap.Pixel(-60, -60));
            markers.push(cricleMarker); //放入markers数组

            //获取点坐标集合
            var lngXY = [model[i].lng, model[i].lat];
            lngXYs.push(lngXY);
        }
        var centerPoint = map.calculateCenter(lngXYs); //获取中心点
        mapView.setCenter(centerPoint);

        return markers;
    }


    /**
      * 设置多个marker的点击事件 用于所以层次回调。
      * @param options
      */
    map.clickMarker = function (options, callback) {
        var Markers = options.markers;
        $.each(Markers, function (index, item) {
            item.on('click', function () {
                callback(this);
            });
        });
    }

    /**
        重新刷新根据等级绘制marker.并设定事件。
    */

    map.refreshMarker = function (data, callback) {
        mapView.clearMap();
        var markers = map.showMarkerByLevel({ level: data.level, model: data });
       
        mapView.setCenter([markers[0].getPosition().lng, markers[0].getPosition().lat]);
        map.clickMarker({ markers: markers }, function (marker) {
            callback(marker);
        });
    }

    /**
     * 根据缩放的不同等级比例展示不同层级的markers。
     * @param options 包括。需要监听的容器map.
     * @param callback 回调事件
     */
    map.scaleMapView = function (callback) {
        clickListener = AMap.event.addListener(mapView, "zoomchange", function () {
            mapView.clearMap();
            callback(mapView.getZoom());
        });
    }

    /**
        * 显示单个点。
        * @param lat 经度 lng 纬度 content 点的样式内容  lable文本内容. 可选参数 zoom 显示图层等级
        */
    map.showPoint = function (obj) {
        var lng = obj.lng; //经纬度
        var lat = obj.lat;
        var content = obj.content; //marker 样式
        var zoom = obj.zoom;
        var marker = new AMap.Marker({
            icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            position: [lng, lat],
            content: content,
        });
        mapView.setZoom(zoom);
        marker.setMap(mapView);
        mapView.setCenter([lng, lat]);

        return marker;
    }

    /**
     * 显示线
     * @param array
     * @param mapView
     * @returns {AMap.Polyline}
     */
    map.showLine = function (array) {
        var points = $.isArray(array) ? array : null; //获取点数组。
        if (point == null) {
            return;
        }
        var paths = [];

        for (var i = 0; i < points.length; ++i) {
            var path = [];
            path[0] = points[i].lng;
            path[1] = points[i].lat;
            paths.push(path);
        }
        // 绘制初始路径

        mapView.plugin("AMap.DragRoute", function () {
            var route = new AMap.DragRoute(mapView, paths, AMap.DrivingPolicy.LEAST_FEE); //构造拖拽导航类
            route.search(); //查询导航路径并开启拖拽导航
        });
    }

    /**
     * 显示区域面积
     * @param array
     * @param style 为对象包含如下参数 strokeColor:线颜色, strokeOpacity:线透明度, strokeWeight:线宽, fillColor:填充色, fillOpacity:填充透明度
     *  
     */
    map.showArea = function (array, style) {
        var points = $.isArray(array) ? array : null; //获取点数组。
        var strokeColor = style.strokeColor;
        var strokeOpacity = style.strokeOpacity;
        var strokeWeight = style.strokeWeight;
        var fillColor = style.fillColor;
        var fillOpacity = style.fillOpacity;
        if (point == null) {
            return;
        }
        var polygonArr = new Array();//多边形覆盖物节点坐标数组
        for (var i = 0; i < points.length; ++i) {
            var path = [];
            path[0] = points[i].lng;
            path[1] = points[i].lat;
            polygonArr.push(path);

        }
        var polygon = new AMap.Polygon({
            path: polygonArr,//设置多边形边界路径
            strokeColor: strokeColor || "#FF33FF", //线颜色
            strokeOpacity: strokeOpacity || 0.2, //线透明度
            strokeWeight: strokeWeight || 3,    //线宽
            fillColor: fillColor || "#1791fc", //填充色
            fillOpacity: fillOpacity || 0.35//填充透明度
        });
        polygon.setMap(mapView);

    }


    /**
     * 鼠标绘制画出展示图
     * @param options jsonarray.json字符串。
     * @param type 类型。用于区分。地图显示 点。 线。 面。
     */
    map.drawLineByOptions = function (options, type, callback) {
        var mapView = options.mapView;

        if (type == 0) { //展现点
            var mouseTool = new AMap.MouseTool(mapView);

            var drawMarker = mouseTool.marker(); //用鼠标工具
            markerListener = AMap.event.addListener(mouseTool, 'draw', function (e) { //添加事件
                callback(e.obj.getPosition());//获取经纬度
            });
        } else if (type == 1) { //画线
            var mouseTool = new AMap.MouseTool(mapView);

            var drawPolyline = mouseTool.polyline(); //用鼠标工具
            polylineListener = AMap.event.addListener(mouseTool, 'draw', function (e) { //添加事件
                callback(e.obj.getPath());//获取路径
            });

        } else if (type == 2) {//画多边形 面
            var mouseTool = new AMap.MouseTool(mapView);

            var drawPolygon = mouseTool.polygon(); //
            polygonListener = AMap.event.addListener(mouseTool, 'draw', function (e) { //添加事件
                callback(e.obj.getPath());//获取路径
            });

        }

    }


    /**
     * 通过经纬度获取地址
     * @param lng
     * @param lag
     * @constructor
     */
    map.parseAddressByLng = function (lng, lag, callBack) {
        var lnglatXY = [lng, lag];
        var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
        });
        geocoder.getAddress(lnglatXY, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
                console.log(result);
                callBack(result.regeocode);
            }
        });
    }

    /**
     *  通过地址解析经纬度
     * @param address
     */
    map.parseLngByAddress = function (address, callback) {
        var geocoder = new AMap.Geocoder({
            city: "", //城市，默认：“全国”
            radius: 1000 //范围，默认：500
        });

        geocoder.getLocation(address, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
                console.log(result.geocodes[0]);
                callback(result.geocodes[0]);
            }
        });
    }

    /**
     *
     * @param Str 根据传过来的字符串。进行搜索。若要显示点。则取一条。否则显示多条。画出区域。
     * @constructor
     */
    map.poi = function (Str) {

    }

    /**
     * 拖拽纠错 根据生成的marker。移动该marker.获取更准确的地理位置。并返回一个新的marker.
     */
    map.changeLng = function (marker, callback) {
        marker.setDraggable(true);
        marker.setCursor('move');
        marker.setMap(mapView);
        marker.on('dragend', function () {
            map.ParseAddressByLng(marker.getPosition().lng, marker.getPosition().lat, function (result) {
                callback(result, marker.getPosition());
            })
        });
    }


    /*
     *行政区域显示
     */

    map.districtSearch = function (level) {
        AMap.service('AMap.DistrictSearch', function () {
            var opts = {
                subdistrict: 1,   //返回下一级行政区
                extensions: 'all',  //返回行政区边界坐标组等具体信息
                level: 'city'  //查询行政级别为 市
            };
            //实例化DistrictSearch
            district = new AMap.DistrictSearch(opts);
            district.setLevel('district');


            //行政区查询
            district.search(level, function (status, result) {
                var bounds = result.districtList[0].boundaries;
                var polygons = [];
                if (bounds) {
                    for (var i = 0, l = bounds.length; i < l; i++) {
                        //生成行政区划polygon
                        var polygon = new AMap.Polygon({
                            map: mapView,
                            strokeWeight: 1,
                            path: bounds[i],
                            fillOpacity: 0.7,
                            fillColor: '',
                            strokeColor: '#ff0000'
                        });
                        polygons.push(polygon);
                    }
                }
            });
        });
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

        return new AMap.LngLat(Lng * 180 / Math.PI, Lat * 180 / Math.PI);
    };

    /**
       移动地图。可以获取当前处于中心点的城市信息
    */

    map.moveMapViewGetCenterPoint = function (options, callback) {
        mapView.on('moveend', function (data) {
            if (data['province'] && typeof data['province'] === 'string') {
                callback(data['city'] || data['province']);
            }
        })
    }

    return map;
});
