package com.lyq.project.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

public class ShengJiJianGuanBuMenListDto {
    @JsonProperty
    private String Id;
    @JsonProperty
    private String UnitName;
    @JsonProperty
    private String Province;
    @JsonProperty
    private Date InNetDate;
    @JsonProperty
    private String ContactMen;

    public ShengJiJianGuanBuMenListDto() {
    }

    public ShengJiJianGuanBuMenListDto(String id, String unitName, String province, Date inNetDate, String contactMen) {
        Id = id;
        UnitName = unitName;
        Province = province;
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
    public String getProvince() {
        return Province;
    }
    @JsonIgnore
    public void setProvince(String province) {
        Province = province;
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
