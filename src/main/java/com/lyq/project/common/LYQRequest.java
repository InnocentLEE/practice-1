package com.lyq.project.common;

import java.io.Serializable;

public class LYQRequest<T> implements Serializable {
    private PublicRequest publicrequest;
    private T body;

    public LYQRequest() {
    }

    public LYQRequest(PublicRequest publicrequest, T body) {
        this.publicrequest = publicrequest;
        this.body = body;
    }

    public PublicRequest getPublicrequest() {
        return publicrequest;
    }

    public void setPublicrequest(PublicRequest publicrequest) {
        this.publicrequest = publicrequest;
    }

    public T getBody() {
        return body;
    }

    public void setBody(T body) {
        this.body = body;
    }

    @Override
    public String toString() {
        return "LYQRequest{" +
                "publicrequest=" + publicrequest +
                ", body=" + body +
                '}';
    }
}
