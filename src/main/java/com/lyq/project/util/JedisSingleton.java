package com.lyq.project.util;

import redis.clients.jedis.Jedis;

public class JedisSingleton {
    /**
     * 类级的内部类，也就是静态的成员式内部类，该内部类的实例与外部类的实例
     * 没有绑定关系，而且只有被调用到才会装载，从而实现了延迟加载
     */
    private static class SingletonHolder{
        /**
         * 静态初始化器，由JVM来保证线程安全
         */
        private static Jedis instance = new Jedis("119.23.253.135",6379,10000,10000);
    }
    /**
     * 私有化构造方法
     */
    private JedisSingleton(){
    }
    public static  Jedis getInstance(){
        return SingletonHolder.instance;
    }
}