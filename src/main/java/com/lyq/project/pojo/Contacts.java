package com.lyq.project.pojo;

import java.util.Date;

public class Contacts {
    private String id;

    private String contactName;

    private String cardno;

    private String tel;

    private String password;

    private String phone;

    private String email;

    private String qq;

    private String memo;

    private Integer orgtype;

    private Date createtime;

    private Date updatetime;

    public Contacts(String id, String contactName, String cardno, String tel, String password, String phone, String email, String qq, String memo, Integer orgtype, Date createtime, Date updatetime) {
        this.id = id;
        this.contactName = contactName;
        this.cardno = cardno;
        this.tel = tel;
        this.password = password;
        this.phone = phone;
        this.email = email;
        this.qq = qq;
        this.memo = memo;
        this.orgtype = orgtype;
        this.createtime = createtime;
        this.updatetime = updatetime;
    }

    public Contacts() {
        super();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getContactName() {
        return contactName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName == null ? null : contactName.trim();
    }

    public String getCardno() {
        return cardno;
    }

    public void setCardno(String cardno) {
        this.cardno = cardno == null ? null : cardno.trim();
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel == null ? null : tel.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    public String getQq() {
        return qq;
    }

    public void setQq(String qq) {
        this.qq = qq == null ? null : qq.trim();
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo == null ? null : memo.trim();
    }

    public Integer getOrgtype() {
        return orgtype;
    }

    public void setOrgtype(Integer orgtype) {
        this.orgtype = orgtype;
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

    @Override
    public String toString() {
        return "Contacts{" +
                "id='" + id + '\'' +
                ", contactName='" + contactName + '\'' +
                ", cardno='" + cardno + '\'' +
                ", tel='" + tel + '\'' +
                ", password='" + password + '\'' +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                ", qq='" + qq + '\'' +
                ", memo='" + memo + '\'' +
                ", orgtype=" + orgtype +
                ", createtime=" + createtime +
                ", updatetime=" + updatetime +
                '}';
    }
}