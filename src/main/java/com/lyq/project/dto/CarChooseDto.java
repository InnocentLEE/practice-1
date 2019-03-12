package com.lyq.project.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class CarChooseDto {
    @JsonProperty
    private String Id;
    @JsonProperty
    private String CarNum;
    @JsonProperty
    private String CarType;
    @JsonProperty
    private String UnitName;
    @JsonProperty
    private String Item;
    @JsonProperty
    private Integer SeatNum;

    public CarChooseDto() {
    }

    public CarChooseDto(String id, String carNum, String carType, String unitName, String item, Integer seatNum) {
        Id = id;
        CarNum = carNum;
        CarType = carType;
        UnitName = unitName;
        Item = item;
        SeatNum = seatNum;
    }

    @Override
    public String toString() {
        return "CarChooseDto{" +
                "Id='" + Id + '\'' +
                ", CarNum='" + CarNum + '\'' +
                ", CarType='" + CarType + '\'' +
                ", UnitName='" + UnitName + '\'' +
                ", Item='" + Item + '\'' +
                ", SeatNum=" + SeatNum +
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
    public String getCarNum() {
        return CarNum;
    }
    @JsonIgnore
    public void setCarNum(String carNum) {
        CarNum = carNum;
    }
    @JsonIgnore
    public String getCarType() {
        return CarType;
    }
    @JsonIgnore
    public void setCarType(String carType) {
        CarType = carType;
    }
    @JsonIgnore
    public String getUnitName() {
        return UnitName;
    }
    @JsonIgnore
    public void setUnitName(String unitName) {
        UnitName = unitName;
    }
    @JsonIgnore
    public String getItem() {
        return Item;
    }
    @JsonIgnore
    public void setItem(String item) {
        Item = item;
    }
    @JsonIgnore
    public Integer getSeatNum() {
        return SeatNum;
    }
    @JsonIgnore
    public void setSeatNum(Integer seatNum) {
        SeatNum = seatNum;
    }
}
