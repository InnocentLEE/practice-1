package com.lyq.project.common;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class KeCheSearchDto {
    @JsonProperty
    private String CarNum;
    @JsonProperty
    private String CarType;
    @JsonProperty
    private String Status;
    @JsonProperty
    private String OrgType;
    @JsonProperty
    private String UnitId;

    public KeCheSearchDto() {
    }

    public KeCheSearchDto(String carNum, String carType, String status, String orgType, String unitId) {
        CarNum = carNum;
        CarType = carType;
        Status = status;
        OrgType = orgType;
        UnitId = unitId;
    }

    @Override
    public String toString() {
        return "KeCheSearchDto{" +
                "CarNum='" + CarNum + '\'' +
                ", CarType='" + CarType + '\'' +
                ", Status='" + Status + '\'' +
                ", OrgType='" + OrgType + '\'' +
                ", UnitId='" + UnitId + '\'' +
                '}';
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
    public String getStatus() {
        return Status;
    }
    @JsonIgnore
    public void setStatus(String status) {
        Status = status;
    }
    @JsonIgnore
    public String getOrgType() {
        return OrgType;
    }
    @JsonIgnore
    public void setOrgType(String orgType) {
        OrgType = orgType;
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
