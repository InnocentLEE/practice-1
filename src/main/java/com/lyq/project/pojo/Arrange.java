package com.lyq.project.pojo;

public class Arrange {
    private String id;

    private String unitId;

    private String carId;

    private String routeId;

    private Integer arrangeType;

    private String startDate;

    private String satrtTime;

    private String endDate;

    private String endTime;

    private String startDateReal;

    private String startTimeReal;

    private String endDateReal;

    private String endTimeReal;

    private Integer totalNumber;

    private Integer price;

    private Integer leaveNumber;

    private Integer isCancel;

    public Arrange(String id, String unitId, String carId, String routeId, Integer arrangeType, String startDate, String satrtTime, String endDate, String endTime, String startDateReal, String startTimeReal, String endDateReal, String endTimeReal, Integer totalNumber, Integer price, Integer leaveNumber, Integer isCancel) {
        this.id = id;
        this.unitId = unitId;
        this.carId = carId;
        this.routeId = routeId;
        this.arrangeType = arrangeType;
        this.startDate = startDate;
        this.satrtTime = satrtTime;
        this.endDate = endDate;
        this.endTime = endTime;
        this.startDateReal = startDateReal;
        this.startTimeReal = startTimeReal;
        this.endDateReal = endDateReal;
        this.endTimeReal = endTimeReal;
        this.totalNumber = totalNumber;
        this.price = price;
        this.leaveNumber = leaveNumber;
        this.isCancel = isCancel;
    }

    public Arrange() {
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

    public String getCarId() {
        return carId;
    }

    public void setCarId(String carId) {
        this.carId = carId == null ? null : carId.trim();
    }

    public String getRouteId() {
        return routeId;
    }

    public void setRouteId(String routeId) {
        this.routeId = routeId == null ? null : routeId.trim();
    }

    public Integer getArrangeType() {
        return arrangeType;
    }

    public void setArrangeType(Integer arrangeType) {
        this.arrangeType = arrangeType;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate == null ? null : startDate.trim();
    }

    public String getSatrtTime() {
        return satrtTime;
    }

    public void setSatrtTime(String satrtTime) {
        this.satrtTime = satrtTime == null ? null : satrtTime.trim();
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate == null ? null : endDate.trim();
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime == null ? null : endTime.trim();
    }

    public String getStartDateReal() {
        return startDateReal;
    }

    public void setStartDateReal(String startDateReal) {
        this.startDateReal = startDateReal == null ? null : startDateReal.trim();
    }

    public String getStartTimeReal() {
        return startTimeReal;
    }

    public void setStartTimeReal(String startTimeReal) {
        this.startTimeReal = startTimeReal == null ? null : startTimeReal.trim();
    }

    public String getEndDateReal() {
        return endDateReal;
    }

    public void setEndDateReal(String endDateReal) {
        this.endDateReal = endDateReal == null ? null : endDateReal.trim();
    }

    public String getEndTimeReal() {
        return endTimeReal;
    }

    public void setEndTimeReal(String endTimeReal) {
        this.endTimeReal = endTimeReal == null ? null : endTimeReal.trim();
    }

    public Integer getTotalNumber() {
        return totalNumber;
    }

    public void setTotalNumber(Integer totalNumber) {
        this.totalNumber = totalNumber;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getLeaveNumber() {
        return leaveNumber;
    }

    public void setLeaveNumber(Integer leaveNumber) {
        this.leaveNumber = leaveNumber;
    }

    public Integer getIsCancel() {
        return isCancel;
    }

    public void setIsCancel(Integer isCancel) {
        this.isCancel = isCancel;
    }
}