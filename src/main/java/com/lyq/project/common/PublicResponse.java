package com.lyq.project.common;

public class PublicResponse {
    private String sysid;
    private String reqid;
    private String protover;
    private String servicecode;
    private String servicever;
    private String responsetime;
    private String signdata;
    private int statuscode;
    private String message;
    private String reserve;

    public PublicResponse() {
    }

    public PublicResponse(String sysid, String reqid, String protover, String servicecode, String servicever, String responsetime, String signdata, int statuscode, String message, String reserve) {
        this.sysid = sysid;
        this.reqid = reqid;
        this.protover = protover;
        this.servicecode = servicecode;
        this.servicever = servicever;
        this.responsetime = responsetime;
        this.signdata = signdata;
        this.statuscode = statuscode;
        this.message = message;
        this.reserve = reserve;
    }

    private PublicResponse(Builder builder) {
        setSysid(builder.sysid);
        setReqid(builder.reqid);
        setProtover(builder.protover);
        setServicecode(builder.servicecode);
        setServicever(builder.servicever);
        setResponsetime(builder.responsetime);
        setSigndata(builder.signdata);
        setStatuscode(builder.statuscode);
        setMessage(builder.message);
        setReserve(builder.reserve);
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

    public String getServicecode() {
        return servicecode;
    }

    public void setServicecode(String servicecode) {
        this.servicecode = servicecode;
    }

    public String getServicever() {
        return servicever;
    }

    public void setServicever(String servicever) {
        this.servicever = servicever;
    }

    public String getResponsetime() {
        return responsetime;
    }

    public void setResponsetime(String responsetime) {
        this.responsetime = responsetime;
    }

    public String getSigndata() {
        return signdata;
    }

    public void setSigndata(String signdata) {
        this.signdata = signdata;
    }

    public int getStatuscode() {
        return statuscode;
    }

    public void setStatuscode(int statuscode) {
        this.statuscode = statuscode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getReserve() {
        return reserve;
    }

    public void setReserve(String reserve) {
        this.reserve = reserve;
    }


    public static final class Builder {
        private String sysid;
        private String reqid;
        private String protover;
        private String servicecode;
        private String servicever;
        private String responsetime;
        private String signdata;
        private int statuscode;
        private String message;
        private String reserve;

        public Builder() {
        }

        public Builder sysid(String val) {
            sysid = val;
            return this;
        }

        public Builder reqid(String val) {
            reqid = val;
            return this;
        }

        public Builder protover(String val) {
            protover = val;
            return this;
        }

        public Builder servicecode(String val) {
            servicecode = val;
            return this;
        }

        public Builder servicever(String val) {
            servicever = val;
            return this;
        }

        public Builder responsetime(String val) {
            responsetime = val;
            return this;
        }

        public Builder signdata(String val) {
            signdata = val;
            return this;
        }

        public Builder statuscode(int val) {
            statuscode = val;
            return this;
        }

        public Builder message(String val) {
            message = val;
            return this;
        }

        public Builder reserve(String val) {
            reserve = val;
            return this;
        }

        public PublicResponse build() {
            return new PublicResponse(this);
        }
    }
}
