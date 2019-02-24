package com.lyq.project.common;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ShiJiJianGuanBuMenSearchDto {
    @JsonProperty
    private String Province;
    @JsonProperty
    private String UnitName;
    @JsonProperty
    private String City;

    public ShiJiJianGuanBuMenSearchDto() {
    }

    public ShiJiJianGuanBuMenSearchDto(String province, String unitName, String city) {
        Province = province;
        UnitName = unitName;
        City = city;
    }
    @JsonIgnore
    public String getProvince() {
        return Province;
    }
    @JsonIgnore
    public void setProvince(String province) {
        Province = province;
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
                "Province='" + Province + '\'' +
                ", UnitName='" + UnitName + '\'' +
                ", City='" + City + '\'' +
                '}';
    }
}
