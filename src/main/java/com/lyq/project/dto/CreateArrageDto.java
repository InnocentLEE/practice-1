package com.lyq.project.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class CreateArrageDto {

    @JsonProperty
    private String Id;
    @JsonProperty
    private String UnitId;
    @JsonProperty
    private String Num;
    @JsonProperty
    private String ArrangeType;
    @JsonProperty
    private String Route;
    @JsonProperty
    private String Car;
    @JsonProperty
    private String TotalNumber;
    @JsonProperty
    private String Price;
    @JsonProperty
    private String StartDate;
    @JsonProperty
    private String EndDate;

    public CreateArrageDto() {
    }

    public CreateArrageDto(String id, String unitId, String num, String arrangeType, String route, String car, String totalNumber, String price, String startDate, String endDate) {
        Id = id;
        UnitId = unitId;
        Num = num;
        ArrangeType = arrangeType;
        Route = route;
        Car = car;
        TotalNumber = totalNumber;
        Price = price;
        StartDate = startDate;
        EndDate = endDate;
    }

    @Override
    public String toString() {
        return "CreateArrageDto{" +
                "Id='" + Id + '\'' +
                ", UnitId='" + UnitId + '\'' +
                ", Num='" + Num + '\'' +
                ", ArrangeType=" + ArrangeType +
                ", Route='" + Route + '\'' +
                ", Car='" + Car + '\'' +
                ", TotalNumber='" + TotalNumber + '\'' +
                ", Price='" + Price + '\'' +
                ", StartDate='" + StartDate + '\'' +
                ", EndDate='" + EndDate + '\'' +
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
    public String getUnitId() {
        return UnitId;
    }
    @JsonIgnore
    public void setUnitId(String unitId) {
        UnitId = unitId;
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
    public String getTotalNumber() {
        return TotalNumber;
    }
    @JsonIgnore
    public void setTotalNumber(String totalNumber) {
        TotalNumber = totalNumber;
    }
    @JsonIgnore
    public String getPrice() {
        return Price;
    }
    @JsonIgnore
    public void setPrice(String price) {
        Price = price;
    }
    @JsonIgnore
    public String getStartDate() {
        return StartDate;
    }
    @JsonIgnore
    public void setStartDate(String startDate) {
        StartDate = startDate;
    }
    @JsonIgnore
    public String getEndDate() {
        return EndDate;
    }
    @JsonIgnore
    public void setEndDate(String endDate) {
        EndDate = endDate;
    }
}
