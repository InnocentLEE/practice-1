package com.lyq.project.pojo;

import java.util.Date;

public class Unit {
    private String id;

    private Integer orgtype;

    private String province;

    private String city;

    private String unitName;

    private Integer businessType;

    private String address;

    private Date inNetDate;

    private String permitWord;

    private String permitNum;

    private Date permitDate;

    private String contactsId;

    private Date createtime;

    private Date updatetiem;

    public Unit(String id, Integer orgtype, String province, String city, String unitName, Integer businessType, String address, Date inNetDate, String permitWord, String permitNum, Date permitDate, String contactsId, Date createtime, Date updatetiem) {
        this.id = id;
        this.orgtype = orgtype;
        this.province = province;
        this.city = city;
        this.unitName = unitName;
        this.businessType = businessType;
        this.address = address;
        this.inNetDate = inNetDate;
        this.permitWord = permitWord;
        this.permitNum = permitNum;
        this.permitDate = permitDate;
        this.contactsId = contactsId;
        this.createtime = createtime;
        this.updatetiem = updatetiem;
    }

    public Unit() {
        super();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public Integer getOrgtype() {
        return orgtype;
    }

    public void setOrgtype(Integer orgtype) {
        this.orgtype = orgtype;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province == null ? null : province.trim();
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city == null ? null : city.trim();
    }

    public String getUnitName() {
        return unitName;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName == null ? null : unitName.trim();
    }

    public Integer getBusinessType() {
        return businessType;
    }

    public void setBusinessType(Integer businessType) {
        this.businessType = businessType;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }

    public Date getInNetDate() {
        return inNetDate;
    }

    public void setInNetDate(Date inNetDate) {
        this.inNetDate = inNetDate;
    }

    public String getPermitWord() {
        return permitWord;
    }

    public void setPermitWord(String permitWord) {
        this.permitWord = permitWord == null ? null : permitWord.trim();
    }

    public String getPermitNum() {
        return permitNum;
    }

    public void setPermitNum(String permitNum) {
        this.permitNum = permitNum == null ? null : permitNum.trim();
    }

    public Date getPermitDate() {
        return permitDate;
    }

    public void setPermitDate(Date permitDate) {
        this.permitDate = permitDate;
    }

    public String getContactsId() {
        return contactsId;
    }

    public void setContactsId(String contactsId) {
        this.contactsId = contactsId == null ? null : contactsId.trim();
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public Date getUpdatetiem() {
        return updatetiem;
    }

    public void setUpdatetiem(Date updatetiem) {
        this.updatetiem = updatetiem;
    }
}