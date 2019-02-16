package com.lyq.project.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.sql.rowset.spi.SyncResolver;

public class ResourceDto {
    @JsonProperty
    private String Code;
    @JsonProperty
    private String IsRegister;
    @JsonProperty
    private String HasPermission;

    public ResourceDto() {
    }

    public ResourceDto(String code, String isRegister, String hasPermission) {
        Code = code;
        IsRegister = isRegister;
        HasPermission = hasPermission;
    }

    @JsonIgnore
    public String getCode() {
        return Code;
    }

    @JsonIgnore
    public void setCode(String code) {
        Code = code;
    }

    @JsonIgnore
    public String getIsRegister() {
        return IsRegister;
    }

    @JsonIgnore
    public void setIsRegister(String isRegister) {
        IsRegister = isRegister;
    }

    @JsonIgnore
    public String getHasPermission() {
        return HasPermission;
    }

    @JsonIgnore
    public void setHasPermission(String hasPermission) {
        HasPermission = hasPermission;
    }
}
