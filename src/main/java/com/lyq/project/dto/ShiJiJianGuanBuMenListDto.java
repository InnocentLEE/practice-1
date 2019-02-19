package com.lyq.project.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

public class ShiJiJianGuanBuMenListDto {
    @JsonProperty
    private String Id;
    @JsonProperty
    private String UnitName;
    @JsonProperty
    private String City;
    @JsonProperty
    private Date InNetDate;
    @JsonProperty
    private String ContactMen;

    public ShiJiJianGuanBuMenListDto() {
    }

    public ShiJiJianGuanBuMenListDto(String id, String unitName, String city, Date inNetDate, String contactMen) {
        Id = id;
        UnitName = unitName;
        City = city;
        InNetDate = inNetDate;
        ContactMen = contactMen;
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
    public String getCity() {
        return City;
    }
    @JsonIgnore
    public void setCity(String city) {
        City = city;
    }
    @JsonIgnore
    public Date getInNetDate() {
        return InNetDate;
    }
    @JsonIgnore
    public void setInNetDate(Date inNetDate) {
        InNetDate = inNetDate;
    }
    @JsonIgnore
    public String getContactMen() {
        return ContactMen;
    }
    @JsonIgnore
    public void setContactMen(String contactMen) {
        ContactMen = contactMen;
    }
}
