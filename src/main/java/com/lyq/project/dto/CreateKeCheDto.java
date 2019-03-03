package com.lyq.project.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class CreateKeCheDto {
    @JsonProperty
    private String Id;
    @JsonProperty
    private String CarNum;
    @JsonProperty
    private String CarType;
    @JsonProperty
    private String Phone;
    @JsonProperty
    private String LicenceRegistDate;
    @JsonProperty
    private String LicencePublishDate;
    @JsonProperty
    private String ErweiDate;
    @JsonProperty
    private String ErweiDateNext;
    @JsonProperty
    private String PermitNum;
    @JsonProperty
    private String LicenceAddress;
    @JsonProperty
    private String EngineNum;
    @JsonProperty
    private String CarFrameNum;
    @JsonProperty
    private String Fuel;
    @JsonProperty
    private String Weight;
    @JsonProperty
    private String Engine;
    @JsonProperty
    private String SeatNum;
    @JsonProperty
    private String UnitId;
    @JsonProperty
    private String UnitName;
    @JsonProperty
    private String OrgType;

    public CreateKeCheDto() {
    }

    public CreateKeCheDto(String id, String carNum, String carType, String phone, String licenceRegistDate, String licencePublishDate, String erweiDate, String erweiDateNext, String permitNum, String licenceAddress, String engineNum, String carFrameNum, String fuel, String weight, String engine, String seatNum, String unitId, String unitName, String orgType) {
        Id = id;
        CarNum = carNum;
        CarType = carType;
        Phone = phone;
        LicenceRegistDate = licenceRegistDate;
        LicencePublishDate = licencePublishDate;
        ErweiDate = erweiDate;
        ErweiDateNext = erweiDateNext;
        PermitNum = permitNum;
        LicenceAddress = licenceAddress;
        EngineNum = engineNum;
        CarFrameNum = carFrameNum;
        Fuel = fuel;
        Weight = weight;
        Engine = engine;
        SeatNum = seatNum;
        UnitId = unitId;
        UnitName = unitName;
        OrgType = orgType;
    }

    @Override
    public String toString() {
        return "CreateKeCheDto{" +
                "Id='" + Id + '\'' +
                ", CarNum='" + CarNum + '\'' +
                ", CarType='" + CarType + '\'' +
                ", Phone='" + Phone + '\'' +
                ", LicenceRegistDate='" + LicenceRegistDate + '\'' +
                ", LicencePublishDate='" + LicencePublishDate + '\'' +
                ", ErweiDate='" + ErweiDate + '\'' +
                ", ErweiDateNext='" + ErweiDateNext + '\'' +
                ", PermitNum='" + PermitNum + '\'' +
                ", LicenceAddress='" + LicenceAddress + '\'' +
                ", EngineNum='" + EngineNum + '\'' +
                ", CarFrameNum='" + CarFrameNum + '\'' +
                ", Fuel='" + Fuel + '\'' +
                ", Weight='" + Weight + '\'' +
                ", Engine='" + Engine + '\'' +
                ", SeatNum='" + SeatNum + '\'' +
                ", UnitId='" + UnitId + '\'' +
                ", UnitName='" + UnitName + '\'' +
                ", OrgType='" + OrgType + '\'' +
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
    public String getCarNum() {
        return CarNum;
    }
    @JsonIgnore
    public void setCarNum(String carNum) {
        CarNum = carNum;
    }
    @JsonIgnore
    public String getCarType() {
        return CarType;
    }
    @JsonIgnore
    public void setCarType(String carType) {
        CarType = carType;
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
    public String getLicenceRegistDate() {
        return LicenceRegistDate;
    }
    @JsonIgnore
    public void setLicenceRegistDate(String licenceRegistDate) {
        LicenceRegistDate = licenceRegistDate;
    }
    @JsonIgnore
    public String getLicencePublishDate() {
        return LicencePublishDate;
    }
    @JsonIgnore
    public void setLicencePublishDate(String licencePublishDate) {
        LicencePublishDate = licencePublishDate;
    }
    @JsonIgnore
    public String getErweiDate() {
        return ErweiDate;
    }
    @JsonIgnore
    public void setErweiDate(String erweiDate) {
        ErweiDate = erweiDate;
    }
    @JsonIgnore
    public String getErweiDateNext() {
        return ErweiDateNext;
    }
    @JsonIgnore
    public void setErweiDateNext(String erweiDateNext) {
        ErweiDateNext = erweiDateNext;
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
    public String getLicenceAddress() {
        return LicenceAddress;
    }
    @JsonIgnore
    public void setLicenceAddress(String licenceAddress) {
        LicenceAddress = licenceAddress;
    }
    @JsonIgnore
    public String getEngineNum() {
        return EngineNum;
    }
    @JsonIgnore
    public void setEngineNum(String engineNum) {
        EngineNum = engineNum;
    }
    @JsonIgnore
    public String getCarFrameNum() {
        return CarFrameNum;
    }
    @JsonIgnore
    public void setCarFrameNum(String carFrameNum) {
        CarFrameNum = carFrameNum;
    }
    @JsonIgnore
    public String getFuel() {
        return Fuel;
    }
    @JsonIgnore
    public void setFuel(String fuel) {
        Fuel = fuel;
    }
    @JsonIgnore
    public String getWeight() {
        return Weight;
    }
    @JsonIgnore
    public void setWeight(String weight) {
        Weight = weight;
    }
    @JsonIgnore
    public String getEngine() {
        return Engine;
    }
    @JsonIgnore
    public void setEngine(String engine) {
        Engine = engine;
    }
    @JsonIgnore
    public String getSeatNum() {
        return SeatNum;
    }
    @JsonIgnore
    public void setSeatNum(String seatNum) {
        SeatNum = seatNum;
    }
    @JsonIgnore
    public String getUnitId() {
        return UnitId;
    }
    @JsonIgnore
    public void setUnitId(String unitId) {
        UnitId = unitId;
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
    public String getOrgType() {
        return OrgType;
    }
    @JsonIgnore
    public void setOrgType(String orgType) {
        OrgType = orgType;
    }
}
