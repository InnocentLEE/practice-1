package com.lyq.project.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

public class KeYunQiYeListDto {
    @JsonProperty
    private String Id;
    @JsonProperty
    private String UnitName;
    @JsonProperty
    private String Province;
    @JsonProperty
    private String City;
    @JsonProperty
    private String Popedom;
    @JsonProperty
    private int BusinessType;
    @JsonProperty
    private String ContactMen;
    @JsonProperty
    private Date InNetDate;

    public KeYunQiYeListDto() {
    }

    public KeYunQiYeListDto(String id, String unitName, String province, String city, String popedom, int businessType, String contactMen, Date inNetDate) {
        Id = id;
        UnitName = unitName;
        Province = province;
        City = city;
        Popedom = popedom;
        BusinessType = businessType;
        ContactMen = contactMen;
        InNetDate = inNetDate;
    }

    @Override
    public String toString() {
        return "KeYunQiYeListDto{" +
                "Id='" + Id + '\'' +
                ", UnitName='" + UnitName + '\'' +
                ", Province='" + Province + '\'' +
                ", City='" + City + '\'' +
                ", Popedom='" + Popedom + '\'' +
                ", BusinessType='" + BusinessType + '\'' +
                ", ContactMen='" + ContactMen + '\'' +
                ", InNetDate=" + InNetDate +
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
    @JsonIgnore
    public String getCity() {
        return City;
    }
    @JsonIgnore
    public void setCity(String city) {
        City = city;
    }
    @JsonIgnore
    public String getPopedom() {
        return Popedom;
    }
    @JsonIgnore
    public void setPopedom(String popedom) {
        Popedom = popedom;
    }
    @JsonIgnore
    public int getBusinessType() {
        return BusinessType;
    }
    @JsonIgnore
    public void setBusinessType(int businessType) {
        BusinessType = businessType;
    }
    @JsonIgnore
    public String getContactMen() {
        return ContactMen;
    }
    @JsonIgnore
    public void setContactMen(String contactMen) {
        ContactMen = contactMen;
    }
    @JsonIgnore
    public Date getInNetDate() {
        return InNetDate;
    }
    @JsonIgnore
    public void setInNetDate(Date inNetDate) {
        InNetDate = inNetDate;
    }
}
