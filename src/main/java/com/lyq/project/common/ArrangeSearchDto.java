package com.lyq.project.common;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ArrangeSearchDto {
    @JsonProperty
    private String Num;
    @JsonProperty
    private String ArrangeType;
    @JsonProperty
    private String Route;
    @JsonProperty
    private String Car;
    @JsonProperty
    private String UnitId;

    public ArrangeSearchDto() {
    }

    public ArrangeSearchDto(String num, String arrangeType, String route, String car, String unitId) {
        Num = num;
        ArrangeType = arrangeType;
        Route = route;
        Car = car;
        UnitId = unitId;
    }

    @Override
    public String toString() {
        return "ArrangeSearchDto{" +
                "Num='" + Num + '\'' +
                ", ArrangeType='" + ArrangeType + '\'' +
                ", Route='" + Route + '\'' +
                ", Car='" + Car + '\'' +
                ", UnitId='" + UnitId + '\'' +
                '}';
    }
    @JsonIgnore
    public String getNum() {
        return Num;
    }
    @JsonIgnore
    public void setNum(String num) {
        Num = num;
    }
    @JsonIgnore
    public String getArrangeType() {
        return ArrangeType;
    }
    @JsonIgnore
    public void setArrangeType(String arrangeType) {
        ArrangeType = arrangeType;
    }
    @JsonIgnore
    public String getRoute() {
        return Route;
    }
    @JsonIgnore
    public void setRoute(String route) {
        Route = route;
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
