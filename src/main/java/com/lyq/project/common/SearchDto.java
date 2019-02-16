package com.lyq.project.common;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class SearchDto<T> implements Serializable {
    @JsonProperty
    private int Page;
    @JsonProperty
    private int Rows;
    @JsonProperty
    private int order_name;
    @JsonProperty
    private String order_dir;
    @JsonProperty
    private T data;

    public SearchDto() {
    }

    public SearchDto(int page, int rows, int order_name, String order_dir, T data) {
        Page = page;
        Rows = rows;
        this.order_name = order_name;
        this.order_dir = order_dir;
        this.data = data;
    }

    @JsonIgnore
    public int getPage() {
        return Page;
    }
    @JsonIgnore
    public void setPage(int page) {
        Page = page;
    }
    @JsonIgnore
    public int getRows() {
        return Rows;
    }
    @JsonIgnore
    public void setRows(int rows) {
        Rows = rows;
    }
    @JsonIgnore
    public int getOrder_name() {
        return order_name;
    }
    @JsonIgnore
    public void setOrder_name(int order_name) {
        this.order_name = order_name;
    }
    @JsonIgnore
    public String getOrder_dir() {
        return order_dir;
    }
    @JsonIgnore
    public void setOrder_dir(String order_dir) {
        this.order_dir = order_dir;
    }
    @JsonIgnore
    public T getData() {
        return data;
    }
    @JsonIgnore
    public void setData(T data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "SearchDto{" +
                "Page=" + Page +
                ", Rows=" + Rows +
                ", order_name=" + order_name +
                ", order_dir='" + order_dir + '\'' +
                ", data=" + data +
                '}';
    }
}
