package com.lyq.project.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class KeCheListDto {
    @JsonProperty
    private String Id;
    @JsonProperty
    private String CarNum;
    @JsonProperty
    private String CarType;
    @JsonProperty
    private String UnitName;
    @JsonProperty
    private String Status;
    @JsonProperty
    private String PermitNum;

    public KeCheListDto() {
    }

    public KeCheListDto(String id, String carNum, String carType, String unitName, String status, String permitNum) {
        Id = id;
        CarNum = carNum;
        CarType = carType;
        UnitName = unitName;
        Status = status;
        PermitNum = permitNum;
    }

    @Override
    public String toString() {
        return "KeCheListDto{" +
                "Id='" + Id + '\'' +
                ", CarNum='" + CarNum + '\'' +
                ", CarType='" + CarType + '\'' +
                ", UnitName='" + UnitName + '\'' +
                ", Status='" + Status + '\'' +
                ", PermitNum='" + PermitNum + '\'' +
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
    public String getStatus() {
        return Status;
    }
    @JsonIgnore
    public void setStatus(String status) {
        Status = status;
    }
    @JsonIgnore
    public String getPermitNum() {
        return PermitNum;
    }
    @JsonIgnore
    public void setPermitNum(String permitNum) {
        PermitNum = permitNum;
    }
}
