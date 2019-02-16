package com.lyq.project.dto;

public class LoginDto {
    private String SysId;
    private String AccountName;
    private String Password;
    private String Code;

    public LoginDto() {
    }

    public LoginDto(String sysId, String accountName, String password, String code) {
        SysId = sysId;
        AccountName = accountName;
        Password = password;
        Code = code;
    }

    public String getSysId() {
        return SysId;
    }

    public void setSysId(String sysId) {
        SysId = sysId;
    }

    public String getAccountName() {
        return AccountName;
    }

    public void setAccountName(String accountName) {
        AccountName = accountName;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public String getCode() {
        return Code;
    }

    public void setCode(String code) {
        Code = code;
    }

    @Override
    public String toString() {
        return "LoginDto{" +
                "SysId='" + SysId + '\'' +
                ", AccountName='" + AccountName + '\'' +
                ", Password='" + Password + '\'' +
                ", Code='" + Code + '\'' +
                '}';
    }
}
