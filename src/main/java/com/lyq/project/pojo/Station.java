package com.lyq.project.pojo;

import java.util.Date;

public class Station {
    private String id;

    private String unitId;

    private String stationName;

    private Date createtime;

    private Date updatetime;

    public Station(String id, String unitId, String stationName, Date createtime, Date updatetime) {
        this.id = id;
        this.unitId = unitId;
        this.stationName = stationName;
        this.createtime = createtime;
        this.updatetime = updatetime;
    }

    public Station() {
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

    public String getStationName() {
        return stationName;
    }

    public void setStationName(String stationName) {
        this.stationName = stationName == null ? null : stationName.trim();
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