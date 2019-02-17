package com.lyq.project;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import redis.clients.jedis.Jedis;

@SpringBootApplication
@Controller
@MapperScan({"com.lyq.project.dao"})
public class ProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProjectApplication.class, args);
    }
    @RequestMapping("/")
    String index(){
        return "Modules/Home/Index.html";
    }
}

