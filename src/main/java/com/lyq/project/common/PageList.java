package com.lyq.project.common;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class PageList<T> implements Serializable {
    @JsonProperty
    private int totalcount;
    @JsonProperty
    private T items;

    public PageList() {
    }

    public PageList(int totalcount, T items) {
        this.totalcount = totalcount;
        this.items = items;
    }
    @JsonIgnore
    public int getTotalcount() {
        return totalcount;
    }
    @JsonIgnore
    public void setTotalcount(int totalcount) {
        this.totalcount = totalcount;
    }
    @JsonIgnore
    public T getItems() {
        return items;
    }
    @JsonIgnore
    public void setItems(T items) {
        this.items = items;
    }
}
