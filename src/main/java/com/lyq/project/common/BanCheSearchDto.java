package com.lyq.project.common;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class BanCheSearchDto {

    @JsonProperty
    private String Car;
    @JsonProperty
    private String UnitId;

    public BanCheSearchDto() {
    }

    public BanCheSearchDto(String car, String unitId) {
        Car = car;
        UnitId = unitId;
    }

    @Override
    public String toString() {
        return "BanCheSearchDto{" +
                "Car='" + Car + '\'' +
                ", UnitId='" + UnitId + '\'' +
                '}';
    }
    @JsonIgnore
    public String getCar() {
        return Car;
    }
    @JsonIgnore
    public void setCar(String car) {
        Car = car;
    }
    @JsonIgnore
    public String getUnitId() {
        return UnitId;
    }
    @JsonIgnore
    public void setUnitId(String unitId) {
        UnitId = unitId;
    }
}
