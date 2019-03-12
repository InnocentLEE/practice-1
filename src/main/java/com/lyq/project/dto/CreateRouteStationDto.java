package com.lyq.project.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class CreateRouteStationDto {
    @JsonProperty
    private String UnitId;
    @JsonProperty
    private String StationName;

    public CreateRouteStationDto() {
    }

    public CreateRouteStationDto(String unitId, String stationName) {
        UnitId = unitId;
        StationName = stationName;
    }

    @Override
    public String toString() {
        return "CreateRouteStationDto{" +
                "UnitId='" + UnitId + '\'' +
                ", StationName='" + StationName + '\'' +
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
    public String getStationName() {
        return StationName;
    }
    @JsonIgnore
    public void setStationName(String stationName) {
        StationName = stationName;
    }
}
