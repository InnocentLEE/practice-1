package com.lyq.project.common;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ShiJiJianGuanBuMenSearchDto {
    @JsonProperty
    private String UnitName;
    @JsonProperty
    private String City;

    public ShiJiJianGuanBuMenSearchDto() {
    }
    public ShiJiJianGuanBuMenSearchDto(String unitName, String city) {
        UnitName = unitName;
        City = city;
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
    public String getCity() {
        return City;
    }
    @JsonIgnore
    public void setCity(String city) {
        City = city;
    }

    @Override
    public String toString() {
        return "ShiJiJianGuanBuMenSearchDto{" +
                "UnitName='" + UnitName + '\'' +
                ", City='" + City + '\'' +
                '}';
    }
}
