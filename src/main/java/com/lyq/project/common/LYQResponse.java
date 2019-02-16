package com.lyq.project.common;
import java.io.Serializable;

public class LYQResponse<T> implements Serializable {
    private PublicResponse publicresponse;
    private T body;

    public LYQResponse() {
    }

    private LYQResponse(PublicResponse publicresponse, T body) {
        this.publicresponse = publicresponse;
        this.body = body;
    }

    public PublicResponse getPublicresponse() {
        return publicresponse;
    }

    public void setPublicresponse(PublicResponse publicresponse) {
        this.publicresponse = publicresponse;
    }

    public T getBody() {
        return body;
    }

    public void setBody(T body) {
        this.body = body;
    }

    public static <T> LYQResponse<T> createBySuccess(T body){
        PublicResponse publicResponse = new PublicResponse.Builder().statuscode(0).build();
        return new LYQResponse<T>(publicResponse,body);
    }
    public static <T> LYQResponse<T> createByErrorMessage(String message){
        PublicResponse publicResponse = new PublicResponse.Builder().statuscode(2).message(message).build();
        return new LYQResponse<T>(publicResponse,null);
    }
}