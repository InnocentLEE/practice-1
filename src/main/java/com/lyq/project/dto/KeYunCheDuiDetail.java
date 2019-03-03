package com.lyq.project.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

public class KeYunCheDuiDetail {
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
    private Date InNetDate;
    @JsonProperty
    private String Address;
    @JsonProperty
    private String PermitWord;
    @JsonProperty
    private String PermitNum;
    @JsonProperty
    private Date PermitDate;
    @JsonProperty
    private String PermitDateValue;
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

    public KeYunCheDuiDetail() {
    }

    public KeYunCheDuiDetail(String id, String unitName, String province, String city, String popedom, Date inNetDate, String address, String permitWord, String permitNum, Date permitDate, String permitDateValue, String name, String idCard, String tel, String phone, String email, String QQ, String memo) {
        Id = id;
        UnitName = unitName;
        Province = province;
        City = city;
        Popedom = popedom;
        InNetDate = inNetDate;
        Address = address;
        PermitWord = permitWord;
        PermitNum = permitNum;
        PermitDate = permitDate;
        PermitDateValue = permitDateValue;
        Name = name;
        IdCard = idCard;
        Tel = tel;
        Phone = phone;
        Email = email;
        this.QQ = QQ;
        Memo = memo;
    }

    @Override
    public String toString() {
        return "KeYunCheDuiDetail{" +
                "Id='" + Id + '\'' +
                ", UnitName='" + UnitName + '\'' +
                ", Province='" + Province + '\'' +
                ", City='" + City + '\'' +
                ", Popedom='" + Popedom + '\'' +
                ", InNetDate=" + InNetDate +
                ", Address='" + Address + '\'' +
                ", PermitWord='" + PermitWord + '\'' +
                ", PermitNum='" + PermitNum + '\'' +
                ", PermitDate=" + PermitDate +
                ", PermitDateValue='" + PermitDateValue + '\'' +
                ", Name='" + Name + '\'' +
                ", IdCard='" + IdCard + '\'' +
                ", Tel='" + Tel + '\'' +
                ", Phone='" + Phone + '\'' +
                ", Email='" + Email + '\'' +
                ", QQ='" + QQ + '\'' +
                ", Memo='" + Memo + '\'' +
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
    public String getPermitWord() {
        return PermitWord;
    }
    @JsonIgnore
    public void setPermitWord(String permitWord) {
        PermitWord = permitWord;
    }
    @JsonIgnore
    public String getPermitNum() {
        return PermitNum;
    }
    @JsonIgnore
    public void setPermitNum(String permitNum) {
        PermitNum = permitNum;
    }
    @JsonIgnore
    public Date getPermitDate() {
        return PermitDate;
    }
    @JsonIgnore
    public void setPermitDate(Date permitDate) {
        PermitDate = permitDate;
    }
    @JsonIgnore
    public String getPermitDateValue() {
        return PermitDateValue;
    }
    @JsonIgnore
    public void setPermitDateValue(String permitDateValue) {
        PermitDateValue = permitDateValue;
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
}
