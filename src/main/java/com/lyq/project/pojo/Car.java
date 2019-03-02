package com.lyq.project.pojo;

import java.util.Date;

public class Car {
    private String id;

    private String unitId;

    private String unitName;

    private Integer status;

    private String carNum;

    private Integer carType;

    private String phone;

    private String licenceAddress;

    private Date licenceRegistDate;

    private Date licencePublishDate;

    private String fuel;

    private Integer engine;

    private Integer weight;

    private String engineNum;

    private String carframeNum;

    private Date erweiDate;

    private Date erweiDateNext;

    private String permitNum;

    private Integer seatNum;

    private String address;

    private Date createtime;

    private Date upatetime;

    public Car(String id, String unitId, String unitName, Integer status, String carNum, Integer carType, String phone, String licenceAddress, Date licenceRegistDate, Date licencePublishDate, String fuel, Integer engine, Integer weight, String engineNum, String carframeNum, Date erweiDate, Date erweiDateNext, String permitNum, Integer seatNum, String address, Date createtime, Date upatetime) {
        this.id = id;
        this.unitId = unitId;
        this.unitName = unitName;
        this.status = status;
        this.carNum = carNum;
        this.carType = carType;
        this.phone = phone;
        this.licenceAddress = licenceAddress;
        this.licenceRegistDate = licenceRegistDate;
        this.licencePublishDate = licencePublishDate;
        this.fuel = fuel;
        this.engine = engine;
        this.weight = weight;
        this.engineNum = engineNum;
        this.carframeNum = carframeNum;
        this.erweiDate = erweiDate;
        this.erweiDateNext = erweiDateNext;
        this.permitNum = permitNum;
        this.seatNum = seatNum;
        this.address = address;
        this.createtime = createtime;
        this.upatetime = upatetime;
    }

    public Car() {
        super();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getUnitId() {
        return unitId;
    }

    public void setUnitId(String unitId) {
        this.unitId = unitId == null ? null : unitId.trim();
    }

    public String getUnitName() {
        return unitName;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName == null ? null : unitName.trim();
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getCarNum() {
        return carNum;
    }

    public void setCarNum(String carNum) {
        this.carNum = carNum == null ? null : carNum.trim();
    }

    public Integer getCarType() {
        return carType;
    }

    public void setCarType(Integer carType) {
        this.carType = carType;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
    }

    public String getLicenceAddress() {
        return licenceAddress;
    }

    public void setLicenceAddress(String licenceAddress) {
        this.licenceAddress = licenceAddress == null ? null : licenceAddress.trim();
    }

    public Date getLicenceRegistDate() {
        return licenceRegistDate;
    }

    public void setLicenceRegistDate(Date licenceRegistDate) {
        this.licenceRegistDate = licenceRegistDate;
    }

    public Date getLicencePublishDate() {
        return licencePublishDate;
    }

    public void setLicencePublishDate(Date licencePublishDate) {
        this.licencePublishDate = licencePublishDate;
    }

    public String getFuel() {
        return fuel;
    }

    public void setFuel(String fuel) {
        this.fuel = fuel == null ? null : fuel.trim();
    }

    public Integer getEngine() {
        return engine;
    }

    public void setEngine(Integer engine) {
        this.engine = engine;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public String getEngineNum() {
        return engineNum;
    }

    public void setEngineNum(String engineNum) {
        this.engineNum = engineNum == null ? null : engineNum.trim();
    }

    public String getCarframeNum() {
        return carframeNum;
    }

    public void setCarframeNum(String carframeNum) {
        this.carframeNum = carframeNum == null ? null : carframeNum.trim();
    }

    public Date getErweiDate() {
        return erweiDate;
    }

    public void setErweiDate(Date erweiDate) {
        this.erweiDate = erweiDate;
    }

    public Date getErweiDateNext() {
        return erweiDateNext;
    }

    public void setErweiDateNext(Date erweiDateNext) {
        this.erweiDateNext = erweiDateNext;
    }

    public String getPermitNum() {
        return permitNum;
    }

    public void setPermitNum(String permitNum) {
        this.permitNum = permitNum == null ? null : permitNum.trim();
    }

    public Integer getSeatNum() {
        return seatNum;
    }

    public void setSeatNum(Integer seatNum) {
        this.seatNum = seatNum;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public Date getUpatetime() {
        return upatetime;
    }

    public void setUpatetime(Date upatetime) {
        this.upatetime = upatetime;
    }
}