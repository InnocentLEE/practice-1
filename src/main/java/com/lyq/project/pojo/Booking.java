package com.lyq.project.pojo;

public class Booking {
    private String id;

    private String arrangeId;

    private Integer way;

    private String idCard;

    private String customerName;

    private String tel;

    private Integer isCancel;

    public Booking(String id, String arrangeId, Integer way, String idCard, String customerName, String tel, Integer isCancel) {
        this.id = id;
        this.arrangeId = arrangeId;
        this.way = way;
        this.idCard = idCard;
        this.customerName = customerName;
        this.tel = tel;
        this.isCancel = isCancel;
    }

    public Booking() {
        super();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getArrangeId() {
        return arrangeId;
    }

    public void setArrangeId(String arrangeId) {
        this.arrangeId = arrangeId == null ? null : arrangeId.trim();
    }

    public Integer getWay() {
        return way;
    }

    public void setWay(Integer way) {
        this.way = way;
    }

    public String getIdCard() {
        return idCard;
    }

    public void setIdCard(String idCard) {
        this.idCard = idCard == null ? null : idCard.trim();
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName == null ? null : customerName.trim();
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel == null ? null : tel.trim();
    }

    public Integer getIsCancel() {
        return isCancel;
    }

    public void setIsCancel(Integer isCancel) {
        this.isCancel = isCancel;
    }
}