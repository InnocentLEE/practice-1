package com.lyq.project.pojo;

import java.util.Date;

public class Route {
    private String id;

    private String unitId;

    private String name;

    private Integer status;

    private String beginId;

    private String endId;

    private String totalTime;

    private Date createtime;

    private Date updatetime;

    public Route(String id, String unitId, String name, Integer status, String beginId, String endId, String totalTime, Date createtime, Date updatetime) {
        this.id = id;
        this.unitId = unitId;
        this.name = name;
        this.status = status;
        this.beginId = beginId;
        this.endId = endId;
        this.totalTime = totalTime;
        this.createtime = createtime;
        this.updatetime = updatetime;
    }

    public Route() {
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getBeginId() {
        return beginId;
    }

    public void setBeginId(String beginId) {
        this.beginId = beginId == null ? null : beginId.trim();
    }

    public String getEndId() {
        return endId;
    }

    public void setEndId(String endId) {
        this.endId = endId == null ? null : endId.trim();
    }

    public String getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(String totalTime) {
        this.totalTime = totalTime == null ? null : totalTime.trim();
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public Date getUpdatetime() {
        return updatetime;
    }

    public void setUpdatetime(Date updatetime) {
        this.updatetime = updatetime;
    }
}