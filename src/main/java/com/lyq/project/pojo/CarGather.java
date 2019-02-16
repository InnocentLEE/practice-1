package com.lyq.project.pojo;

public class CarGather {
    private String id;

    private String carId;

    private String unitId;

    public CarGather(String id, String carId, String unitId) {
        this.id = id;
        this.carId = carId;
        this.unitId = unitId;
    }

    public CarGather() {
        super();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getCarId() {
        return carId;
    }

    public void setCarId(String carId) {
        this.carId = carId == null ? null : carId.trim();
    }

    public String getUnitId() {
        return unitId;
    }

    public void setUnitId(String unitId) {
        this.unitId = unitId == null ? null : unitId.trim();
    }
}