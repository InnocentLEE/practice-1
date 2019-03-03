package com.lyq.project.common;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class KeCheCheckDto {
    @JsonProperty
    private String Id;
    @JsonProperty
    private String Status;

    public KeCheCheckDto() {
    }

    public KeCheCheckDto(String id, String status) {
        Id = id;
        Status = status;
    }

    @Override
    public String toString() {
        return "KeCheCheckDto{" +
                "Id='" + Id + '\'' +
                ", Status='" + Status + '\'' +
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
    public String getStatus() {
        return Status;
    }
    @JsonIgnore
    public void setStatus(String status) {
        Status = status;
    }
}
