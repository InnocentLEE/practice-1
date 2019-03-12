package com.lyq.project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.List;

public class ShouPiaoLvOption {
    @JsonProperty
    private Title title;
    @JsonProperty
    private Axis xAxis;
    @JsonProperty
    private Axis yAxis;
    @JsonProperty
    private Serie[] series;

    public ShouPiaoLvOption() {
    }

    public ShouPiaoLvOption(List<ShouPiaoLvDataDto> list) {
        this.title = new Title("年度售票统计","center","top");
        List<String> xList = new ArrayList<>();
        List<Float> serieList = new ArrayList<>();
        for (ShouPiaoLvDataDto dto:list) {
            xList.add(dto.getKey());
            serieList.add(dto.getValue());
        }
        String[] xArr = new String[xList.size()];
        for (int i = 0; i < xList.size(); i++) {
            xArr[i] = xList.get(i);
        }
        Float[] serieArr = new Float[serieList.size()];
        for (int i = 0; i < serieList.size(); i++) {
            serieArr[i] = serieList.get(i);
        }
        this.xAxis = new Axis("category",xArr);
        String[] y = {"0","20","40","80","100"};
        this.yAxis = new Axis("value",y);
        Serie[] series = new Serie[1];
        series[0] = new Serie(serieArr,"line");
        this.series = series;
    }
}
class Title{
    @JsonProperty
    private String text;
    @JsonProperty
    private String x;
    @JsonProperty
    private String y;

    public Title() {
    }

    public Title(String text, String x, String y) {
        this.text = text;
        this.x = x;
        this.y = y;
    }
}

class Axis{
    @JsonProperty
    private String type;
    @JsonProperty
    private String[] data;

    public Axis() {
    }

    public Axis(String type, String[] data) {
        this.type = type;
        this.data = data;
    }
}

class Serie{
    @JsonProperty
    private Float[] data;
    @JsonProperty
    private String type;

    public Serie() {
    }

    public Serie(Float[] data, String type) {
        this.data = data;
        this.type = type;
    }
}
