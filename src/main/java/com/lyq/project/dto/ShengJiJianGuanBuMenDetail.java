package com.lyq.project.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

public class ShengJiJianGuanBuMenDetail {
    @JsonProperty
    private String Id;
    @JsonProperty
    private String UnitName;
    @JsonProperty
    private String Province;
    @JsonProperty
    private Date InNetDate;
    @JsonProperty
    private String Address;
    @JsonProperty
    private String Name;
    @JsonProperty
    private String IdCard;
    @JsonProperty
    private String Tel;
    @JsonProperty
    private String Phone;
    @JsonProperty
    private String Email;
    @JsonProperty
    private String QQ;
    @JsonProperty
    private String Memo;

    public ShengJiJianGuanBuMenDetail() {
    }

    public ShengJiJianGuanBuMenDetail(String id, String unitName, String province, Date inNetDate, String address, String name, String idCard, String tel, String phone, String email, String QQ, String memo) {
        Id = id;
        UnitName = unitName;
        Province = province;
        InNetDate = inNetDate;
        Address = address;
        Name = name;
        IdCard = idCard;
        Tel = tel;
        Phone = phone;
        Email = email;
        this.QQ = QQ;
        Memo = memo;
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
    public String getAddress() {
        return Address;
    }
    @JsonIgnore
    public void setAddress(String address) {
        Address = address;
    }
    @JsonIgnore
    public String getName() {
        return Name;
    }
    @JsonIgnore
    public void setName(String name) {
        Name = name;
    }
    @JsonIgnore
    public String getIdCard() {
        return IdCard;
    }
    @JsonIgnore
    public void setIdCard(String idCard) {
        IdCard = idCard;
    }
    @JsonIgnore
    public String getTel() {
        return Tel;
    }
    @JsonIgnore
    public void setTel(String tel) {
        Tel = tel;
    }
    @JsonIgnore
    public String getPhone() {
        return Phone;
    }
    @JsonIgnore
    public void setPhone(String phone) {
        Phone = phone;
    }
    @JsonIgnore
    public String getEmail() {
        return Email;
    }
    @JsonIgnore
    public void setEmail(String email) {
        Email = email;
    }
    @JsonIgnore
    public String getQQ() {
        return QQ;
    }
    @JsonIgnore
    public void setQQ(String QQ) {
        this.QQ = QQ;
    }
    @JsonIgnore
    public String getMemo() {
        return Memo;
    }
    @JsonIgnore
    public void setMemo(String memo) {
        Memo = memo;
    }

    @Override
    public String toString() {
        return "ShengJiJianGuanBuMenDetail{" +
                "Id='" + Id + '\'' +
                ", UnitName='" + UnitName + '\'' +
                ", Province='" + Province + '\'' +
                ", InNetDate=" + InNetDate +
                ", Address='" + Address + '\'' +
                ", Name='" + Name + '\'' +
                ", IdCard='" + IdCard + '\'' +
                ", Tel='" + Tel + '\'' +
                ", Phone='" + Phone + '\'' +
                ", Email='" + Email + '\'' +
                ", QQ='" + QQ + '\'' +
                ", Memo='" + Memo + '\'' +
                '}';
    }
}
