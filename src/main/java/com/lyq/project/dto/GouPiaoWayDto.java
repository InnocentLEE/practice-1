package com.lyq.project.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class GouPiaoWayDto {
    @JsonProperty
    private Integer way;
    @JsonProperty
    private Integer cnt;

    public GouPiaoWayDto() {
    }

    public GouPiaoWayDto(Integer way, Integer cnt) {
        this.way = way;
        this.cnt = cnt;
    }
    @JsonIgnore
    public Integer getWay() {
        return way;
    }
    @JsonIgnore
    public void setWay(Integer way) {
        this.way = way;
    }
    @JsonIgnore
    public Integer getCnt() {
        return cnt;
    }
    @JsonIgnore
    public void setCnt(Integer cnt) {
        this.cnt = cnt;
    }
}
