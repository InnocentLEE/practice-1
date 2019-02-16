package com.lyq.project.pojo;

import java.util.Date;

public class Server {
    private String id;

    private String serverName;

    private Integer serverType;

    private String address;

    private String contactsId;

    private Date createtime;

    private Date updatetime;

    public Server(String id, String serverName, Integer serverType, String address, String contactsId, Date createtime, Date updatetime) {
        this.id = id;
        this.serverName = serverName;
        this.serverType = serverType;
        this.address = address;
        this.contactsId = contactsId;
        this.createtime = createtime;
        this.updatetime = updatetime;
    }

    public Server() {
        super();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getServerName() {
        return serverName;
    }

    public void setServerName(String serverName) {
        this.serverName = serverName == null ? null : serverName.trim();
    }

    public Integer getServerType() {
        return serverType;
    }

    public void setServerType(Integer serverType) {
        this.serverType = serverType;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }

    public String getContactsId() {
        return contactsId;
    }

    public void setContactsId(String contactsId) {
        this.contactsId = contactsId == null ? null : contactsId.trim();
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public Date getUpdatetime() {
        return updatetime;
    }

    public void setUpdatetime(Date updatetime) {
        this.updatetime = updatetime;
    }
}