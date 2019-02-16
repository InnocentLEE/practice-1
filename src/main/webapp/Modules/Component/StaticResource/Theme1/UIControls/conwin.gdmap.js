define(['jquery', 'helper', 'metronic', 'mapUI'], function ($, h, Metronic) {
    var map = {};
    var busImg = "http://oaf5v9at6.bkt.clouddn.com/bus.png";

    /**
     * 初始化展示地图容器
     * 默认添加了工具尺。缩放尺等控件
     */
    var clickListener;
    map.infoWindow;


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
        });

        //mapView.setFeatures(['bg', 'point']);
        //mapView.addControl(scale);
        //mapView.addControl(toolBar);
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
                    content += '<div class="cricletype3">';
                    content += model[i].content;
                    content += '</div>';
                } else if (model[i].type == 4) {
                    content += '<div class="cricletype4">';
                    content += model[i].content;
                    content += '</div>';
                } else if (model[i].type == 5) {
                    if (h.BrowserVersion.browser == "IE" && h.BrowserVersion.version == 8) {
                        content += '<div class="cricletype5">';
                        content += model[i].content;
                        content += '</div>';
                    } else {
                        content += '<div class="cricleDot1"><div class="cricleDot2"><div class="cricleDot3">';
                        content += model[i].content;
                        content += '</div></div></div>';
                    }

                }
            }
            cricleMarker.setContent(content);
            cricleMarker.setOffset(new AMap.Pixel(-60, -60));
            markers.push(cricleMarker); //放入markers数组

            //获取点坐标集合
            var lngXY = [model[i].lng, model[i].lat];
            lngXYs.push(lngXY);

        }
        if (level == 'country' || level == 'town') {
            var lng = markers[0].getPosition().lng;
            var lat = markers[0].getPosition().lat;
            mapView.setCenter([lng, lat]);
        } else {
            var centerPoint = map.calculateCenter(lngXYs); //获取中心点
            mapView.setCenter(centerPoint);
        }
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
        var markers = map.showMarkerByLevel({ level: data.level, model: data });

        $.each(markers, function (index, item) {
            if (!data.flag) {
                item.hide();
            }
            /*  item.on('mouseover', function () {
             item.setOffset(new AMap.Pixel(-80, -80));
             });
             item.on('mouseout', function () {
             item.setOffset(new AMap.Pixel(-60, -60));
             })*/

            item.setExtData("shida");
            item.setTop(true);
        });
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
            if (mapView.getZoom() <= 15) {
                mapView.clearMap();
            }
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
        //mapView.setCenter([lng, lat]);

        return marker;
    }


    /**
     * 显示线
     * @param array
     * @param mapView
     * @returns {AMap.Polyline}
     */
    map.showLine = function (array, callback) {

        var points = $.isArray(array) ? array : null; //获取点数组。
        if (points == null) {
            return;
        }
        var paths = [];

        for (var i = 0; i < points.length; ++i) {
            var path = [];
            path[0] = points[i].lng;
            path[1] = points[i].lat;
            paths.push(path);
        }
        var driving = new AMap.Driving({
            map: mapView
        });
        var wayPoint = [];
        for (var j = 1; j < paths.length - 1; j++) {
            wayPoint.push(new AMap.LngLat(paths[j][0], paths[j][1]));
        }
        driving.search(new AMap.LngLat(paths[0][0], paths[0][1]), new AMap.LngLat(paths[paths.length - 1][0], paths[paths.length - 1][1]), { waypoints: wayPoint }, function (s, r) {
            var steps = r.routes[0].steps;
            var waypoint = [];
            $.each(steps, function (index, item) {
                var path = item.path;
                for (var k = 0; k < path.length - 1; k++) {
                    var lng = path[k].lng;
                    var lat = path[k].lat;
                    waypoint.push(new AMap.LngLat(lng, lat));
                }
            })

            if (typeof callback == 'function' && callback != undefined) {
                callback(driving, waypoint);
            }

        });

    }


    /**
     * 单条车辆线路
     * @param obj
     * @param callback
     */
    map.showCarLineOrCunRoad = function (obj,callback) {
      //  console.log("start："+ new Date().toLocaleString());
        var waypointResult = []; //返回来的途经点集合
        var wayPoint = [];
        var waypoint = obj.waypoint;
        var chepailist = obj.chepailist;
        var linename = obj.linename;
        var lineType = obj.linetype;
        var type = obj.type;
        var roadname = obj.roadname;
        var infowindowcontent = obj.content;
        var roadid = obj.roadid;
        $.each(waypoint, function (n, v) {
            wayPoint.push(new AMap.LngLat(v.lng, v.lat));
        })
        var driving = new AMap.Driving({
            autoFitView: false,
            showTraffic: false,
            policy: AMap.DrivingPolicy.LEAST_DISTANCE,
            hideMarkers: true
        });
       // console.log("searchstart：" + new Date().toLocaleString());
        driving.search(new AMap.LngLat(obj.startlng, obj.startlat), new AMap.LngLat(obj.endlng, obj.endlat), { waypoints: wayPoint }, function (s, r) {
            var steps = r.routes[0].steps;
            $.each(steps, function (index, item) {
                var path = item.path;
                for (var k = 0; k < path.length - 1; k++) {
                    var lng = path[k].lng;
                    var lat = path[k].lat;
                    waypointResult.push([lng, lat]);
                }
                
            })
            //console.log(waypointResult);
           // console.log("查找途经点：" + new Date().toLocaleString());
            if (chepailist != null) {//如果有数组车辆信息
                if (lineType == 1) {
                    var color = "#ff0000";
                } else if (lineType == 0) {
                    var color = "#1D83FF";
                }
                map.showLinePathSimplifier(waypointResult, linename, color);
                var avgPoint = getCarShowPoint(chepailist);
                $.each(chepailist, function (n, v) {
                    if (n == 0) {
                        var carMarker = createMarker(waypointResult[parseInt(avgPoint)]);
                    } else if (n == 1) {
                        var carMarker = createMarker(waypointResult[parseInt(avgPoint * 2)]);
                    } else {
                        var carMarker = createMarker(waypointResult[parseInt(avgPoint * (n + 1))]);
                    }
                    var content = "<div><div class='amap-marker-label'>" + v + "</div><img style='height: 25px; width:40px; margin-top: 20px; margin-left :15px;'  src=' " + busImg + "'/></div>";
                    carMarker.setContent(content)
                    carMarker.setExtData("car");

                    carMarker.setMap(mapView);
                })
               // console.log("生成图标：" + new Date().toLocaleString());
                var lineMarker = createMarker(waypointResult[parseInt((waypointResult.length - 1) / 2)]);
                var content = "<div class='amap-marker-label'>" + linename + "</div>";
                lineMarker.setContent(content);
                lineMarker.setExtData("car");
                lineMarker.setMap(mapView);
            }

            //console.log("开始画村道：" + new Date().toLocaleString());
            if (type != null && roadname != null) { //表示勾画的是村道。
                if (type == 1) {
                    var color = "#ff0000";
                } else if (type == 0) {
                    var color = "#1D83FF";
                }
                map.showLinePathSimplifier(waypointResult, roadname, color);
                var roadMarker = createMarker(waypointResult[parseInt((waypointResult.length - 1) / 2)]);
                var content = "<div class='amap-marker-label'>" + roadname + "</div>";
                roadMarker.setContent(content);
                roadMarker.setExtData("cun");
                if (type == 1) {
               	   map.createInfoWindow(roadMarker, infowindowcontent);
               	   
               	   roadMarker.on('click',function(e){
               	   	 if (typeof callback == 'function' && callback != undefined) {
               	   	  callback(roadid);
               	   	}
               	   });
                }
                roadMarker.setMap(mapView);
             // console.log("村道画完：" + new Date().toLocaleString());
            }

            //console.log("searchend：" + new Date().toLocaleString());
        });



        function getCarShowPoint(chepailist) {
            return waypointResult.length / (chepailist.length + 1);
        }

        function createMarker(LngLat) {//线路名marker
            return new AMap.Marker({
                position: LngLat
            });
        }

        return driving;
    }


    /**
     * 显示多条线路车辆
     * @param array
     * @param callback
     */
    map.showCarLines = function (array,callback) {
        var drivings = [];
        $.each(array, function (index, item) {
            var driving = map.showCarLineOrCunRoad(item,function(id){
            	 if (typeof callback == 'function' && callback != undefined) {
            	callback(id);
            }
            });
            drivings.push(driving);
        })
 		
        return drivings;
    }


    /**
     * 显示区域
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
              //  console.log(result);
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
              //  console.log(result.geocodes[0]);
                callback(result.geocodes[0]);
            }
        });
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

    map.districtSearch = function (level, fillColor, strokeColor, callback) {
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
                mapView.setCenter([result.districtList[0].center.lng, result.districtList[0].center.lat]);

                var polygons = [];
                if (bounds) {
                    for (var i = 0, l = bounds.length; i < l; i++) {
                        //生成行政区划polygon
                        var polygon = new AMap.Polygon({
                            map: mapView,
                            strokeWeight: 1.5,
                            path: bounds[i],
                            fillOpacity: 1,
                            fillColor: fillColor,
                            strokeColor: strokeColor || "#000",
                        });
                        polygons.push(polygon);

                        polygon.on('click', function (e) {
                          //  console.log(e);
                        });
                    }
                }
                if (typeof callback == 'function' && callback != undefined) {

                    callback();
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

    //勾画多级层区域
    map.drawDistric = function (arr, adcode, callback) {
        var markers = [];
        for (var i = 0; i < arr.length; i++) {
            var lng = arr[i].lng;
            var lat = arr[i].lat;
            var content = arr[i].content;
            var marker = showMarker(lng, lat, content);
            markers.push(marker);
        }
        ;
        map.districtExplorer(adcode, arr);

        map.clickMarker({ markers: markers }, function (marker) {
            callback(marker);
        });

        function showMarker(lng, lat, content) {
            var obj = { lng: lng, lat: lat, content: content };
            return map.showPoint(obj);
        }
    }


    /**
     * 显示勾画出来的村点的marker
     * @param lng
     * @param lat
     * @param content
     */
    map.showCunMarker = function (arr) {
        var markers = [];

        for (var i = 0; i < arr.length; i++) {
            var cunname = arr[i].cunname;
            var color = arr[i].color;
            var lng = arr[i].lng;
            var lat = arr[i].lat;
            var content = '<div style="width:20px; height: 20px;border-radius: 50% !important; background:' + color + ';"></div>';
            var obj = { lng: lng, lat: lat, content: content };
            var marker = map.showPoint(obj);
            marker.setExtData("shida");
            markers.push(marker);
        }

        return markers;

    }

    map.showLinePathSimplifier = function (arr, name, color) {
        //console.log("drawstart：" + new Date().toLocaleString());

        //加载PathSimplifier，loadUI的路径参数为模块名中 'ui/' 之后的部分
        AMapUI.load(['ui/misc/PathSimplifier'], function (PathSimplifier) {

            if (!PathSimplifier.supportCanvas) {
                alert('当前环境不支持 Canvas！');
                return;
            }
            var zindex = 100;
            if (color == '#ff0000') {
                zindex = 101;
            }
            var pathSimplifierIns = new PathSimplifier({
                zIndex: zindex,
                autoSetFitView: false,
                map: mapView, //所属的地图实例
                eventSupport: true,
                getPath: function (pathData, pathIndex) {

                    return pathData.path;
                },
                getHoverTitle: function (pathData, pathIndex, pointIndex) {

                    if (pointIndex >= 0) {
                        //point
                        return pathData.name; //+ '，点：' + pointIndex + '/' + pathData.path.length
                    }

                    return pathData.name;//+ '，点数量' + pathData.path.length
                },
                renderOptions: {
                    pathLineStyle: {
                        dirArrowStyle: true
                    },

                    getPathStyle: function (pathItem, zoom) {

                        var lineWidth = Math.round(3 * Math.pow(1.1, zoom - 3));
                        return {
                            pathLineStyle: {
                                strokeStyle: color,
                                lineWidth: lineWidth
                            },
                            pathLineSelectedStyle: {
                                strokeStyle: color,
                                lineWidth: lineWidth + 1
                            },
                            pathLineHoverStyle: {
                                strokeStyle: color,
                                lineWidth: lineWidth
                            }
                        };
                    }
                }
            });


            pathSimplifierIns.setData([{
                name: name,
                path: arr
            }]);

            function onload() {
                pathSimplifierIns.renderLater();
            }

            function onerror(e) {
                alert('图片加载失败！');
            }
           // console.log("drawend：" + new Date().toLocaleString());
        });
    }
    map.districtExplorer = function (adcode, arr) {
        //加载DistrictExplorer，loadUI的路径参数为模块名中 'ui/' 之后的部分
        AMapUI.loadUI(['geo/DistrictExplorer'], function (DistrictExplorer) {
            Metronic.blockUI({ animate: true });
            //创建一个实例
            var districtExplorer = new DistrictExplorer({
                eventSupport: true,
                map: mapView //关联的地图实例
            });


            districtExplorer.loadAreaNode(adcode, function (error, areaNode) { //全国的市划编码
                Metronic.unblockUI();

                //console.log(areaNode);
                if (areaNode == undefined) {
                    alert('当前环境不支持该层级！');
                    return;
                } else {
                    //清除已有的绘制内容
                    districtExplorer.clearFeaturePolygons();

                    //just some colors

                    //绘制父区域
                    districtExplorer.renderParentFeature(areaNode, {
                        cursor: 'default',
                        bubble: true,
                        strokeColor: 'black', //线颜色
                        strokeOpacity: 1, //线透明度
                        strokeWeight: 1, //线宽
                        fillColor: null, //填充色
                        fillOpacity: 0.35, //填充透明度
                    });

                    //绘制子级区划
                    districtExplorer.renderSubFeatures(areaNode, function (feature, i) {
                        //console.log(feature.properties.name);
                        var name = feature.properties.name;
                        if (name.lastIndexOf('区') || name.lastIndexOf('县') || name.lastIndexOf('市')) {
                            name = name.substring(0, name.length - 1);
                        }
                        var fillColor = '';
                        $.each(arr, function (index, item) {
                            if (item.city == name) {
                                fillColor = item.color;
                            }
                        })


                        return {
                            cursor: 'default',
                            bubble: true,
                            strokeColor: 'black', //线颜色
                            strokeOpacity: 1, //线透明度
                            strokeWeight: 1, //线宽
                            fillColor: fillColor, //填充色
                            fillOpacity: 1, //填充透明度
                        };
                    });

                    //监听鼠标在feature上滑动
                    districtExplorer.on('featureMousemove', function (e, feature) {
                        //更新提示位置
                        //tipMarker.setPosition(e.originalEvent.lnglat);
                    });

                    //feature被点击
                    districtExplorer.on('featureClick', function (e, feature) {

                        //console.log('点击: ' + feature.properties);

                    });
                    //更新地图视野
                    // mapView.setFitView(districtExplorer.getAllFeaturePolygons());
                }

            });
        });
    }

    /**
        创建信息窗体
    */
    map.createInfoWindow = function (marker, content) {
        if(mapView.getZoom()>=11){
            infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -20),closeWhenClickMap:true});
            map.infoWindow = infoWindow;             
            marker.on('mouseover', function (e) {
                marker.content = content;
                infoWindow.setContent(e.target.content);
                infoWindow.open(mapView, e.target.getPosition());
            }).on('mouseout',function(e){
                map.infoWindow.close();
            })
        }
        return map.infoWindow;
    }

    return map;
});