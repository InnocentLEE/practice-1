package com.lyq.project.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class RouteListDto {
    @JsonProperty
    private String Id;
    @JsonProperty
    private String RouteName;
    @JsonProperty
    private String StartStationId;
    @JsonProperty
    private String StartStation;
    @JsonProperty
    private String EndStationId;
    @JsonProperty
    private String EndStation;
    @JsonProperty
    private Integer Status;
    @JsonProperty
    private String TotalTime;
    @JsonProperty
    private String Station;

    public RouteListDto() {
    }

    public RouteListDto(String id, String routeName, String startStationId, String startStation, String endStationId, String endStation, Integer status, String totalTime, String station) {
        Id = id;
        RouteName = routeName;
        StartStationId = startStationId;
        StartStation = startStation;
        EndStationId = endStationId;
        EndStation = endStation;
        Status = status;
        TotalTime = totalTime;
        Station = station;
    }

    @Override
    public String toString() {
        return "RouteListDto{" +
                "Id='" + Id + '\'' +
                ", RouteName='" + RouteName + '\'' +
                ", StartStationId='" + StartStationId + '\'' +
                ", StartStation='" + StartStation + '\'' +
                ", EndStationId='" + EndStationId + '\'' +
                ", EndStation='" + EndStation + '\'' +
                ", Status=" + Status +
                ", TotalTime='" + TotalTime + '\'' +
                ", Station='" + Station + '\'' +
                '}';
    }
    @JsonIgnore
    public String getId() {
        return Id;
    }
    @JsonIgnore
    public void setId(String id) {
        Id = id;
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
    public String getStartStationId() {
        return StartStationId;
    }
    @JsonIgnore
    public void setStartStationId(String startStationId) {
        StartStationId = startStationId;
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
    public String getEndStationId() {
        return EndStationId;
    }
    @JsonIgnore
    public void setEndStationId(String endStationId) {
        EndStationId = endStationId;
    }
    @JsonIgnore
    public String getEndStation() {
        return EndStation;
    }
    @JsonIgnore
    public void setEndStation(String endStation) {
        EndStation = endStation;
    }
    @JsonIgnore
    public Integer getStatus() {
        return Status;
    }
    @JsonIgnore
    public void setStatus(Integer status) {
        Status = status;
    }
    @JsonIgnore
    public String getTotalTime() {
        return TotalTime;
    }
    @JsonIgnore
    public void setTotalTime(String totalTime) {
        TotalTime = totalTime;
    }
    @JsonIgnore
    public String getStation() {
        return Station;
    }
    @JsonIgnore
    public void setStation(String station) {
        Station = station;
    }
}
