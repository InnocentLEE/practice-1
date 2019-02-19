package com.lyq.project.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.lyq.project.common.*;
import com.lyq.project.dto.CreateShengJiJianGuanBuMenDto;
import com.lyq.project.dto.CreateShiJiJianGuanBuMenDto;
import com.lyq.project.dto.LoginDto;
import com.lyq.project.service.INService;
import com.lyq.project.service.IQService;
import com.lyq.project.util.ValidateCodeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import redis.clients.jedis.Jedis;

import javax.servlet.http.HttpSession;

@Controller
public class NController {

    @Autowired
    private INService inService;

    // region 新增市级监管部门
    @RequestMapping(value = "008808800020",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public  LYQResponse createShiJiJianGuanBuMen(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<CreateShiJiJianGuanBuMenDto> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<CreateShiJiJianGuanBuMenDto>>(){});
        return inService.createShiJiJianGuanBuMen(session,request.getBody());
    }
    // endregion

    // region 获取市级监管部门列表
    @RequestMapping(value = "008808800021",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse getShengJiJianGuanBuMenList(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<SearchDto<ShiJiJianGuanBuMenSearchDto>> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<SearchDto<ShiJiJianGuanBuMenSearchDto>>>(){});
        return inService.getShiJiJianGuanBuMenList(session,request.getBody());

    }
    // endregion


}
