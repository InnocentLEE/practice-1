package com.lyq.project.common;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class RouteSearchDto {
    @JsonProperty
    private String UnitId;
    @JsonProperty
    private String RouteName;
    @JsonProperty
    private String StartStation;
    @JsonProperty
    private String EndStation;

    public RouteSearchDto() {
    }

    public RouteSearchDto(String unitId, String routeName, String startStation, String endStation) {
        UnitId = unitId;
        RouteName = routeName;
        StartStation = startStation;
        EndStation = endStation;
    }

    @Override
    public String toString() {
        return "RouteSearchDto{" +
                "UnitId='" + UnitId + '\'' +
                ", RouteName='" + RouteName + '\'' +
                ", StartStation='" + StartStation + '\'' +
                ", EndStation='" + EndStation + '\'' +
                '}';
    }
    @JsonIgnore
    public String getUnitId() {
        return UnitId;
    }
    @JsonIgnore
    public void setUnitId(String unitId) {
        UnitId = unitId;
    }
    @JsonIgnore
    public String getRouteName() {
        return RouteName;
    }
    @JsonIgnore
    public void setRouteName(String routeName) {
        RouteName = routeName;
    }
    @JsonIgnore
    public String getStartStation() {
        return StartStation;
    }
    @JsonIgnore
    public void setStartStation(String startStation) {
        StartStation = startStation;
    }
    @JsonIgnore
    public String getEndStation() {
        return EndStation;
    }
    @JsonIgnore
    public void setEndStation(String endStation) {
        EndStation = endStation;
    }
}
