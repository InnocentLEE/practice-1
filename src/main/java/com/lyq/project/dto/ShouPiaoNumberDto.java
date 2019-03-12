package com.lyq.project.dto;

public class ShouPiaoNumberDto {
    private Integer leaveNumber;
    private Integer totalNumber;

    public ShouPiaoNumberDto() {
    }

    public ShouPiaoNumberDto(Integer leaveNumber, Integer totalNumber) {
        this.leaveNumber = leaveNumber;
        this.totalNumber = totalNumber;
    }

    public Integer getLeaveNumber() {
        return leaveNumber;
    }

    public void setLeaveNumber(Integer leaveNumber) {
        this.leaveNumber = leaveNumber;
    }

    public Integer getTotalNumber() {
        return totalNumber;
    }

    public void setTotalNumber(Integer totalNumber) {
        this.totalNumber = totalNumber;
    }
}
