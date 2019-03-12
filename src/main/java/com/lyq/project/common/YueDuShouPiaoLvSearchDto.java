package com.lyq.project.common;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class YueDuShouPiaoLvSearchDto {
    @JsonProperty
    private String RouteId;
    @JsonProperty
    private String Year;

    public YueDuShouPiaoLvSearchDto() {
    }

    public YueDuShouPiaoLvSearchDto(String routeId, String year) {
        RouteId = routeId;
        Year = year;
    }
    @JsonIgnore
    public String getRouteId() {
        return RouteId;
    }
    @JsonIgnore
    public void setRouteId(String routeId) {
        RouteId = routeId;
    }
    @JsonIgnore
    public String getYear() {
        return Year;
    }
    @JsonIgnore
    public void setYear(String year) {
        Year = year;
    }
}
