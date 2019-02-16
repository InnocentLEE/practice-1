package com.lyq.project.common;

public class PublicRequest {
    private String sysid;
    private String reqid;
    private String protover;
    private String servicever;
    private String requesttime;
    private String signdata;
    private String reserve;
    private String servicecode;

    public PublicRequest(String sysid, String reqid, String protover, String servicever, String requesttime, String signdata, String reserve, String servicecode) {
        this.sysid = sysid;
        this.reqid = reqid;
        this.protover = protover;
        this.servicever = servicever;
        this.requesttime = requesttime;
        this.signdata = signdata;
        this.reserve = reserve;
        this.servicecode = servicecode;
    }

    public PublicRequest() {
    }

    public String getSysid() {
        return sysid;
    }

    public void setSysid(String sysid) {
        this.sysid = sysid;
    }

    public String getReqid() {
        return reqid;
    }

    public void setReqid(String reqid) {
        this.reqid = reqid;
    }

    public String getProtover() {
        return protover;
    }

    public void setProtover(String protover) {
        this.protover = protover;
    }

    public String getServicever() {
        return servicever;
    }

    public void setServicever(String servicever) {
        this.servicever = servicever;
    }

    public String getRequesttime() {
        return requesttime;
    }

    public void setRequesttime(String requesttime) {
        this.requesttime = requesttime;
    }

    public String getSigndata() {
        return signdata;
    }

    public void setSigndata(String signdata) {
        this.signdata = signdata;
    }

    public String getReserve() {
        return reserve;
    }

    public void setReserve(String reserve) {
        this.reserve = reserve;
    }

    public String getServicecode() {
        return servicecode;
    }

    public void setServicecode(String servicecode) {
        this.servicecode = servicecode;
    }

    @Override
    public String toString() {
        return "PublicRequest{" +
                "sysid='" + sysid + '\'' +
                ", reqid='" + reqid + '\'' +
                ", protover='" + protover + '\'' +
                ", servicever='" + servicever + '\'' +
                ", requesttime='" + requesttime + '\'' +
                ", signdata='" + signdata + '\'' +
                ", reserve='" + reserve + '\'' +
                ", servicecode='" + servicecode + '\'' +
                '}';
    }
}
