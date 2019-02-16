package com.lyq.project.pojo;

public class UnitGather {
    private String id;

    private String unitId;

    private String parentUnitId;

    private Integer unitType;

    private Integer parentUnitType;

    private Integer isCreate;

    public UnitGather(String id, String unitId, String parentUnitId, Integer unitType, Integer parentUnitType, Integer isCreate) {
        this.id = id;
        this.unitId = unitId;
        this.parentUnitId = parentUnitId;
        this.unitType = unitType;
        this.parentUnitType = parentUnitType;
        this.isCreate = isCreate;
    }

    public UnitGather() {
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

    public String getParentUnitId() {
        return parentUnitId;
    }

    public void setParentUnitId(String parentUnitId) {
        this.parentUnitId = parentUnitId == null ? null : parentUnitId.trim();
    }

    public Integer getUnitType() {
        return unitType;
    }

    public void setUnitType(Integer unitType) {
        this.unitType = unitType;
    }

    public Integer getParentUnitType() {
        return parentUnitType;
    }

    public void setParentUnitType(Integer parentUnitType) {
        this.parentUnitType = parentUnitType;
    }

    public Integer getIsCreate() {
        return isCreate;
    }

    public void setIsCreate(Integer isCreate) {
        this.isCreate = isCreate;
    }
}