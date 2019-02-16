package com.lyq.project.application;

import com.lyq.project.util.CommonUtils;
import com.lyq.project.util.ValidateCodeUtil;

public class App {
    public static void main(String[] args) {
//        ValidateCodeUtil.Validate v = ValidateCodeUtil.getRandomCode();
//        System.out.println(v.getValue());
//        System.out.println(v.getBase64Str());
        System.out.println(CommonUtils.getUUID());
        System.out.println(CommonUtils.getUUID());
        System.out.println(CommonUtils.getUUID());
    }
}
