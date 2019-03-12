package com.lyq.project.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ArrangeListDto {
    @JsonProperty
    private String Id;
    @JsonProperty
    private String Num;
    @JsonProperty
    private String CarNum;
    @JsonProperty
    private String CarType;
    @JsonProperty
    private String ArrangeType;
    @JsonProperty
    private String StartStation;
    @JsonProperty
    private String EndStation;
    @JsonProperty
    private String Station;
    @JsonProperty
    private String Price;
    @JsonProperty
    private String LeaveNumber;
    @JsonProperty
    private String StartTime;
    @JsonProperty
    private String EndTime;
    @JsonProperty
    private String isCancle;

    public ArrangeListDto() {
    }

    public ArrangeListDto(String id, String num, String carNum, String carType, String arrangeType, String startStation, String endStation, String station, String price, String leaveNumber, String startTime, String endTime, String isCancle) {
        Id = id;
        Num = num;
        CarNum = carNum;
        CarType = carType;
        ArrangeType = arrangeType;
        StartStation = startStation;
        EndStation = endStation;
        Station = station;
        Price = price;
        LeaveNumber = leaveNumber;
        StartTime = startTime;
        EndTime = endTime;
        this.isCancle = isCancle;
    }

    @Override
    public String toString() {
        return "ArrangeListDto{" +
                "Id='" + Id + '\'' +
                ", Num='" + Num + '\'' +
                ", CarNum='" + CarNum + '\'' +
                ", CarType='" + CarType + '\'' +
                ", ArrangeType='" + ArrangeType + '\'' +
                ", StartStation='" + StartStation + '\'' +
                ", EndStation='" + EndStation + '\'' +
                ", Station='" + Station + '\'' +
                ", Price='" + Price + '\'' +
                ", LeaveNumber='" + LeaveNumber + '\'' +
                ", StartTime='" + StartTime + '\'' +
                ", EndTime='" + EndTime + '\'' +
                ", isCancle='" + isCancle + '\'' +
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
    public String getNum() {
        return Num;
    }
    @JsonIgnore
    public void setNum(String num) {
        Num = num;
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
    public String getArrangeType() {
        return ArrangeType;
    }
    @JsonIgnore
    public void setArrangeType(String arrangeType) {
        ArrangeType = arrangeType;
    }
    @JsonIgnore
    public String getStartStation() {
        return StartStation;
    }
    @JsonIgnore
    public void setStartStation(String startStation) {
        StartStation = startStation;
    }
    @JsonIgnore
    public String getEndStation() {
        return EndStation;
    }
    @JsonIgnore
    public void setEndStation(String endStation) {
        EndStation = endStation;
    }
    @JsonIgnore
    public String getStation() {
        return Station;
    }
    @JsonIgnore
    public void setStation(String station) {
        Station = station;
    }
    @JsonIgnore
    public String getPrice() {
        return Price;
    }
    @JsonIgnore
    public void setPrice(String price) {
        Price = price;
    }
    @JsonIgnore
    public String getLeaveNumber() {
        return LeaveNumber;
    }
    @JsonIgnore
    public void setLeaveNumber(String leaveNumber) {
        LeaveNumber = leaveNumber;
    }
    @JsonIgnore
    public String getStartTime() {
        return StartTime;
    }
    @JsonIgnore
    public void setStartTime(String startTime) {
        StartTime = startTime;
    }
    @JsonIgnore
    public String getEndTime() {
        return EndTime;
    }
    @JsonIgnore
    public void setEndTime(String endTime) {
        EndTime = endTime;
    }
    @JsonIgnore
    public String getIsCancle() {
        return isCancle;
    }
    @JsonIgnore
    public void setIsCancle(String isCancle) {
        this.isCancle = isCancle;
    }
}
