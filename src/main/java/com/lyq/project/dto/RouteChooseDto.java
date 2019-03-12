package com.lyq.project.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class RouteChooseDto {
    @JsonProperty
    private String RouteName;
    @JsonProperty
    private String Id;
    @JsonProperty
    private String TotalTime;
    @JsonProperty
    private String Item;

    public RouteChooseDto() {
    }

    public RouteChooseDto(String routeName, String id, String totalTime, String item) {
        RouteName = routeName;
        Id = id;
        TotalTime = totalTime;
        Item = item;
    }

    @Override
    public String toString() {
        return "RouteChooseDto{" +
                "RouteName='" + RouteName + '\'' +
                ", Id='" + Id + '\'' +
                ", TotalTime='" + TotalTime + '\'' +
                ", Item='" + Item + '\'' +
                '}';
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
    public String getId() {
        return Id;
    }
    @JsonIgnore
    public void setId(String id) {
        Id = id;
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
    public String getItem() {
        return Item;
    }
    @JsonIgnore
    public void setItem(String item) {
        Item = item;
    }
}
