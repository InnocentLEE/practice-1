package com.lyq.project.util;

import java.util.UUID;

public class CommonUtils {
    public static String getUUID(){
        return UUID.randomUUID().toString().replaceAll("-","").toUpperCase();
    }
}
