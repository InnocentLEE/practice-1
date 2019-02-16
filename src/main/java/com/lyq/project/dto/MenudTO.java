package com.lyq.project.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class MenudTO {
    @JsonProperty
    private String Id;
    @JsonProperty
    private String Title;
    @JsonProperty
    private String Url;
    @JsonProperty
    private String Open;
    @JsonProperty
    private String Selected;
    @JsonProperty
    private String Active;
    @JsonProperty
    private String Icon;
    @JsonProperty
    private String Heading;
    @JsonProperty
    private String ClassName;
    @JsonProperty
    private List<MenudTO> SubMenu;
    @JsonProperty
    private List<MenudTO> Extends;
    @JsonProperty
    private String Argument;
    @JsonProperty
    private String Remark;
    @JsonProperty
    private String IsEnabled;
    @JsonProperty
    private String Code;

    public MenudTO() {
    }

    public MenudTO(String id, String title, String url, String open, String selected, String active, String icon, String heading, String className, List<MenudTO> subMenu, List<MenudTO> anExtends, String argument, String remark, String isEnabled, String code) {
        Id = id;
        Title = title;
        Url = url;
        Open = open;
        Selected = selected;
        Active = active;
        Icon = icon;
        Heading = heading;
        ClassName = className;
        SubMenu = subMenu;
        Extends = anExtends;
        Argument = argument;
        Remark = remark;
        IsEnabled = isEnabled;
        Code = code;
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
    public String getTitle() {
        return Title;
    }

    @JsonIgnore
    public void setTitle(String title) {
        Title = title;
    }

    @JsonIgnore
    public String getUrl() {
        return Url;
    }

    @JsonIgnore
    public void setUrl(String url) {
        Url = url;
    }

    @JsonIgnore
    public String getOpen() {
        return Open;
    }

    @JsonIgnore
    public void setOpen(String open) {
        Open = open;
    }

    @JsonIgnore
    public String getSelected() {
        return Selected;
    }

    @JsonIgnore
    public void setSelected(String selected) {
        Selected = selected;
    }

    @JsonIgnore
    public String getActive() {
        return Active;
    }

    @JsonIgnore
    public void setActive(String active) {
        Active = active;
    }

    @JsonIgnore
    public String getIcon() {
        return Icon;
    }

    @JsonIgnore
    public void setIcon(String icon) {
        Icon = icon;
    }

    @JsonIgnore
    public String getHeading() {
        return Heading;
    }

    @JsonIgnore
    public void setHeading(String heading) {
        Heading = heading;
    }

    @JsonIgnore
    public String getClassName() {
        return ClassName;
    }

    @JsonIgnore
    public void setClassName(String className) {
        ClassName = className;
    }

    @JsonIgnore
    public List<MenudTO> getSubMenu() {
        return SubMenu;
    }

    @JsonIgnore
    public void setSubMenu(List<MenudTO> subMenu) {
        SubMenu = subMenu;
    }

    @JsonIgnore
    public List<MenudTO> getExtends() {
        return Extends;
    }

    @JsonIgnore
    public void setExtends(List<MenudTO> anExtends) {
        Extends = anExtends;
    }

    @JsonIgnore
    public String getArgument() {
        return Argument;
    }

    @JsonIgnore
    public void setArgument(String argument) {
        Argument = argument;
    }

    @JsonIgnore
    public String getRemark() {
        return Remark;
    }

    @JsonIgnore
    public void setRemark(String remark) {
        Remark = remark;
    }

    @JsonIgnore
    public String getIsEnabled() {
        return IsEnabled;
    }

    @JsonIgnore
    public void setIsEnabled(String isEnabled) {
        IsEnabled = isEnabled;
    }

    @JsonIgnore
    public String getCode() {
        return Code;
    }

    @JsonIgnore
    public void setCode(String code) {
        Code = code;
    }

    @Override
    public String toString() {
        return "MenudTO{" +
                "Id='" + Id + '\'' +
                ", Title='" + Title + '\'' +
                ", Url='" + Url + '\'' +
                ", Open='" + Open + '\'' +
                ", Selected='" + Selected + '\'' +
                ", Active='" + Active + '\'' +
                ", Icon='" + Icon + '\'' +
                ", Heading='" + Heading + '\'' +
                ", ClassName='" + ClassName + '\'' +
                ", SubMenu=" + SubMenu +
                ", Extends=" + Extends +
                ", Argument='" + Argument + '\'' +
                ", Remark='" + Remark + '\'' +
                ", IsEnabled='" + IsEnabled + '\'' +
                ", Code='" + Code + '\'' +
                '}';
    }
}
