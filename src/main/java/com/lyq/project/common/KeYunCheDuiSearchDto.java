package com.lyq.project.common;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class KeYunCheDuiSearchDto {

    @JsonProperty
    private String UnitName;
    @JsonProperty
    private String BusinessType;
    @JsonProperty
    private String Province;
    @JsonProperty
    private String City;
    @JsonProperty
    private String ParentUnitId;
    @JsonProperty
    private String OrgType;

    public KeYunCheDuiSearchDto() {
    }

    public KeYunCheDuiSearchDto(String unitName, String businessType, String province, String city, String parentUnitId, String orgType) {
        UnitName = unitName;
        BusinessType = businessType;
        Province = province;
        City = city;
        ParentUnitId = parentUnitId;
        OrgType = orgType;
    }

    @Override
    public String toString() {
        return "KeYunCheDuiSearchDto{" +
                "UnitName='" + UnitName + '\'' +
                ", BusinessType='" + BusinessType + '\'' +
                ", Province='" + Province + '\'' +
                ", City='" + City + '\'' +
                ", ParentUnitId='" + ParentUnitId + '\'' +
                ", OrgType='" + OrgType + '\'' +
                '}';
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
    public String getBusinessType() {
        return BusinessType;
    }
    @JsonIgnore
    public void setBusinessType(String businessType) {
        BusinessType = businessType;
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
    public String getCity() {
        return City;
    }
    @JsonIgnore
    public void setCity(String city) {
        City = city;
    }
    @JsonIgnore
    public String getParentUnitId() {
        return ParentUnitId;
    }
    @JsonIgnore
    public void setParentUnitId(String parentUnitId) {
        ParentUnitId = parentUnitId;
    }
    @JsonIgnore
    public String getOrgType() {
        return OrgType;
    }
    @JsonIgnore
    public void setOrgType(String orgType) {
        OrgType = orgType;
    }
}
