package com.lyq.project.common;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ShengJiJianGuanBuMenSearchDto {
    @JsonProperty
    private String UnitName;
    @JsonProperty
    private String Province;

    public ShengJiJianGuanBuMenSearchDto() {
    }

    public ShengJiJianGuanBuMenSearchDto(String unitName, String province) {
        UnitName = unitName;
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
    public String getProvince() {
        return Province;
    }
    @JsonIgnore
    public void setProvince(String province) {
        Province = province;
    }

    @Override
    public String toString() {
        return "ShengJiJianGuanBuMenSearchDto{" +
                "UnitName='" + UnitName + '\'' +
                ", Province='" + Province + '\'' +
                '}';
    }
}
