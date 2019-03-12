package com.lyq.project.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class CreateRouteDto {
    @JsonProperty
    private String UnitId;
    @JsonProperty
    private String RouteName;
    @JsonProperty
    private String TotalTime;
    @JsonProperty
    private String StartStation;
    @JsonProperty
    private String EndStation;
    @JsonProperty
    private String Station1;
    @JsonProperty
    private String Station2;
    @JsonProperty
    private String Station3;
    @JsonProperty
    private String Station4;
    @JsonProperty
    private String Station5;
    @JsonProperty
    private String Station6;
    @JsonProperty
    private String Station7;
    @JsonProperty
    private String Station8;

    public CreateRouteDto() {
    }

    public CreateRouteDto(String unitId, String routeName, String totalTime, String startStation, String endStation, String station1, String station2, String station3, String station4, String station5, String station6, String station7, String station8) {
        UnitId = unitId;
        RouteName = routeName;
        TotalTime = totalTime;
        StartStation = startStation;
        EndStation = endStation;
        Station1 = station1;
        Station2 = station2;
        Station3 = station3;
        Station4 = station4;
        Station5 = station5;
        Station6 = station6;
        Station7 = station7;
        Station8 = station8;
    }

    @Override
    public String toString() {
        return "CreateRouteDto{" +
                "UnitId='" + UnitId + '\'' +
                ", RouteName='" + RouteName + '\'' +
                ", TotalTime='" + TotalTime + '\'' +
                ", StartStation='" + StartStation + '\'' +
                ", EndStation='" + EndStation + '\'' +
                ", Station1='" + Station1 + '\'' +
                ", Station2='" + Station2 + '\'' +
                ", Station3='" + Station3 + '\'' +
                ", Station4='" + Station4 + '\'' +
                ", Station5='" + Station5 + '\'' +
                ", Station6='" + Station6 + '\'' +
                ", Station7='" + Station7 + '\'' +
                ", Station8='" + Station8 + '\'' +
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
    public String getTotalTime() {
        return TotalTime;
    }
    @JsonIgnore
    public void setTotalTime(String totalTime) {
        TotalTime = totalTime;
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
    @JsonIgnore
    public String getStation1() {
        return Station1;
    }
    @JsonIgnore
    public void setStation1(String station1) {
        Station1 = station1;
    }
    @JsonIgnore
    public String getStation2() {
        return Station2;
    }
    @JsonIgnore
    public void setStation2(String station2) {
        Station2 = station2;
    }
    @JsonIgnore
    public String getStation3() {
        return Station3;
    }
    @JsonIgnore
    public void setStation3(String station3) {
        Station3 = station3;
    }
    @JsonIgnore
    public String getStation4() {
        return Station4;
    }
    @JsonIgnore
    public void setStation4(String station4) {
        Station4 = station4;
    }
    @JsonIgnore
    public String getStation5() {
        return Station5;
    }
    @JsonIgnore
    public void setStation5(String station5) {
        Station5 = station5;
    }
    @JsonIgnore
    public String getStation6() {
        return Station6;
    }
    @JsonIgnore
    public void setStation6(String station6) {
        Station6 = station6;
    }
    @JsonIgnore
    public String getStation7() {
        return Station7;
    }
    @JsonIgnore
    public void setStation7(String station7) {
        Station7 = station7;
    }
    @JsonIgnore
    public String getStation8() {
        return Station8;
    }
    @JsonIgnore
    public void setStation8(String station8) {
        Station8 = station8;
    }
}
