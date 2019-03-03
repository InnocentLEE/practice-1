package com.lyq.project.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

public class KeCheDetail {
    @JsonProperty
    private String Id;
    @JsonProperty
    private String CarNum;
    @JsonProperty
    private Integer CarType;
    @JsonProperty
    private String CarTypeValue;
    @JsonProperty
    private String Phone;
    @JsonProperty
    private int Status;
    @JsonProperty
    private String StatusValue;
    @JsonProperty
    private String UnitName;
    @JsonProperty
    private Date LicenceRegistDate;
    @JsonProperty
    private Date LicencePublishDate;
    @JsonProperty
    private Date ErweiDate;
    @JsonProperty
    private Date ErweiDateNext;
    @JsonProperty
    private String LicenceRegistDateValue;
    @JsonProperty
    private String LicencePublishDateValue;
    @JsonProperty
    private String ErweiDateValue;
    @JsonProperty
    private String ErweiDateNextValue;
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
    private String FuelValue;
    @JsonProperty
    private Integer Weight;
    @JsonProperty
    private Integer Engine;
    @JsonProperty
    private Integer SeatNum;

    public KeCheDetail() {
    }

    public KeCheDetail(String id, String carNum, Integer carType, String carTypeValue, String phone, int status, String statusValue, String unitName, Date licenceRegistDate, Date licencePublishDate, Date erweiDate, Date erweiDateNext, String licenceRegistDateValue, String licencePublishDateValue, String erweiDateValue, String erweiDateNextValue, String permitNum, String licenceAddress, String engineNum, String carFrameNum, String fuel, String fuelValue, Integer weight, Integer engine, Integer seatNum) {
        Id = id;
        CarNum = carNum;
        CarType = carType;
        CarTypeValue = carTypeValue;
        Phone = phone;
        Status = status;
        StatusValue = statusValue;
        UnitName = unitName;
        LicenceRegistDate = licenceRegistDate;
        LicencePublishDate = licencePublishDate;
        ErweiDate = erweiDate;
        ErweiDateNext = erweiDateNext;
        LicenceRegistDateValue = licenceRegistDateValue;
        LicencePublishDateValue = licencePublishDateValue;
        ErweiDateValue = erweiDateValue;
        ErweiDateNextValue = erweiDateNextValue;
        PermitNum = permitNum;
        LicenceAddress = licenceAddress;
        EngineNum = engineNum;
        CarFrameNum = carFrameNum;
        Fuel = fuel;
        FuelValue = fuelValue;
        Weight = weight;
        Engine = engine;
        SeatNum = seatNum;
    }

    @Override
    public String toString() {
        return "KeCheDetail{" +
                "Id='" + Id + '\'' +
                ", CarNum='" + CarNum + '\'' +
                ", CarType=" + CarType +
                ", CarTypeValue='" + CarTypeValue + '\'' +
                ", Phone='" + Phone + '\'' +
                ", Status=" + Status +
                ", StatusValue='" + StatusValue + '\'' +
                ", UnitName='" + UnitName + '\'' +
                ", LicenceRegistDate=" + LicenceRegistDate +
                ", LicencePublishDate=" + LicencePublishDate +
                ", ErweiDate=" + ErweiDate +
                ", ErweiDateNext=" + ErweiDateNext +
                ", LicenceRegistDateValue='" + LicenceRegistDateValue + '\'' +
                ", LicencePublishDateValue='" + LicencePublishDateValue + '\'' +
                ", ErweiDateValue='" + ErweiDateValue + '\'' +
                ", ErweiDateNextValue='" + ErweiDateNextValue + '\'' +
                ", PermitNum='" + PermitNum + '\'' +
                ", LicenceAddress='" + LicenceAddress + '\'' +
                ", EngineNum='" + EngineNum + '\'' +
                ", CarFrameNum='" + CarFrameNum + '\'' +
                ", Fuel=" + Fuel +
                ", FuelValue='" + FuelValue + '\'' +
                ", Weight=" + Weight +
                ", Engine=" + Engine +
                ", SeatNum=" + SeatNum +
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
    public Integer getCarType() {
        return CarType;
    }
    @JsonIgnore
    public void setCarType(Integer carType) {
        CarType = carType;
    }
    @JsonIgnore
    public String getCarTypeValue() {
        return CarTypeValue;
    }
    @JsonIgnore
    public void setCarTypeValue(String carTypeValue) {
        CarTypeValue = carTypeValue;
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
    public int getStatus() {
        return Status;
    }
    @JsonIgnore
    public void setStatus(int status) {
        Status = status;
    }
    @JsonIgnore
    public String getStatusValue() {
        return StatusValue;
    }
    @JsonIgnore
    public void setStatusValue(String statusValue) {
        StatusValue = statusValue;
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
    public Date getLicenceRegistDate() {
        return LicenceRegistDate;
    }
    @JsonIgnore
    public void setLicenceRegistDate(Date licenceRegistDate) {
        LicenceRegistDate = licenceRegistDate;
    }
    @JsonIgnore
    public Date getLicencePublishDate() {
        return LicencePublishDate;
    }
    @JsonIgnore
    public void setLicencePublishDate(Date licencePublishDate) {
        LicencePublishDate = licencePublishDate;
    }
    @JsonIgnore
    public Date getErweiDate() {
        return ErweiDate;
    }
    @JsonIgnore
    public void setErweiDate(Date erweiDate) {
        ErweiDate = erweiDate;
    }
    @JsonIgnore
    public Date getErweiDateNext() {
        return ErweiDateNext;
    }
    @JsonIgnore
    public void setErweiDateNext(Date erweiDateNext) {
        ErweiDateNext = erweiDateNext;
    }
    @JsonIgnore
    public String getLicenceRegistDateValue() {
        return LicenceRegistDateValue;
    }
    @JsonIgnore
    public void setLicenceRegistDateValue(String licenceRegistDateValue) {
        LicenceRegistDateValue = licenceRegistDateValue;
    }
    @JsonIgnore
    public String getLicencePublishDateValue() {
        return LicencePublishDateValue;
    }
    @JsonIgnore
    public void setLicencePublishDateValue(String licencePublishDateValue) {
        LicencePublishDateValue = licencePublishDateValue;
    }
    @JsonIgnore
    public String getErweiDateValue() {
        return ErweiDateValue;
    }
    @JsonIgnore
    public void setErweiDateValue(String erweiDateValue) {
        ErweiDateValue = erweiDateValue;
    }
    @JsonIgnore
    public String getErweiDateNextValue() {
        return ErweiDateNextValue;
    }
    @JsonIgnore
    public void setErweiDateNextValue(String erweiDateNextValue) {
        ErweiDateNextValue = erweiDateNextValue;
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
    public String getFuelValue() {
        return FuelValue;
    }
    @JsonIgnore
    public void setFuelValue(String fuelValue) {
        FuelValue = fuelValue;
    }
    @JsonIgnore
    public Integer getWeight() {
        return Weight;
    }
    @JsonIgnore
    public void setWeight(Integer weight) {
        Weight = weight;
    }
    @JsonIgnore
    public Integer getEngine() {
        return Engine;
    }
    @JsonIgnore
    public void setEngine(Integer engine) {
        Engine = engine;
    }
    @JsonIgnore
    public Integer getSeatNum() {
        return SeatNum;
    }
    @JsonIgnore
    public void setSeatNum(Integer seatNum) {
        SeatNum = seatNum;
    }
}
