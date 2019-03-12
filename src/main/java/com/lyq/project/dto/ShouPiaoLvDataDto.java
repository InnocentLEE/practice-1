package com.lyq.project.dto;

public class ShouPiaoLvDataDto {
    private String key;
    private float value;

    public ShouPiaoLvDataDto() {
    }

    public ShouPiaoLvDataDto(String key, float value) {
        this.key = key;
        this.value = value;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public float getValue() {
        return value;
    }

    public void setValue(float value) {
        this.value = value;
    }
}
