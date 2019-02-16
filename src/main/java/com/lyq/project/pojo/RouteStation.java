package com.lyq.project.pojo;

public class RouteStation {
    private String id;

    private String beginId;

    private String endId;

    private String routeId;

    private String stationId;

    private String stationName;

    private Integer num;

    public RouteStation(String id, String beginId, String endId, String routeId, String stationId, String stationName, Integer num) {
        this.id = id;
        this.beginId = beginId;
        this.endId = endId;
        this.routeId = routeId;
        this.stationId = stationId;
        this.stationName = stationName;
        this.num = num;
    }

    public RouteStation() {
        super();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getBeginId() {
        return beginId;
    }

    public void setBeginId(String beginId) {
        this.beginId = beginId == null ? null : beginId.trim();
    }

    public String getEndId() {
        return endId;
    }

    public void setEndId(String endId) {
        this.endId = endId == null ? null : endId.trim();
    }

    public String getRouteId() {
        return routeId;
    }

    public void setRouteId(String routeId) {
        this.routeId = routeId == null ? null : routeId.trim();
    }

    public String getStationId() {
        return stationId;
    }

    public void setStationId(String stationId) {
        this.stationId = stationId == null ? null : stationId.trim();
    }

    public String getStationName() {
        return stationName;
    }

    public void setStationName(String stationName) {
        this.stationName = stationName == null ? null : stationName.trim();
    }

    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }
}